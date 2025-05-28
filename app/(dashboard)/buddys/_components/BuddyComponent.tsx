"use client";

import { cn, configureAssistant, getSubjectColors } from "@/lib/utils";
import { vapiClient } from "@/lib/vapi.sdk";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";

const enum CallStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  FINISHED = "FINISHED",
  CONNECTING = "CONNECTING",
}

const BuddyComponent = ({ buddy, userName, userImage }: any) => {
  //TODO!: Define proper types for props
  const { name, subject, topic, voice, style } = buddy;
  const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]); // Message type is from vapi SDK

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const toggleMicrophone = () => {
    const ismuted = vapiClient.isMuted();
    vapiClient.setMuted(!ismuted);
    setIsMuted(!ismuted);
  };

  const handleCall = () => {
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    const voiceLowerCase: string = voice.toLowerCase(); //TODO fix slect fields to return lower case values
    const styleLowerCase: string = style.toLowerCase();
    vapiClient.start(
      configureAssistant(voiceLowerCase, styleLowerCase, name),
      // @ts-expect-error config is not typed
      assistantOverrides
    );
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapiClient.stop();
  };

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.error("Error:", error);

    // Vapi call events
    vapiClient.on("call-start", onCallStart);
    vapiClient.on("call-end", onCallEnd);
    vapiClient.on("message", onMessage);
    vapiClient.on("speech-start", onSpeechStart);
    vapiClient.on("speech-end", onSpeechEnd);
    vapiClient.on("error", onError);

    return () => {
      vapiClient.off("call-start", onCallStart);
      vapiClient.off("call-end", onCallEnd);
      vapiClient.off("message", onMessage);
      vapiClient.off("speech-start", onSpeechStart);
      vapiClient.off("speech-end", onSpeechEnd);
      vapiClient.off("error", onError);
    };
  }, []);

  return (
    <section className="flex flex-col">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColors(subject) }}
          >
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-1001"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse"
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="w-[150px] h-[150px] max-sm:w-[70px] max-sm:h-[70px]"
              />
            </div>

            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>

        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          <button
            className="btn-mic"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt="mic"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? "Turn on microphone" : "Turn off microphone"}
            </p>
          </button>
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
              callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting"
              : "Start Session"}
          </button>
        </div>
      </section>

      <div className="text-center md:text-start ">
        <h2 className="text-2xl w-full font-bold mb-1 mt-4">Transcript</h2>
        {messages.length === 0 && (
          <p className="text-gray-500">
            No messages yet. Start the session to see the transcript.
          </p>
        )}
      </div>
      <section className="transcript max-h-[calc(100vh-300px)]">
        <div className="transcript-message">
          {messages.map((message, index) => {
            if (message.role === "assistant") {
              return (
                <p key={index} className="max-sm:text-sm">
                  {name.split(" ")[0].replace("/[.,]/g, ", "")}:{" "}
                  {message.content}
                </p>
              );
            } else if (message.role === "user") {
              return (
                <p key={index} className="text-primary max-sm:text-sm">
                  {userName}: {message.content}
                </p>
              );
            }
          })}
        </div>

        <div className="transcript-fade" />
      </section>
    </section>
  );
};

export default BuddyComponent;

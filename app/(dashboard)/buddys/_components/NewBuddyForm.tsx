"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
  newBuddyFormSchema,
  NewBuddyFormSchemaType,
  subjects,
} from "@/constants";
import { CustomFormInput } from "@/components/ui/customFormInput";
import { CustomFormSelect } from "@/components/ui/customFormSelect";
import { CustomFormTextarea } from "@/components/ui/customFormTextarea";
import { createBuddyAction } from "@/actions/buddy.actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function NewBuddyForm() {
  const form = useForm<NewBuddyFormSchemaType>({
    resolver: zodResolver(newBuddyFormSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "Male",
      style: "Formal",
      duration: 15,
    },
  });

  async function onSubmit(values: NewBuddyFormSchemaType) {
    try {
      toast.promise(createBuddyAction(values), {
        onAutoClose: async ({ type, promise }) => {
          if (type === "success") {
            redirect(`/buddys/${(await promise).id}`);
          }
        },
        duration: 2500,
        loading: "Creating your Buddy...",
        success: (data) =>
          `Your Buddy "${data.name}" has been created successfully!`,
        error: (err) =>
          err instanceof Error ? err.message : "Failed to create buddy.",
      });
    } catch (error) {
      console.error("Buddy creation failed:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormInput
          name="name"
          label="Buddy's Name"
          placeholder="e.g. Vusi the Orator"
          control={form.control}
        />
        <CustomFormSelect
          name="subject"
          label="Subject"
          placeholder="Ex: Public Speaking"
          options={subjects}
          control={form.control}
          className="capitalize"
        />
        <CustomFormTextarea
          name="topic"
          label="Topic: What should your Buddy teach?"
          placeholder="Enter the topic you want to learn. e.g. How to Speak Like a Pro"
          control={form.control}
        />
        <CustomFormSelect
          name="voice"
          label="Voice Type"
          placeholder="Select a voice"
          options={["Male", "Female"]}
          control={form.control}
        />
        <CustomFormSelect
          name="style"
          label="Speaking Style"
          placeholder="Select a style"
          options={["Formal", "Casual"]}
          control={form.control}
        />
        <CustomFormInput
          name="duration"
          label="Duration (in mins)"
          type="number"
          placeholder="15"
          control={form.control}
        />
        <Button className="w-full cursor-pointer" type="submit">
          Build your Buddy
        </Button>
      </form>
    </Form>
  );
}

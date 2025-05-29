import React from "react";
import NewBuddyForm from "../_components/NewBuddyForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { newBuddyPermission } from "@/actions/auth.actions";
import Image from "next/image";
import Link from "next/link";

const NewBuddy = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const hasPermission = await newBuddyPermission();
  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {hasPermission ? (
        <section className="w-full gap-4 flex flex-col">
          <h1>Buddy Builder</h1>
          <NewBuddyForm />
        </section>
      ) : (
        <article className="companion-limit -mt-24">
          <Image
            src="/images/limit.svg"
            alt="Companion limit reached"
            width={300}
            height={200}
          />
          <div className="cta-badge">Upgrade your plan</div>
          <h1>You have Reached Your Limit</h1>
          <p>
            You have reached your companion limit. Upgrade to create more
            companions and premium features.
          </p>
          <Link
            href="/subscriptions"
            className="btn-primary w-full justify-center"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewBuddy;

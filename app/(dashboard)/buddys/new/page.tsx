import React from "react";
import NewBuddyForm from "../_components/NewBuddyForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const NewBuddy = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return (
    <main className="min-lg:w-[50%] min-md:w-2/3 py-0 items-center justify-center">
      <section className="w-full gap-4  flex flex-col">
        <h1>Buddy Builder</h1>
        <NewBuddyForm />
      </section>
    </main>
  );
};

export default NewBuddy;

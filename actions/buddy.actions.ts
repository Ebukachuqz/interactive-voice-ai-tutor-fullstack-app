"use server";

import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createBuddyAction(formData: CreateBuddy) {
  const { userId: author } = await auth();
  if (!author) redirect("/sign-in");
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("buddys")
    .insert({
      ...formData,
      author,
    })
    .select();

  if (error || !data) {
    throw new Error(`Error creating buddy: ${error?.message}`);
  }

  return data[0];
}

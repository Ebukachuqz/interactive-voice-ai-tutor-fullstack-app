"use server";

import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export async function createBuddyAction(formData: CreateBuddy) {
  const { userId: author } = await auth();
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

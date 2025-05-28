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

export async function getAllBuddysAction({
  limit = 10,
  page = 1,
  subject,
  topic,
}: {
  limit?: number;
  page?: number;
  subject?: string;
  topic?: string;
}) {
  const supabase = createSupabaseClient();
  let query = supabase.from("buddys").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,subject.ilike.%${subject}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.ilike("topic", `%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data, error } = await query;
  if (error) {
    throw new Error(`Error fetching buddies: ${error?.message}`);
  }
  return data;
}

export async function getBuddyByIdAction(id: string) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("buddys")
    .select()
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Error fetching buddy:", error);
    throw new Error(`Error fetching buddy: ${error?.message}`);
  }
  return data;
}
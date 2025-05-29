"use server";

import { createSupabaseClient } from "@/lib/supabase";

export const getUserSessionsAction = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`buddys:buddy_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ buddys }) => buddys);
};

export const getUserBuddysAction = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("buddys")
    .select()
    .eq("author", userId);

  if (error) throw new Error(error.message);

  return data;
};

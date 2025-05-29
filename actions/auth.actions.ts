"use server";

import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export const newBuddyPermission = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: "bgs" })) {
    return true;
  } else if (has({ feature: "3_active_buddys" })) {
    limit = 3;
  } else if (has({ feature: "10_active_buddys" })) {
    limit = 10;
  }

  const { data, error } = await supabase
    .from("buddys")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) console.error("Error fetching buddy count:", error);
  // throw new Error(error.message);

  const buddyCount = data?.length;

  if (buddyCount! >= limit) {
    return false;
  } else {
    return true;
  }
};

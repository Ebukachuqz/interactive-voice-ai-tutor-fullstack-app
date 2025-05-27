import { getAllBuddysAction } from "@/actions/buddy.actions";
import React from "react";
import BuddyCard from "../../_components/BuddyCard";
import { getSubjectColors } from "@/lib/utils";
import SearchInput from "../_components/SearchInput";
import SubjectSelectFilter from "../_components/SubjectSelectFilter";

const AllBuddys = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const subject = params.subject ? params.subject : "";
  const topic = params.subject ? params.subject : "";

  const allBuddys = await getAllBuddysAction({
    subject,
    topic,
  });

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Buddys Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectSelectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {allBuddys.map((buddy) => (
          <BuddyCard
            key={buddy.id}
            {...buddy}
            color={getSubjectColors(buddy.subject)}
          />
        ))}
      </section>
    </main>
  );
};

export default AllBuddys;

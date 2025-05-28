import React from "react";
import BuddyCard from "./_components/BuddyCard";
import BuddysList from "./_components/BuddysList";
import CTA from "./_components/CTA";
import {
  getAllBuddysAction,
  getRecentSessionsAction,
} from "@/actions/buddy.actions";
import { getSubjectColors } from "@/lib/utils";

const Dashboard = async () => {
  const recentSessions = await getRecentSessionsAction(10);
  const buddys = await getAllBuddysAction({ limit: 3 });
  return (
    <main>
      <h1>Popular Buddys</h1>
      <section className="home-section">
        {buddys.map((buddy) => (
          <BuddyCard
            key={buddy.id}
            {...buddy}
            color={getSubjectColors(buddy.subject)}
          />
        ))}{" "}
      </section>
      <section className="home-section">
        <BuddysList
          title={"Recent Completed Sessions"}
          buddys={recentSessions}
          classNames={"w-2/3 max-lg:w-full"}
        />
        <CTA />
      </section>
    </main>
  );
};

export default Dashboard;

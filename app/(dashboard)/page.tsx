import React from "react";
import BuddyCard from "./_components/BuddyCard";
import BuddysList from "./_components/BuddysList";
import CTA from "./_components/CTA";

const Dashboard = () => {
  return (
    <main>
      <h1>Popular Buddys</h1>
      <section className="home-section">
        <BuddyCard
          id="123"
          name="Obiora the Explorer"
          subject="Geography"
          duration={45}
          color="#ffda63"
          topic="Exploring the World"
        />
        <BuddyCard
          id="123"
          name="Ugo C. Ugo the Professor"
          subject="Mathematics"
          duration={45}
          color="#e5d0ff"
          topic="Calculus and Beyond"
        />
        <BuddyCard
          id="123"
          name="Soyinka the Historian"
          subject="History"
          duration={50}
          color="#BDE7FF"
          topic="The Rise and Fall of Empires"
        />
      </section>
      <section className="home-section">
        <BuddysList />
        <CTA />
      </section>
    </main>
  );
};

export default Dashboard;

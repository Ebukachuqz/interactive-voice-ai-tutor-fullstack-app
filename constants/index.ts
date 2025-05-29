export const subjects = [
  "maths",
  "language",
  "science",
  "history",
  "coding",
  "economics",
];

export const subjectsColors = {
  science: "#E5D0FF",
  maths: "#FFDA6E",
  language: "#BDE7FF",
  coding: "#FFC8E4",
  history: "#FFECC8",
  economics: "#C8FFDF",
};

export const voices = {
  male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
  female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};

export const recentSessions = [
  {
    id: "1",
    subject: "science",
    name: "Neura the Brainy Explorer",
    topic: "Neural Network of the Brain",
    duration: 45,
    color: "#E5D0FF",
  },
  {
    id: "2",
    subject: "maths",
    name: "Countsy the Number Wizard",
    topic: "Derivatives & Integrals",
    duration: 30,
    color: "#FFDA6E",
  },
  {
    id: "3",
    subject: "language",
    name: "Verba the Vocabulary Builder",
    topic: "English Literature",
    duration: 30,
    color: "#BDE7FF",
  },
  {
    id: "4",
    subject: "coding",
    name: "Codey the Logic Hacker",
    topic: "Intro to If-Else Statements",
    duration: 45,
    color: "#FFC8E4",
  },
  {
    id: "5",
    subject: "history",
    name: "Memo, the Memory Keeper",
    topic: "World Wars: Causes & Consequences",
    duration: 15,
    color: "#FFECC8",
  },
  {
    id: "6",
    subject: "economics",
    name: "The Market Maestro",
    topic: "The Basics of Supply & Demand",
    duration: 10,
    color: "#C8FFDF",
  },
];

export const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Learning Buddys",
    href: "/buddys",
  },
  {
    label: "My Journey",
    href: "/my-journey",
  },
  {
    label: "Create Buddy",
    href: "/buddys/new",
  },
];

export const buddyCardData = [
  {
    id: "123",
    name: "Obiora the Explorer",
    subject: "Geography",
    duration: 45,
    color: "#ffda63",
    topic: "Exploring the World",
  },
  {
    id: "124",
    name: "Ugo C. Ugo the Professor",
    subject: "Mathematics",
    duration: 45,
    color: "#e5d0ff",
    topic: "Calculus and Beyond",
  },
  {
    id: "125",
    name: "Soyinka the Syntax Sage",
    subject: "English",
    duration: 50,
    color: "#BDE7FF",
    topic: "English with Extra Literary Calories",
  },
  {
    id: "126",
    name: "Chimamanda of the Bold Pens",
    subject: "Literature",
    duration: 40,
    color: "#FFC0CB",
    topic: "Telling Stories that Rewrite the Story",
  },
  {
    id: "127",
    name: "Zik the Master of Speeches",
    subject: "Civics",
    duration: 45,
    color: "#D0F0C0",
    topic: "Founding a Nation (While Quoting Yourself)",
  },
  {
    id: "128",
    name: "Omoyele Sowore the Table Shaker",
    subject: "Political Science",
    duration: 50,
    color: "#FFD6A5",
    topic: "Protests, Promises & Political Campaigns",
  },
  {
    id: "129",
    name: "Fisayo the Budget Tech Bro",
    subject: "Computer Science",
    duration: 55,
    color: "#A6E3E9",
    topic: "What is computer? Like I am Steve Jobs",
  },
  {
    id: "130",
    name: "Okonkwo of Umuofia Farms",
    subject: "Agriculture",
    duration: 35,
    color: "#E6E6FA",
    topic: "Yam is Life: Advanced Principles",
  },
  {
    id: "128",
    name: "Fela the Conscious Composer",
    subject: "Music",
    duration: 55,
    color: "#FFD700",
    topic: "Noise & Notes: Beats that Educate and Agitate",
  },
];

import { z } from "zod";

export const newBuddyFormSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50),
  subject: z.string().min(1, "Select a subject"),
  topic: z.string().min(5, "Topic is too short"),
  voice: z.enum(["Male", "Female"]),
  style: z.enum(["Formal", "Casual"]),
  duration: z.number().min(5).max(60),
});

export type NewBuddyFormSchemaType = z.infer<typeof newBuddyFormSchema>;

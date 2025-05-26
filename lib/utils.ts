import { subjectsColors } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function getSubjectColors(subject: string): string {
//   const subjectColors: Record<string, string> = {
//     Math: "#FF5733",
//     Science: "#33FF57",
//     History: "#3357FF",
//     English: "#FF33A1",
//     Art: "#A133FF",
//     Music: "#33FFF5",
//   };

//   return subjectColors[subject] || "#CCCCCC"; // Default color if subject not found
// }

export function getSubjectColors(subject: string): string {
  return subjectsColors[subject as keyof typeof subjectsColors] || "#CCCCCC"; // Default color if subject not found
}

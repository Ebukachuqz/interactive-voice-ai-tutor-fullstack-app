import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-col items-center justify-center py-4 bg-gray-50">
      <SignIn />
    </main>
  );
};

export default page;

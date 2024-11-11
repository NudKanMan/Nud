// /src/app/profile/page.tsx
"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@mui/material";
import NavBar from "../components/NavBar";
import { redirect, RedirectType } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  // Show a loading state while the session is being fetched
  if (status === "loading") {
    return <p className="text-center text-white">Loading...</p>;
  }

  // Redirect to signin if there's no session after loading
  if (!session) {
    return redirect("/signin", RedirectType.replace);
  }

  return (
    <div>
      <NavBar session={session} />
      <div className="flex justify-center items-center min-h-screen bg-tinder-grey text-white p-6">
        <div className="bg-white text-tinder-grey p-8 rounded-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-6">Profile</h2>

          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <Image
              src={session.user?.image || "/images/default-avatar.png"}
              alt="User Profile Picture"
              width={100}
              height={100}
              className="rounded-full border-4 border-tinder-pink"
            />
          </div>

          {/* Profile Fields */}
          <div className="mb-4 text-left">
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              value={session.user?.name || "N/A"}
              readOnly
              className="w-full px-3 py-2 border rounded-lg text-tinder-grey bg-gray-100"
            />
          </div>

          <div className="mb-4 text-left">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={session.user?.email || "N/A"}
              readOnly
              className="w-full px-3 py-2 border rounded-lg text-tinder-grey bg-gray-100"
            />
          </div>

          <div className="mb-6 text-left">
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              value="********" // Hide actual password
              readOnly
              className="w-full px-3 py-2 border rounded-lg text-tinder-grey bg-gray-100"
            />
          </div>

          {/* Back Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fd5564",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
              padding: "10px 26px",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "white",
                color: "#fd5564",
              },
            }}
            onClick={() => window.history.back()}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
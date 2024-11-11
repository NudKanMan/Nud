// /src/app/home/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect, RedirectType } from "next/navigation";
import NavBar from "../components/NavBar";
import ActivityCardCreater from "../components/ActivityCardCreater";
import ActivityCard from "../components/ActivityCard";

export default async function Home() {

  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/signin", RedirectType.replace);
  }

  return (
    <div>
      <NavBar session={session} />
      <div className="pt-[10vh] w-full h-[100vh] bg-[#4A4A4A] flex justify-center">
        <div className="grid grid-cols-4 grid-rows-2 gap-4 p-6 w-full max-w-7xl">
          <ActivityCardCreater />
          {/* Placeholder cards */}
          <ActivityCard id="01" />
          <ActivityCard id="01" />
          <ActivityCard id="01" />
          <ActivityCard id="01" />
          <ActivityCard id="01" />
          <ActivityCard id="01" />
          <ActivityCard id="01" />
        </div>
      </div>
    </div>
  );
}
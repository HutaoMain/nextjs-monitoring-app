import Footer from "@/components/Footer";
import JobList from "@/components/JobList";
import Navbar from "@/components/Navbar";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="h-full w-[100vw]">
      <Navbar />
      <JobList />
      <Footer />
    </main>
  );
}

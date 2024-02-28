import Footer from "@/components/Footer";
import JobList from "@/components/JobList";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="h-[100vh] w-[100vw]">
      <Navbar />
      <JobList />
      <Footer />
    </main>
  );
}

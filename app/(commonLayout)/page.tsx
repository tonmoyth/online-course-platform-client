import { getUserAction } from "@/actions/auth/getUser.action";
import Navbar from "@/components/modules/home/Navbar";
import Hero from "@/components/modules/home/Hero";
import Footer from "@/components/modules/home/Footer";

export default async function Home() {
  const user = await getUserAction();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />
      <main className="flex-1">
        <Hero />
        {/* Additional landing page sections like Features, Testimonials, FAQ can go here */}
      </main>
      <Footer />
    </div>
  );
}
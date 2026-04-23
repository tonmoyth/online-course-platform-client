

import Hero from "@/components/modules/home/Hero";


export default async function Home() {


  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        <Hero />
        {/* Additional landing page sections like Features, Testimonials, FAQ can go here */}
      </main>

    </div>
  );
}
// app/page.tsx or pages/index.tsx (depending on your Next.js version)

import AnimatedScrollTimeline from "../components/light-turquoise-hacker-portal";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col items-center mx-auto p-4 bg-gradient-to-b from-teal-50 to-teal-100 min-h-screen font-serif">
        <AnimatedScrollTimeline />
      </main>
    </div>
  );
}

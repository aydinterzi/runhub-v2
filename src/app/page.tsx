import Image from "next/image";
import Link from "next/link";

// shadcn/ui bileşenlerini kullanmak isterseniz:
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "RunHub | Home",
  description: "Discover the ultimate running community on RunHub",
};

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/*
        HERO BÖLÜMÜ
        Burada, tam ekran bir kahraman (hero) bölümü oluşturuyoruz.
      */}
      <section className="relative h-[60vh] w-full bg-gray-900 text-white flex items-center justify-center">
        {/* Arkaplan resmi */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/running-1.jpg"
            alt="Running Hero"
            fill
            className="object-cover brightness-75"
          />
        </div>
        {/* Hero içerik */}
        <div className="z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to RunHub
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Join the ultimate running community. Organize events, share tips,
            and stay motivated with fellow runners!
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/events"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
            >
              Explore Events
            </Link>
            <Link
              href="/community"
              className="bg-transparent border border-white text-white font-semibold px-6 py-2 rounded hover:bg-white hover:text-black"
            >
              Join a Community
            </Link>
          </div>
        </div>
      </section>

      {/*
        ÖZELLİK TANITIM BÖLÜMÜ
        Uygulamanın faydalarını, kısa özelliklerini anlatan bir kısım.
      */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why RunHub?</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-8">
            We make it easy to connect with like-minded runners, plan your
            training schedule, and discover new routes. Whether you’re a
            seasoned marathoner or just starting out, RunHub has something for
            everyone.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div>
              <Image
                src="/running-2.jpg"
                alt="Feature 1"
                width={400}
                height={250}
                className="mx-auto rounded shadow-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Organized Events</h3>
              <p className="text-gray-600">
                Create or join running events in your area, and keep track of
                upcoming races.
              </p>
            </div>
            <div>
              <Image
                src="/running-3.jpg"
                alt="Feature 2"
                width={400}
                height={250}
                className="mx-auto rounded shadow-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">
                Get motivation and tips from fellow runners. Share your journey
                and stay inspired.
              </p>
            </div>
            <div>
              {/* Örnek bir placeholder resim */}
              <Image
                src="/running-1.jpg"
                alt="Feature 3"
                width={400}
                height={250}
                className="mx-auto rounded shadow-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Track Your Progress
              </h3>
              <p className="text-gray-600">
                Coming soon: sync your runs from Strava or Garmin to keep an eye
                on your improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*
        CALL TO ACTION BÖLÜMÜ
        Kullanıcıları bir sonraki adıma yönlendiren bir CTA.
      */}
      <section className="py-16 bg-blue-600 text-white flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to join the run?
          </h2>
          <p className="mb-6 max-w-xl mx-auto">
            Sign up now and discover a world of running communities and events.
          </p>
          <Link
            href="/sign-up"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}

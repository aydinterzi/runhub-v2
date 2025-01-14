"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// Yukarıdaki import yolları shadcn yapılandırmanıza göre değişebilir.

export default function HomePage() {
  return (
    <main className="container mx-auto py-8">
      {/* Giriş Yapmış Kullanıcılara Gösterilecek Kısım */}
      <SignedIn>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p>You are signed in. Explore your communities and events.</p>
          {/* Kullanıcı menüsü (avatar, profil, çıkış vb.) */}
          <UserButton afterSignOutUrl="/" />
          <div className="flex items-center gap-2 mt-4">
            <Link href="/community">
              <Button>Go to Communities</Button>
            </Link>
            <Link href="/events">
              <Button variant="outline">Go to Events</Button>
            </Link>
          </div>
        </div>
      </SignedIn>

      {/* Giriş Yapmamış Kullanıcılara Gösterilecek Kısım */}
      <SignedOut>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">RunHub</h1>
          <p className="text-center max-w-md">
            Welcome to RunHub, the community platform for runners. Create or
            join clubs, schedule group runs, and stay connected — all in one
            place.
          </p>
          <SignInButton mode="modal">
            <Button variant="default">Sign In</Button>
          </SignInButton>
        </div>
      </SignedOut>
    </main>
  );
}

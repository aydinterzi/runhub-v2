import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

async function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* LOGO / SITE ADI */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 hover:opacity-80"
        >
          RunHub
        </Link>
        {/* NAV MENÜSÜ */}
        <nav className="space-x-6">
          <Link href="/events" className="text-gray-700 hover:text-blue-600">
            Events
          </Link>
          <Link href="/community" className="text-gray-700 hover:text-blue-600">
            Community
          </Link>
          <Link
            href="/sign-in"
            className="text-gray-700 hover:text-blue-600 align-middle"
          >
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;

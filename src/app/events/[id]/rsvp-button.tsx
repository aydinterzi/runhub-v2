"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { rsvpEventAction } from "../_actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RSVPButton({ eventId }: { eventId: number }) {
  const { userId } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState("GOING"); // Varsayılan RSVP durumu

  if (!userId) {
    return (
      <Button variant="outline" onClick={() => router.push("/sign-in")}>
        Giriş Yap
      </Button>
    );
  }

  return (
    <form
      action={async (formData) => {
        await rsvpEventAction(formData);
        // RSVP işlemi sonrası sayfayı yenile veya başka işlem yap
        router.refresh();
      }}
      className="space-x-2"
    >
      <input type="hidden" name="clerkUserId" value={userId} />
      <input type="hidden" name="eventId" value={eventId} />
      <select
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      >
        <option value="GOING">Going</option>
        <option value="MAYBE">Maybe</option>
        <option value="NOT">Not Going</option>
      </select>

      <Button type="submit" variant="default">
        Submit RSVP
      </Button>
    </form>
  );
}

"use client";

import { useAuth } from "@clerk/nextjs";
import { rsvpEventAction } from "../_actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RsvpItem = {
  id: number;
  clerkUserId: string;
  eventId: number;
  status: string; // GOING, MAYBE, NOT
  createdAt: Date;
};

type EventData = {
  id: number;
  name: string;
  creatorUserId: string;
  eventDate: Date;
  participantLimit: number | null;
};

interface EventDetailClientProps {
  eventData: EventData;
  rsvpList: RsvpItem[];
}

export default function EventDetailClient({
  eventData,
  rsvpList,
}: EventDetailClientProps) {
  const { userId } = useAuth();
  const router = useRouter();

  // Creator mu?
  const isCreator = userId === eventData.creatorUserId;

  // Kullanıcının mevcut RSVP'si
  const userRsvp = rsvpList.find((r) => r.clerkUserId === userId);
  const [status, setStatus] = useState(userRsvp?.status ?? "GOING");

  // RSVP isteği
  async function handleRsvp() {
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    const fd = new FormData();
    fd.append("clerkUserId", userId);
    fd.append("eventId", String(eventData.id));
    fd.append("status", status);

    await rsvpEventAction(fd);
    router.refresh();
  }
  console.log(rsvpList);
  return (
    <div className="mt-4 space-y-4">
      {/* Creator'a özel: RSVP yapanların listesi */}
      {isCreator && (
        <div className="p-3 bg-gray-50 rounded">
          <h2 className="font-semibold mb-2">Katılanlar Listesi</h2>
          {rsvpList.length === 0 ? (
            <p className="text-sm text-gray-400">Henüz kimse RSVP yapmadı.</p>
          ) : (
            <ul className="list-disc list-inside text-sm">
              {rsvpList.map((r) => (
                <li key={r.id}>
                  {r.clerkUserId} – {r.status.toUpperCase()}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Kullanıcı RSVP durumu */}
      {!isCreator && userRsvp && (
        <p className="text-green-600">
          Şu anda RSVP durumun: <strong>{userRsvp.status}</strong>
        </p>
      )}
      {!isCreator && !userRsvp && (
        <p className="text-red-600">Henüz RSVP yapmadın.</p>
      )}

      {/* RSVP Seçimi */}
      {!isCreator && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRsvp();
          }}
          className="space-x-2"
        >
          <select
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
      )}
    </div>
  );
}

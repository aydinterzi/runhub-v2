import { notFound } from "next/navigation";
import db from "@/db";
import { events as eventsTable, rsvps } from "@/db/schema";
import { eq } from "drizzle-orm";
import EventDetailClient from "./client-part";

// Clerk server fonksiyonları:
import { clerkClient } from "@clerk/express";

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const eventId = parseInt(params.id, 10);

  // Etkinlik kaydı
  const [eventData] = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.id, eventId));

  if (!eventData) {
    return notFound();
  }

  // RSVP verileri
  const rsvpList = await db
    .select({
      id: rsvps.id,
      clerkUserId: rsvps.clerkUserId,
      eventId: rsvps.eventId,
      status: rsvps.status,
      createdAt: rsvps.createdAt,
    })
    .from(rsvps)
    .where(eq(rsvps.eventId, eventId));

  // Clerk'ten kullanıcı isim bilgisi çekme
  const rsvpListWithNames = await Promise.all(
    rsvpList.map(async (r) => {
      try {
        const user = await clerkClient.users.getUser(r.clerkUserId);

        const fullName =
          ((user.firstName ?? "") + " " + (user.lastName ?? "")).trim() ||
          user.username ||
          user.id;

        return {
          ...r,
          fullName,
        };
      } catch (err) {
        return {
          ...r,
          fullName: "Unknown User",
        };
      }
    })
  );

  const dateStr = new Date(eventData.eventDate).toLocaleString();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero bölümü */}
      <div className="relative w-full h-64 md:h-80 bg-gray-900 text-white flex items-center">
        <img
          src="/running-2.jpg"
          alt="Event background"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold">{eventData.name}</h1>
          <p className="mt-2 text-gray-200 text-sm md:text-base">
            {eventData.description}
          </p>
          <p className="text-gray-300 text-sm mt-1">
            Tarih: {dateStr} - Limit: {eventData.participantLimit ?? "Sınırsız"}
          </p>
        </div>
      </div>

      {/* İçerik */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <EventDetailClient eventData={eventData} rsvpList={rsvpListWithNames} />
      </div>
    </div>
  );
}

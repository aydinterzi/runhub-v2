import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import db from "@/db";
import { events as eventsTable, rsvps } from "@/db/schema";
import { eq } from "drizzle-orm";
import EventDetailClient from "./client-part";

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

  // RSVP listesi (kim, hangi status)
  const rsvpList = await db
    .select()
    .from(rsvps)
    .where(eq(rsvps.eventId, eventId));

  const dateStr = new Date(eventData.eventDate).toLocaleString();

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-xl mx-auto border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{eventData.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-gray-700">{eventData.description}</p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Etkinlik Tarihi:</span> {dateStr}
          </p>

          {/* Client tarafına rsvpList ve eventData (creatorUserId) geçiyoruz */}
          <EventDetailClient eventData={eventData} rsvpList={rsvpList} />
        </CardContent>
      </Card>
    </div>
  );
}

import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import db from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";

// Server Component
export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // URL'deki id değeri string gelecek, sayıya çeviriyoruz
  const eventId = parseInt(params.id, 10);

  // Drizzle ORM ile veritabanından ilgili etkinliği çekiyoruz
  const [eventData] = await db
    .select()
    .from(events)
    .where(eq(events.id, eventId));

  // Eğer kayıt bulunmazsa 404
  if (!eventData) {
    return notFound();
  }

  // Tarihi formatlama
  const dateStr = new Date(eventData.eventDate).toLocaleString();

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{eventData.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{eventData.description}</p>
          <p className="text-sm text-gray-600 mt-2">
            Etkinlik Tarihi: {dateStr}
          </p>
          <p className="text-sm text-gray-600">
            Katılımcı Limiti: {eventData.participantLimit ?? "Sınırsız"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

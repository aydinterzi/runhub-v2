import db from "@/db/index";
import { events as eventsTable } from "@/db/schema";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function EventsPage() {
  const allEvents = await db.select().from(eventsTable);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Etkinlikler</h1>
        <Link href="/events/create" className="text-blue-600">
          Yeni Etkinlik
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allEvents.map((ev) => (
          <Card key={ev.id}>
            <CardHeader>
              <CardTitle>{ev.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{ev.description}</p>
              <p className="text-sm text-gray-600 mt-2">
                Tarih: {new Date(ev.eventDate).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                Katılımcı Limiti: {ev.participantLimit ?? "—"}
              </p>
              <Link
                href={`/events/${ev.id}`}
                className="text-blue-600 text-sm mt-2 inline-block"
              >
                Detaylar
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

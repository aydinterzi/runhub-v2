import Link from "next/link";
import db from "@/db";
import { events as eventsTable } from "@/db/schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // shadcn/ui button örneği

export default async function EventsPage() {
  const allEvents = await db.select().from(eventsTable);

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Events</h1>
        <Link href="/events/create">
          <Button variant="default">Create New Event</Button>
        </Link>
      </header>

      {/* EVENTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {allEvents.map((ev) => (
          <Card key={ev.id} className="shadow hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                {ev.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{ev.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Date: {new Date(ev.eventDate).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Limit: {ev.participantLimit ?? "No limit"}
              </p>
              <div className="mt-4">
                <Link
                  href={`/events/${ev.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View Details
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

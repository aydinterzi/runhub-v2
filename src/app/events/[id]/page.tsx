import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import db from "@/db";
import { events as eventsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const eventId = parseInt(params.id, 10);
  const [eventData] = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.id, eventId));

  if (!eventData) {
    return notFound();
  }

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
            <span className="font-semibold">Event Date:</span> {dateStr}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Participant Limit:</span>{" "}
            {eventData.participantLimit ?? "No limit"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

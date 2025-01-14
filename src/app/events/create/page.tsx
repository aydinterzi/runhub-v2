"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createEventAction } from "../_actions";
import { useAuth } from "@clerk/nextjs";

export default function CreateEventPage() {
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-lg mx-auto border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Create a New Event
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              if (!userId) {
                router.push("/sign-in");
                return;
              }

              // creatorUserId olarak ekledik
              formData.append("creatorUserId", userId);

              await createEventAction(formData);
              router.push("/events");
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Event Name</Label>
              <Input id="name" name="name" required placeholder="Sunday Run" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Details about your event..."
              />
            </div>
            <div>
              <Label htmlFor="eventDate">Date & Time</Label>
              <Input
                id="eventDate"
                name="eventDate"
                type="datetime-local"
                required
              />
            </div>
            <div>
              <Label htmlFor="participantLimit">Participant Limit</Label>
              <Input
                id="participantLimit"
                name="participantLimit"
                type="number"
                placeholder="e.g. 50"
              />
            </div>

            <Button type="submit" className="mt-4 w-full">
              Create Event
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

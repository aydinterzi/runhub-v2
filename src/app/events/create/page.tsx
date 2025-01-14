"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createEventAction } from "../_actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateEventPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Etkinlik Oluştur</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              await createEventAction(formData);
              router.push("/events");
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Etkinlik Adı</Label>
              <Input
                id="name"
                name="name"
                placeholder="Sabah Koşusu"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Etkinliğin detayları..."
              />
            </div>
            <div>
              <Label htmlFor="eventDate">Tarih & Saat</Label>
              <Input
                id="eventDate"
                name="eventDate"
                type="datetime-local"
                required
              />
            </div>
            <div>
              <Label htmlFor="participantLimit">Katılımcı Limiti</Label>
              <Input
                id="participantLimit"
                name="participantLimit"
                type="number"
              />
            </div>
            <Button type="submit">Oluştur</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

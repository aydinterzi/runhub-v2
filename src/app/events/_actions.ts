"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/index";
import { events, rsvps } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function createEventAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const eventDateStr = formData.get("eventDate") as string;
  const participantLimitStr = formData.get("participantLimit") as string;
  // EKLENDİ
  const creatorUserId = formData.get("creatorUserId") as string;

  const eventDate = new Date(eventDateStr);
  const participantLimit = participantLimitStr
    ? parseInt(participantLimitStr, 10)
    : null;

  await db.insert(events).values({
    name,
    description,
    eventDate,
    participantLimit,
    creatorUserId, // EKLENDİ
  });

  revalidatePath("/events");
}

// Opsiyonel: Etkinlik silme/düzenleme gibi aksiyonlar
export async function deleteEventAction(id: number) {
  await db.delete(events).where(eq(events.id, id));
  revalidatePath("/events");
}

export async function rsvpEventAction(formData: FormData) {
  const clerkUserId = formData.get("clerkUserId") as string;
  const eventIdStr = formData.get("eventId") as string;
  const status = formData.get("status") as string; // "GOING", "MAYBE", "NOT" vb.

  const eventId = parseInt(eventIdStr, 10);

  // Daha önce RSVP yapıldı mı?
  const existing = await db
    .select()
    .from(rsvps)
    .where(and(eq(rsvps.clerkUserId, clerkUserId), eq(rsvps.eventId, eventId)));

  if (existing.length > 0) {
    // Daha önce varsa güncelle
    await db.update(rsvps).set({ status }).where(eq(rsvps.id, existing[0].id));
  } else {
    // Yoksa yeni kayıt
    await db.insert(rsvps).values({
      clerkUserId,
      eventId,
      status,
    });
  }

  revalidatePath(`/events/${eventIdStr}`);
}

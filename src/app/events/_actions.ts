"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/index";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createEventAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const eventDateStr = formData.get("eventDate") as string;
  const participantLimitStr = formData.get("participantLimit") as string;

  // FormData string döndüreceği için dönüştürelim
  const eventDate = new Date(eventDateStr);
  const participantLimit = participantLimitStr
    ? parseInt(participantLimitStr, 10)
    : null;

  await db.insert(events).values({
    name,
    description,
    eventDate,
    participantLimit,
  });

  revalidatePath("/events");
}

// Opsiyonel: Etkinlik silme/düzenleme gibi aksiyonlar
export async function deleteEventAction(id: number) {
  await db.delete(events).where(eq(events.id, id));
  revalidatePath("/events");
}

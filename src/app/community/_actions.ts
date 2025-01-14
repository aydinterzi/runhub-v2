"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/index";
import { communities } from "@/db/schema";
import { eq } from "drizzle-orm";

// Topluluk oluşturma
export async function createCommunityAction(formData: FormData) {
  // formData'dan alanları çekiyoruz
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;

  // Drizzle ile veritabanına kayıt
  await db.insert(communities).values({
    name,
    description,
    location,
  });

  // Listeleme sayfasının ("/community") revalidate edilmesi
  revalidatePath("/community");
}

// Tek topluluğu silme (opsiyonel örnek)
export async function deleteCommunityAction(id: number) {
  await db.delete(communities).where(eq(communities.id, id));
  revalidatePath("/community");
}

"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/index";
import { communities, communityMembers } from "@/db/schema";
import { and, eq } from "drizzle-orm";

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

export async function joinCommunityAction(formData: FormData) {
  const clerkUserId = formData.get("clerkUserId") as string;
  const communityIdStr = formData.get("communityId") as string;

  // parseInt
  const communityId = parseInt(communityIdStr, 10);

  // Daha önce katılmış mı kontrol edebilirsiniz
  const existing = await db
    .select()
    .from(communityMembers)
    .where(
      and(
        eq(communityMembers.clerkUserId, clerkUserId),
        eq(communityMembers.communityId, communityId)
      )
    );

  if (existing.length === 0) {
    // Kayıt yoksa yeni satır ekle
    await db.insert(communityMembers).values({
      clerkUserId,
      communityId,
    });
  }

  // Liste sayfasını veya detay sayfasını revalidate edin
  revalidatePath(`/community/${communityIdStr}`);
}

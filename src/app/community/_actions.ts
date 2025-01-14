// app/community/_actions.ts
"use server";

import { revalidatePath } from "next/cache";
import db from "@/db/index";
import { communities, communityMembers } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function createCommunityAction(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const creatorUserId = formData.get("creatorUserId") as string;

  await db.insert(communities).values({
    name,
    description,
    location,
    creatorUserId,
  });

  revalidatePath("/community");
}

export async function joinCommunityAction(formData: FormData) {
  const clerkUserId = formData.get("clerkUserId") as string;
  const communityIdStr = formData.get("communityId") as string;
  const communityId = parseInt(communityIdStr, 10);

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
    await db.insert(communityMembers).values({ clerkUserId, communityId });
  }

  revalidatePath(`/community/${communityIdStr}`);
}

import { notFound } from "next/navigation";
import db from "@/db";
import { communities, communityMembers } from "@/db/schema";
import { eq } from "drizzle-orm";
import CommunityDetailClient from "./client-part";

// Clerk server fonksiyonları:
import { clerkClient } from "@clerk/express";

export default async function CommunityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const communityId = parseInt(params.id, 10);

  // 1) Topluluk kaydını çek
  const [community] = await db
    .select()
    .from(communities)
    .where(eq(communities.id, communityId));

  if (!community) {
    return notFound();
  }

  // 2) Kimler katılmış? (clerkUserId, joinedAt)
  const members = await db
    .select({
      clerkUserId: communityMembers.clerkUserId,
      joinedAt: communityMembers.joinedAt,
    })
    .from(communityMembers)
    .where(eq(communityMembers.communityId, communityId));

  // 3) Clerk'ten ad-soyad bilgisini çek
  const membersWithNames = await Promise.all(
    members.map(async (m) => {
      try {
        const user = await clerkClient.users.getUser(m.clerkUserId);
        const fullName =
          ((user.firstName ?? "") + " " + (user.lastName ?? "")).trim() ||
          user.username ||
          user.id;

        return {
          clerkUserId: m.clerkUserId,
          joinedAt: m.joinedAt,
          fullName,
        };
      } catch (err) {
        console.error("User not found in Clerk:", m.clerkUserId, err);
        return {
          clerkUserId: m.clerkUserId,
          joinedAt: m.joinedAt,
          fullName: "Unknown User",
        };
      }
    })
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Örnek hero bölümü */}
      <div className="relative w-full h-64 md:h-80 bg-gray-900 text-white flex items-center">
        <img
          src="/running-1.jpg"
          alt="Community background"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold">{community.name}</h1>
          <p className="text-sm md:text-base text-gray-200 mt-2 max-w-xl">
            {community.description || "Koşu topluluğu açıklaması..."}
          </p>
          <p className="mt-2 text-gray-300 text-sm">
            Lokasyon: {community.location || "Belirtilmemiş"}
          </p>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-6">
        {/* Client tarafı bileşeni: join butonu, üye listesi vb. */}
        <CommunityDetailClient
          communityId={community.id}
          creatorUserId={community.creatorUserId}
          members={membersWithNames}
        />
      </div>
    </div>
  );
}

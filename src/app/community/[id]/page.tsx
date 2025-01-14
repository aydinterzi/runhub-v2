import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import db from "@/db";
import { communities, communityMembers } from "@/db/schema";
import { eq } from "drizzle-orm";
import CommunityDetailClient from "./client-part";

export default async function CommunityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const communityId = parseInt(params.id, 10);
  const [community] = await db
    .select()
    .from(communities)
    .where(eq(communities.id, communityId));

  if (!community) {
    return notFound();
  }

  // Kimler katılmış?
  const members = await db
    .select()
    .from(communityMembers)
    .where(eq(communityMembers.communityId, communityId));

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{community.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{community.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Lokasyon: {community.location || "Belirtilmemiş"}
          </p>

          {/* Client tarafında, creatorUserId ve members gibi bilgileri
              kullanarak "katıldı mı", "creator mı" gibi durumları yöneteceğiz. */}
          <CommunityDetailClient
            communityId={community.id}
            creatorUserId={community.creatorUserId}
            members={members} // clerkUserId, communityId, joinedAt
          />
        </CardContent>
      </Card>
    </div>
  );
}

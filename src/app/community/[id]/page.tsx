import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import db from "@/db";
import { communities } from "@/db/schema";
import { eq } from "drizzle-orm";
import JoinCommunityButton from "./join-button";

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

          {/* "Join" butonu veya formu */}
          <div className="mt-4">
            <JoinCommunityButton communityId={community.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

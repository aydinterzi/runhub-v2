import db from "@/db/index";
import { communities } from "@/db/schema";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function CommunityListPage() {
  // Server component içinde doğrudan DB sorgusu
  const allCommunities = await db.select().from(communities);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Topluluklar</h1>
        <Link href="/community/create" className="text-blue-600">
          Yeni Topluluk Oluştur
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allCommunities.map((com) => (
          <Card key={com.id}>
            <CardHeader>
              <CardTitle>{com.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{com.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Lokasyon: {com.location || "—"}
              </p>
              <Link
                href={`/community/${com.id}`}
                className="text-blue-600 text-sm mt-2 inline-block"
              >
                Detaylar
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

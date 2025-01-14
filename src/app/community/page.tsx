// app/community/page.tsx
import db from "@/db";
import { communities } from "@/db/schema";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function CommunityListPage() {
  const allCommunities = await db.select().from(communities);

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Communities</h1>
        <Link href="/community/create">
          <Button variant="default">Create New Community</Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {allCommunities.map((com) => (
          <Card key={com.id} className="shadow hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                {com.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{com.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Location: {com.location || "N/A"}
              </p>
              <Link
                href={`/community/${com.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm mt-3 block"
              >
                View Details
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

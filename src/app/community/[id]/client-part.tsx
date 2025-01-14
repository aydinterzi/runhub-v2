"use client";

import { useAuth } from "@clerk/nextjs";
import { joinCommunityAction } from "../_actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type MemberWithName = {
  clerkUserId: string;
  joinedAt: Date;
  fullName: string;
};

interface CommunityDetailClientProps {
  communityId: number;
  creatorUserId: string;
  members: MemberWithName[];
}

export default function CommunityDetailClient({
  communityId,
  creatorUserId,
  members,
}: CommunityDetailClientProps) {
  const { userId } = useAuth();
  const router = useRouter();

  const isCreator = userId === creatorUserId;
  const isMember = members.some((m) => m.clerkUserId === userId);

  async function handleJoin() {
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    const fd = new FormData();
    fd.append("clerkUserId", userId);
    fd.append("communityId", String(communityId));

    await joinCommunityAction(fd);
    router.refresh();
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Creator ise üye listesini görsün */}
      {isCreator && (
        <div className="bg-gray-100 p-3 rounded">
          <p className="font-semibold mb-2">Topluluk Üyeleri</p>
          {members.length === 0 ? (
            <p className="text-sm text-gray-500">Henüz üye yok.</p>
          ) : (
            <ul className="list-disc list-inside text-sm space-y-1">
              {members.map((m) => (
                <li key={m.clerkUserId}>
                  <strong>{m.fullName}</strong> –{" "}
                  <span className="text-gray-600">
                    Katılım: {new Date(m.joinedAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Kullanıcı üye değilse "Katıl" butonu göster */}
      {!isCreator && !isMember && (
        <Button onClick={handleJoin}>Topluluğa Katıl</Button>
      )}
      {isMember && !isCreator && (
        <p className="text-green-600">Bu topluluğa katıldın!</p>
      )}
    </div>
  );
}

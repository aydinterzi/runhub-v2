"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { joinCommunityAction } from "../_actions";
import { useRouter } from "next/navigation";

type Member = {
  clerkUserId: string;
  communityId: number;
  joinedAt: Date;
};

interface CommunityDetailClientProps {
  communityId: number;
  creatorUserId: string;
  members: Member[];
}

export default function CommunityDetailClient({
  communityId,
  creatorUserId,
  members,
}: CommunityDetailClientProps) {
  const { userId } = useAuth(); // Şu anki oturum açmış kullanıcının ID'si
  const router = useRouter();

  // Topluluğu oluşturan kişi mi?
  const isCreator = userId === creatorUserId;

  // Kullanıcı bu topluluğa katılmış mı?
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
    <div className="mt-4">
      {/* Creator'a özel: Kimler katılmış göstersin */}
      {isCreator && (
        <div className="mb-4 bg-gray-100 p-2 rounded">
          <p className="font-semibold">Üyeler:</p>
          {members.length === 0 ? (
            <p className="text-sm text-gray-500">Henüz üye yok.</p>
          ) : (
            <ul className="list-disc list-inside text-sm">
              {members.map((m) => (
                <li key={m.clerkUserId}>
                  {m.clerkUserId} (joined at{" "}
                  {new Date(m.joinedAt).toLocaleDateString()})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Kullanıcı zaten üye mi? Değilse buton göster */}
      {!isCreator && !isMember && (
        <Button onClick={handleJoin}>Topluluğa Katıl</Button>
      )}

      {isMember && !isCreator && (
        <p className="text-green-700">Bu topluluğa katıldın!</p>
      )}
    </div>
  );
}

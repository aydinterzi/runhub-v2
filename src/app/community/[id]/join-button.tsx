"use client";

import { useAuth } from "@clerk/nextjs";
// veya Clerk'teki benzer bir hook'u kullanarak giriş yapan kullanıcının ID'sine erişebilirsiniz.
// Aksi halde user tablosu varsa oradan userId alabilirsiniz.

import { Button } from "@/components/ui/button";
import { joinCommunityAction } from "../_actions";
import { useRouter } from "next/navigation";

export default function JoinCommunityButton({
  communityId,
}: {
  communityId: number;
}) {
  const { userId } = useAuth(); // Clerk'te userId'ye böyle erişiliyor.
  const router = useRouter();

  // Eğer userId yoksa (login değilse), buton "Giriş Yap" gibi bir şey olabilir.
  if (!userId) {
    return (
      <Button variant="outline" onClick={() => router.push("/sign-in")}>
        Giriş Yap
      </Button>
    );
  }

  return (
    <form
      action={async (formData) => {
        await joinCommunityAction(formData);
        router.refresh(); // sayfayı yenile
      }}
    >
      {/* Hidden inputs ile parametreleri formData'ya ekliyoruz */}
      <input type="hidden" name="clerkUserId" value={userId} />
      <input type="hidden" name="communityId" value={communityId} />
      <Button type="submit" variant="default">
        Topluluğa Katıl
      </Button>
    </form>
  );
}

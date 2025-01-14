"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createCommunityAction } from "../_actions"; // server action
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
export default function CreateCommunityPage() {
  const router = useRouter();

  // Formun "action" prop'u Server Action fonksiyonunu işaret edecek
  // onSubmit yerine, form otomatik olarak bu action'a POST gönderecek
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Topluluk Oluştur</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              // Bu callback "use server" fonksiyonuna gitmeden önce
              // client tarafında ek bir şey yapmak isterseniz.
              await createCommunityAction(formData);
              router.push("/community");
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Adı</Label>
              <Input id="name" name="name" placeholder="Koşu Kulübü" required />
            </div>
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Açıklama giriniz"
              />
            </div>
            <div>
              <Label htmlFor="location">Lokasyon</Label>
              <Input id="location" name="location" placeholder="İstanbul" />
            </div>
            <Button type="submit">Oluştur</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

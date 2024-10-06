"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { firestore } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ChatSend() {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const onClick = async () => {
    if (!user) {
      toast.error("no user found");
      return;
    }

    if (text.trim() === "") {
      toast.error("please enter valid message!");
      return;
    }

    const { uid, displayName, photoURL } = user;
    await addDoc(collection(firestore, "chat"), {
      messages: text,
      displayName,
      photoURL,
      uid,
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div className="flex gap-1 py-4 my-2 border-t">
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={onClick}>
        <Send className="size-4" />
      </Button>
    </div>
  );
}

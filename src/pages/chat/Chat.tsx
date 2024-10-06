// import LoaderFade from "@/components/LoaderFade";
import { firestore } from "@/lib/firebase";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import ChatSend from "./ChatSend";
import { useAuth } from "@/hooks/useAuth";

export type ChatType = {
  id: string;
  messages: string;
  displayName: string;
  photoURL: string;
  uid: string;
  createdAt: Date;
};

export default function Chat() {
  const [pesan, setPesan] = useState<ChatType[]>([]);
  const { user } = useAuth();
  // const [pendingPage, setPendingPage] = useState(false);

  useEffect(() => {
    const q = query(collection(firestore, "chat"), orderBy("createdAt", "desc"), limit(10));

    // const getData = async () => {
    //   try {
    //     setPendingPage(true);
    //     const snapshot = await getDocs(query(q));
    //     const filteredData = snapshot.docs.map((doc) => {
    //       return { id: doc.id, ...doc.data() };
    //     });
    //     setPesan(filteredData as ChatType[]);
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setPendingPage(false);
    //   }
    // };
    // getData();

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const hasil: ChatType[] = [];
      snapshot.forEach((doc) => {
        hasil.push({ ...doc.data(), id: doc.id } as ChatType);
      });
      setPesan(hasil);

      // snapshot.docChanges().forEach((change) => {
      //   if (change.type === "added") {
      //     setPesan((prev) => [...prev, change.doc.data() as ChatType]);
      //   }
      //   // if (change.type === "modified") {
      //   //   console.log("Modified city: ", change.doc.data());
      //   // }
      //   if (change.type === "removed") {
      //     setPesan((prev) => [...prev.filter((item) => item.id !== change.doc.id)]);
      //   }
      // });
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const chatBox = document.getElementById("chat-box");
    if (chatBox) {
      chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
    }
  }, [pesan]);

  return (
    <div className="border max-w-lg mx-auto h-[calc(100vh-8rem)] flex flex-col p-3">
      <div id="chat-box" className="h-[calc(100vh-12rem)] overflow-y-scroll">
        {/* {pendingPage && <LoaderFade />} */}
        <div className="my-2 flex flex-col">
          {pesan
            ?.map((item, i) => (
              <div key={i} className={`max-w-fit ${item.displayName === user?.displayName ? "self-end" : ""}`}>
                <span className="text-xs text-muted-foreground">{item.displayName}</span>
                <p
                  className={`${
                    item.displayName === user?.displayName ? "bg-primary text-white" : ""
                  } border rounded-lg p-2`}
                >
                  {item.messages}
                </p>
              </div>
            ))
            .reverse()}
        </div>
      </div>
      <ChatSend />
    </div>
  );
}

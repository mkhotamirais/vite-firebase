import LoaderFade from "@/components/LoaderFade";
import { Button } from "@/components/ui/button";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleDelDialog from "./ArticleDelDialog";

export type ArticleType = {
  id: string;
  title: string;
  content: string;
};

export default function Article() {
  const [data, setData] = useState<ArticleType[]>([]);
  const [pendingPage, setPendingPage] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setPendingPage(true);
        const snapshot = await getDocs(query(collection(firestore, "articles")));
        const filteredData = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setData(filteredData as ArticleType[]);
      } catch (error) {
        console.log(error);
      } finally {
        setPendingPage(false);
      }
    };
    getData();

    const q = query(collection(firestore, "articles"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change);
        if (change.type === "added") {
          console.log("New city: ", change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
          setData((prev) => [...prev.filter((item) => item.id !== change.doc.id)]);
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="py-4">
      <div className="flex items-center justify-between pb-2">
        <h1 className="text-lg font-semibold text-primary mb-2">Article List</h1>
        <Button asChild>
          <Link to="/article/create">Create New</Link>
        </Button>
      </div>
      {pendingPage && <LoaderFade />}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
        {data.map((article) => (
          <div key={article.id} className="relative border rounded p-3">
            <h1 className="capitalize text-primary">{article.title}</h1>
            <p className="text-sm">{article.content}</p>
            <div className="absolute top-0 right-0 p-2">
              <ArticleDelDialog item={article} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

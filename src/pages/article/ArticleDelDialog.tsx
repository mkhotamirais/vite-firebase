import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash } from "lucide-react";
import { ArticleType } from "./Article";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useState } from "react";
import { toast } from "sonner";

export default function ArticleDelDialog({ item }: { item: ArticleType }) {
  const [pending, setPending] = useState(false);
  const onDel = async () => {
    setPending(true);
    await deleteDoc(doc(firestore, "articles", item.id))
      .then(() => {
        toast.success(`Delete ${item.title} success!`);
      })
      .catch((err) => {
        console.log(err);
        console.log(`Delete data failed`);
      })
      .finally(() => {
        setPending(false);
        document.getElementById(`dialog-close-${item.id}`)?.click();
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="flex">
        <Button size="icon" variant="destructive">
          <Trash className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete <span className="italic text-destructive">{item.title}</span>, Are you absolutely sure?
          </DialogTitle>
          <DialogDescription>This action cannot be undone!</DialogDescription>
          <div className="inline-flex justify-center sm:justify-start gap-2">
            <Button disabled={pending} variant="destructive" onClick={onDel}>
              {pending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              Delete
            </Button>
            <DialogClose asChild>
              <Button disabled={pending} variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

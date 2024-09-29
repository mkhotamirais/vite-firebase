import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import LoaderFade from "@/components/LoaderFade";

const ArticleSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  active: z.boolean(),
});

type ArticleType = z.infer<typeof ArticleSchema>;

export default function ArticleUpdate() {
  const { id } = useParams();

  const [pending, setPending] = useState(false);
  const [pendingPage, setPendingPage] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ArticleType>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: { title: "", content: "", active: false },
  });

  useEffect(() => {
    const getData = async () => {
      if (!id) return;
      try {
        setPendingPage(true);
        const snapshot = await getDoc(doc(firestore, "articles", id));
        form.reset({ ...snapshot.data() });
      } catch (error) {
        console.log(error);
      } finally {
        setPendingPage(false);
      }
    };
    getData();
  }, [id, form]);

  const onSubmit = async (values: ArticleType) => {
    setPending(true);
    if (id) {
      await updateDoc(doc(firestore, "articles", id), values)
        .then(() => {
          toast.success("berhasil");
          navigate("/article");
        })
        .catch((err) => {
          console.log(err);
          toast.error("gagal");
        })
        .finally(() => setPending(false));
    }
  };

  return (
    <div className="py-4">
      <h1 className="text-lg font-semibold text-primary mb-2">ArticleUpdate</h1>
      {pendingPage && <LoaderFade />}
      {!pendingPage && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input disabled={pending} placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input disabled={pending} placeholder="Content" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-0 leading-none">
                    <FormLabel>Active</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button disabled={pending} type="submit">
              {pending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}

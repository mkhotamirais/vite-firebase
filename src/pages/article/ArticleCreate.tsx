import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ArticleSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  active: z.boolean(),
});

type ArticleType = z.infer<typeof ArticleSchema>;

export default function ArticleCreate() {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ArticleType>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: { title: "", content: "", active: false },
  });

  const onSubmit = async (values: ArticleType) => {
    setPending(true);
    await addDoc(collection(firestore, "articles"), values)
      .then(() => {
        toast.success("berhasil");
        navigate("/article");
      })
      .catch((err) => {
        console.log(err);
        toast.error("gagal");
      })
      .finally(() => setPending(false));
  };

  return (
    <div className="py-4">
      <h1 className="text-lg font-semibold text-primary mb-2">ArticleCreate</h1>
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

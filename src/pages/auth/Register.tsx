import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "./authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type RegisterType = z.infer<typeof RegisterSchema>;

export default function Register() {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "", confPassword: "" },
  });
  const onSubmit = async (values: RegisterType) => {
    setPending(true);
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        updateProfile(res.user, { displayName: values.name });
        toast.success("Register success");
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.message);
      })
      .finally(() => setPending(false));
  };

  return (
    <section className="py-12">
      <div className="max-w-md mx-auto border p-6 rounded-xl">
        <h1 className="text-2xl font-bold pb-3 text-center">Register</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={pending} placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" disabled={pending} placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={pending} placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={pending} placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={pending} type="submit" className="w-full">
              {pending && <Loader2 className="animate-spin size-4 mr-2" />}
              Register
            </Button>
          </form>
        </Form>
        <div className="flex items-center justify-center pt-4">
          <Button asChild variant="link">
            <Link to="/sign-in">Already have an account?</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

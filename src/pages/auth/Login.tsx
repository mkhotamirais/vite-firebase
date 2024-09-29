import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { LoginSchema } from "./authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "@/components/ui/separator";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, githubProvider, googleProvider } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { FaGithub } from "react-icons/fa6";

type LoginType = z.infer<typeof LoginSchema>;

export default function Login() {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginType) => {
    setPending(true);
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        toast.success("Login success");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.message);
      })
      .finally(() => setPending(false));
  };

  const onGoogleAuth = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const onGithubAuth = async () => {
    await signInWithPopup(auth, githubProvider);
  };

  return (
    <section className="py-12">
      <div className="max-w-md mx-auto border p-6 rounded-xl">
        <h1 className="text-2xl font-bold pb-3 text-center mb-3">Login</h1>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button className="w-full" onClick={onGoogleAuth} variant={"outline"}>
            <FcGoogle className="mr-2" /> Login with google
          </Button>
          <Button className="w-full" onClick={onGithubAuth} variant={"outline"}>
            <FaGithub className="mr-2" /> Login with Github
          </Button>
        </div>

        <div className="relative py-8">
          <p className="z-10 absolute left-1/2 -translate-y-1/2 top-1/2 -translate-x-1/2 text-sm bg-background px-3">
            Or
          </p>
          <Separator />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button disabled={pending} type="submit" className="w-full">
              {pending && <Loader2 className="animate-spin size-4 mr-2" />}
              Login
            </Button>
          </form>
        </Form>
        <div className="flex items-center justify-center pt-4">
          <Button asChild variant="link">
            <Link to="/sign-up">Do not have an account?</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { loginAction } from "@/actions/auth/login.action";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const user = await loginAction(data);
      toast.success("Login successful!");

      // Redirection based on role
      const role = user?.role;
      if (role === "ADMIN") {
        router.push("/dashboard");
      } else if (role === "SUPER ADMIN") {
        router.push("/dashboard");
      } else if (role === "INSTRUCTOR") {
        router.push("/dashboard");
      } else if (role === "STUDENT") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input {...form.register("email")} type="email" placeholder="john@example.com" />
            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input {...form.register("password")} type="password" placeholder="******" />
            <FieldError>{form.formState.errors.password?.message}</FieldError>
          </Field>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

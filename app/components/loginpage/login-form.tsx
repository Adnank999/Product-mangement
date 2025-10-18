"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch } from "react-redux";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/app/redux/auth/authApi";
import { setToken } from "@/app/redux/auth/authSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

const onSubmit = async (data: LoginFormData) => {
  try {
    const response = await login(data).unwrap();

    dispatch(setToken(response.token));

   
    Cookies.set("authToken", response.token, {
      expires: 1, 
      secure: true,
      sameSite: "strict",
    });

    router.push("/");
  } catch (error) {
    console.error("Login failed:", error);
  }
};

  return (
    <div className={cn("flex flex-col gap-6 mt-8", className)} {...props}>
      <Card>
        <CardContent className="grid p-0">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-4">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground">Login to your account</p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </Field>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

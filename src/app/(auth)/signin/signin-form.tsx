/* eslint-disable @next/next/no-img-element */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";

const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        setError(null);
        setPending(true);

        try {
            await authClient.signIn.email(
                { email: values.email, password: values.password, callbackURL: "/dashboard" },
                {
                    onSuccess: () => router.push("/dashboard"),
                    onError: ({ error }: { error: Error }) => {
                        setError(error.message);
                        toast.error("Login failed", { description: error.message });
                    },
                }
            );
        } finally {
            setPending(false);
        }
    };

    const signInWithSocial = async (provider: "github") => {
        setError(null);
        setPending(true);

        try {
            await authClient.signIn.social(
                { provider, callbackURL: "/" },
                {
                    onError: ({ error }: { error: Error }) => {
                        setError(error.message);
                        toast.error("Login failed", { description: error.message });
                    },
                }
            );
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden">
                <CardContent className="grid md:grid-cols-3">
                    {/* Form Section */}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-6 p-6 md:p-8"
                        >
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h1 className="font-bold text-2xl sm:text-3xl">Welcome Back</h1>
                                <p className="text-muted-foreground text-sm">Sign in to your account</p>
                            </div>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="your.email@example.com"
                                                {...field}
                                            />
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
                                            <Input
                                                type="password"
                                                placeholder="********"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {error && (
                                <Alert className="flex items-center gap-2 border-none bg-destructive/10">
                                    <OctagonAlertIcon className="h-4 w-4 text-destructive" />
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={pending}
                            >
                                {pending ? "Signing in..." : "Sign In"}
                            </Button>

                            <div className="relative py-2 text-center text-sm">
                                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                                <div className="absolute inset-0 top-1/2 border-border border-t" />
                            </div>

                            {/* Social Login */}
                            <div className="grid gap-4">
                                <Button
                                    variant="outline"
                                    className="flex w-full items-center justify-center gap-2"
                                    onClick={() => signInWithSocial("github")}
                                    disabled={pending}
                                >
                                    <FaGithub className="h-5 w-5" />
                                    Github
                                </Button>
                            </div>

                            <p className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="underline underline-offset-4"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </form>
                    </Form>

                    {/* Optional Illustration / Graphic */}
                    <div className="col-span-2 hidden flex-col items-center justify-center gap-y-4 bg-radial from-sidebar-accent to-sidebar md:flex" />
                </CardContent>
            </Card>

            <p className="text-center text-muted-foreground text-xs">
                By signing up, you agree to our{" "}
                <Link
                    href="/#"
                    className="underline"
                >
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                    href="/#"
                    className="underline"
                >
                    Privacy Policy
                </Link>
                .
            </p>
        </div>
    );
};

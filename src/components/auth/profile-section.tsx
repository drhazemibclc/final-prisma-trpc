"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "better-auth";
import { Loader, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { UploadButton } from "../common/upload";

const formSchema = z.object({
    name: z.string().min(2).max(25),
});

export const ProfileSection = ({ user, className }: { user: User; className?: string }) => {
    const [animate] = useAutoAnimate();
    const [isProfileBoxOpen, setIsProfileBoxOpen] = useState(false);
    const [image, setImage] = useState<string | undefined>(user.image ?? undefined);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: user.name },
    });

    const onProfileSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            await authClient.updateUser({ name: data.name, image });
            window.location.reload();
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const [animateRef] = useAutoAnimate();

    return (
        <div className={cn("flex w-full flex-col gap-8 py-3 md:flex-row md:gap-0", className)}>
            <p className="pointer-events-none font-medium text-sm">Profile</p>
            <div
                className="w-full md:w-[65%]"
                ref={animate}
            >
                {!isProfileBoxOpen ? (
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={user.image ?? undefined} />
                            <AvatarFallback className="bg-gradient-to-b from-gray-700 via-gray-900 to-black text-white">
                                <UserIcon className="size-4" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="font-medium text-sm">{user.name}</p>
                        </div>
                        <Button
                            className="ml-auto text-sm"
                            onClick={() => setIsProfileBoxOpen(true)}
                            size="sm"
                            variant="ghost"
                        >
                            Update profile
                        </Button>
                    </div>
                ) : (
                    <Card className="shadow-md">
                        <CardHeader className="flex w-full flex-row items-center justify-between">
                            <CardTitle className="text-sm tracking-tight">Update profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6 flex items-center gap-3">
                                <Avatar className="size-12">
                                    <AvatarImage src={image ?? user.image ?? undefined} />
                                    <AvatarFallback className="bg-gradient-to-b from-gray-700 via-gray-900 to-black text-white">
                                        <UserIcon className="size-5" />
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex items-center space-x-2">
                                    <UploadButton
                                        className="ut-button:h-8 ut-button:w-20 ut-button:border ut-button:bg-transparent ut-button:text-black/60 ut-button:text-xs ut-button:transition-all hover:ut-button:bg-black/5 hover:ut-button:text-black focus-visible:ut-button:ring-[4px] focus-visible:ut-button:ring-ring/20"
                                        onUploadCompleteAction={(url: string) => setImage(url)}
                                    />

                                    <Button
                                        className="text-destructive transition-all hover:bg-destructive/5 hover:text-destructive/80 focus-visible:border-2 focus-visible:border-destructive/15 focus-visible:ring-destructive/30"
                                        onClick={() => {
                                            setImage(undefined);
                                            router.refresh();
                                        }}
                                        size="sm"
                                        variant="ghost"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onProfileSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm">Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        placeholder="John Doe"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="mt-4 flex justify-end gap-2">
                                        <Button
                                            onClick={() => setIsProfileBoxOpen(false)}
                                            size="sm"
                                            type="button"
                                            variant="ghost"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            className="bg-blue-500 shadow-inner hover:bg-blue-600 hover:ring-blue-600"
                                            disabled={isLoading}
                                            ref={animateRef}
                                            size="sm"
                                            type="submit"
                                        >
                                            {isLoading && (
                                                <Loader className="mr-3 ml-3 size-4 animate-spin text-white" />
                                            )}
                                            Save
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

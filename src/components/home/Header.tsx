"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { BabyIcon, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { publicNavLinks } from "@/constants/navLink";
import { useSession } from "@/lib/auth/auth-client";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [parent] = useAutoAnimate<HTMLDivElement>();
    const pathname = usePathname();
    const { data: session } = useSession();

    const role = session?.user?.role;

    // role-based links
    const roleLinks =
        role === "ADMIN"
            ? [{ label: "Admin Panel", href: "/admin" }]
            : role === "DOCTOR"
              ? [{ label: "Doctor Panel", href: "/doctor" }]
              : role === "PATIENT"
                ? [{ label: "My Records", href: "/patient" }]
                : [];

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
            <div className="container mx-auto flex items-center justify-between p-4 md:px-8">
                {/* Logo */}
                <Link
                    className="flex items-center space-x-2 font-bold text-2xl text-blue-600"
                    href="/"
                >
                    <BabyIcon
                        aria-hidden
                        className="h-8 w-8 text-pink-500"
                    />
                    <span>Smart Clinic</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden space-x-6 lg:flex">
                    {publicNavLinks.map(link => (
                        <Link
                            className={`font-medium text-sm transition-colors hover:text-blue-600 ${
                                pathname === link.href ? "text-blue-600" : "text-gray-600"
                            }`}
                            href={link.href}
                            key={link.label}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {roleLinks.map(link => (
                        <Link
                            className={`font-medium text-sm transition-colors hover:text-blue-600 ${
                                pathname === link.href ? "text-blue-600" : "text-gray-600"
                            }`}
                            href={link.href}
                            key={link.label}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Auth Buttons */}
                <div className="hidden items-center space-x-4 lg:flex">
                    {session ? (
                        <Link
                            className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white"
                            href="/dashboard"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                className="text-gray-600"
                                href="/signin"
                            >
                                Sign In
                            </Link>
                            <Link
                                className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white"
                                href="/signup"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    aria-label="Toggle menu"
                    className="rounded-md p-2 text-gray-600 lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    type="button"
                >
                    {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            <div ref={parent}>
                {isMenuOpen && (
                    <nav className="flex flex-col space-y-4 border-t p-4 lg:hidden">
                        {publicNavLinks.map(link => (
                            <Link
                                href={link.href}
                                key={link.label}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {roleLinks.map(link => (
                            <Link
                                href={link.href}
                                key={link.label}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
}

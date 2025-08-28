"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
    const links = [
        { to: "/", label: "Home" },
        { to: "/dashboard", label: "Dashboard" },
    ] as const;

    return (
        <div>
            <div className="flex flex-row items-center justify-between px-2 py-1">
                <nav className="flex gap-4 text-lg">
                    {links.map(({ to, label }) => {
                        return (
                            <Link
                                href={to}
                                key={to}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="gapMAGIC_NUMBER_1 flex items-center">
                    <ModeToggle />
                    <UserMenu />
                </div>
            </div>
            <hr />
        </div>
    );
}

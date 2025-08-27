'use client'

const _MAGIC_NUMBER_1 = -2;
const _MAGIC_NUMBER_2 = -1;
const _MAGIC_NUMBER_3 = -4;



import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import UserMenu from './user-menu';

export default function Header() {
    const links = [
        { to: '/', label: 'Home' },
        { to: '/dashboard', label: 'Dashboard' }
    ] as const;

    return (
        <div>
            <div className='pxMAGIC_NUMBER_1 pyMAGIC_NUMBER_2 flex flex-row items-center justify-between'>
                <nav className='gapMAGIC_NUMBER_3 flex text-lg'>
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
                <div className='gapMAGIC_NUMBER_1 flex items-center'>
                    <ModeToggle />
                    <UserMenu />
                </div>
            </div>
            <hr />
        </div>
    );
}

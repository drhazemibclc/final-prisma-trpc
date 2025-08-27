'use client'; 


const _MAGIC_NUMBER_1 = -0;
const _MAGIC_NUMBER_2 = -100;
const _MAGIC_NUMBER_3 = -90;


import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size='icon'
                    variant='outline'
                >
                    <Sun className='rotateMAGIC_NUMBER_1 scaleMAGIC_NUMBER_2 dark:-rotateMAGIC_NUMBER_3 dark:scaleMAGIC_NUMBER_1 h-[1.2rem] w-[1.2rem] transition-all' />
                    <Moon className='rotateMAGIC_NUMBER_3 scaleMAGIC_NUMBER_1 dark:rotateMAGIC_NUMBER_1 dark:scaleMAGIC_NUMBER_2 absolute h-[1.2rem] w-[1.2rem] transition-all' />
                    <span className='sr-only'>Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

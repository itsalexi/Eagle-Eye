'use client';
import React, { useState } from 'react';
import '@/style/layout.css';
import Image from 'next/image';
import Logo from '@/assets/logo.webp';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

export const Header = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="m-3 header">
            <div
                className="left-header cursor-pointer flex items-center"
                onClick={() => router.push('/')}
            >
                <div className="logo-container">
                    <Image
                        src={Logo}
                        width={100}
                        height={100}
                        alt="logo"
                    ></Image>
                </div>
                <div className="logo-name">
                    <h2 className="text-3xl font-bold text-white sm:text-black">Eagle Eye</h2>
                </div>
            </div>
            <div className="right-header">
                <p
                    className="rounded-full px-4 py-2 $ bg-black text-white text-sm md:text-bas"
                    onClick={() => {
                        router.push('/create');
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    Create
                </p>
                {user ? (
                    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-10 w-10">
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="User avatar"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-56"
                            align="end"
                            forceMount
                        >
                            <>
                                <DropdownMenuLabel>Eye Eagle</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => auth.signOut()}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button onClick={() => router.push('/login')}>Login</Button>
                )}
            </div>
        </header>
    );
};

export default Header;

import React from 'react';
import { Input } from '../input';
import { Button } from '../button';
import { Plus } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

function Navbar() {
    return (
        <div className="flex items-center justify-between h-14 px-4 border-b bg-background">
            {/* Logo */}
            <h1 className="font-bold text-xl">
                YT <span className="text-red-500">Shots</span>
            </h1>
            
            {/* Search Input */}
            <div className="w-1/2">
                <Input
                    type="text"
                    placeholder="Search..."
                    className="w-full"
                />
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
                <Link href="/upload">
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create
                </Button>
                </Link>
                
                <SignedOut>
                    <SignInButton>
                        <Button>SignIn</Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button>SignUp</Button>
                    </SignUpButton>
                </SignedOut>
                
                <SignedIn>
                    <UserButton/>
                </SignedIn>
                
                <ModeToggle />
            </div>
        </div>
    );
}

export default Navbar;
"use client"

import Link from "next/link";
import { useState } from "react";
import ThemeButton from "./ThemeButton";
import { SignIn, UserButton } from "@stackframe/stack";

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trending', path: '/' },
    { name: 'Most popular', path: '/' },
    { name: 'About', path: '/' },
];

const Navbar = () => {

    const [open, setOpen] = useState(false)

    return (
        <div className='w-full py-2 flex sticky top-0 z-10 backdrop-blur-md items-center justify-between'>
            {/*Logo*/}
            <Link href='/' className='text-2xl font-bold text-green-600'>letsPlant</Link>

            {/*Mobile menu*/}
            <div className='md:hidden'>
                <div className={`relative cursor-pointer text-4xl z-20 ${open ? "text-white" : ""}`} onClick={() => setOpen((prev) => (!prev))}>{open ? "X" : "☰"}</div>
            </div>

            {open && (
                <div className='z-10 absolute overflow-hidden top-0 -left-4 h-screen w-screen p-10 bg-myblue text-white flex flex-col gap-10 font-medium text-4xl items-center justify-center'>
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.path} onClick={() => setOpen(false)}>{link.name}</Link>
                    ))}
                </div>
            )}

            {/*Desktop menu*/}
            <div className='hidden md:flex items-center gap-8 xl:gap-12 font-medium'>
                {navLinks.map((link) => (
                    <Link key={link.name} href={link.path} onClick={() => setOpen(false)}>{link.name}</Link>
                ))}
            </div>

            <ThemeButton/>
            <UserButton/>
            <SignIn/>
        </div>
    )
}

export default Navbar
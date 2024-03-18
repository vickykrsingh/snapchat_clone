import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PanelTopOpen } from "lucide-react"


import React from 'react'
import Link from "next/link"

function NavbarSmPopover() {
    return (
        <div className="lg:hidden">
            <Popover>
                <PopoverTrigger>
                    <PanelTopOpen size={36} className="text-white font-semibold text-xl w-14 h-14 bg-black py-1 px-3 rounded-lg" />
                </PopoverTrigger>
                <PopoverContent className="flex-col gap-2 bg-neutral-800 text-white">
                    <div className="flex flex-col gap-2">
                        <Link className="hover:bg-gray-500 duration-300 py-2 px-2 rounded-md cursor-pointer" href={'/'}>Home</Link>
                        <Link className="hover:bg-gray-500 duration-300 py-2 px-2 rounded-md cursor-pointer" href={'/chat'}>Chat</Link>
                        <Link className="hover:bg-gray-500 duration-300 py-2 px-2 rounded-md cursor-pointer" href={'/stories'}>Stories</Link>
                        <Link className="hover:bg-gray-500 duration-300 py-2 px-2 rounded-md cursor-pointer" href={'/spotlight'}>Spotlight</Link>
                    </div>
                </PopoverContent>
            </Popover>
        </div>

    )
}

export default NavbarSmPopover
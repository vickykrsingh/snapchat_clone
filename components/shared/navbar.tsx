import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoutButton from "./logout-button";
import { auth } from "@/auth";
import { Bell } from "lucide-react";

const Navbar = async ({bgColor,textColor}:{bgColor:string,textColor:string}) => {
	const session = await auth();
	return (
		<header className={`h-[10vh] ${bgColor} w-full py-4 px-8 flex justify-between items-center`}>
			<Image src='/logo.svg' width={40} height={40} alt='Snapchat logo' className='cursor-pointer' />
			<div className='lg:flex space-x-1 hidden'>
				<Button className={`bg-transparent hover:bg-primary/5 ${textColor}`}>Stories</Button>
				<Button className={`bg-transparent hover:bg-primary/5 ${textColor}`}>Spotlight</Button>
				<Button asChild className={`bg-transparent hover:bg-primary/5 ${textColor}`}>
					<Link href={"/chat"}> Chat</Link>
				</Button>
				<Button asChild className={`bg-transparent hover:bg-primary/5 ${textColor}`}>
					<Link href={"/"}> Home</Link>
				</Button>
			</div>
			<div className='flex space-x-2'>
				{!session && (
					<Button asChild className={`bg-black text-white rounded-full p-3 text-xs md:text-sm`}>
						<Link href={"/login"}>Login</Link>
					</Button>
				)}
				{session?.user && <LogoutButton />}

				<Button asChild className={`bg-transparent hover:bg-primary/5 ${textColor}`}>
					<Link href={"/notifications"}> 
						<Bell/>
					</Link>
				</Button>
			</div>
		</header>
	);
};
export default Navbar;

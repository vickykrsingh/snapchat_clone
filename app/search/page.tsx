
"use client"
import SearchedUserCard from "@/components/shared/searched-user-card";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import React from 'react'

function SearchPage() {
	const [searchContent, setSearchContent] = useState("");

	const handleSendMessage = async (formData: FormData) => {
		const text = formData.get('username') as string
		setSearchContent((prev) => prev = text);
	};
	return (
		<main className='bg-black min-h-screen px-10 md:px20 lg:px-28 py-4 w-full flex gap-2 flex-col' >
			<div className="flex gap-2 w-full h-10">
				<Button
					asChild
					className='bg-sigButtonSecondary hover:bg-sigButtonSecondaryHover w-10 h-10 rounded-full'
				>
					<Link href={"/chat"}>
						<ChevronLeft className='min-w-7' />
					</Link>
				</Button>
				<div className="w-full">
					<form
						action={handleSendMessage}
						className='flex-1 flex  items-center gap-1 bg-sigBackgroundSecondaryHover rounded-full border h-full  border-sigColorBgBorder mb-5'
					>
						<Input
							placeholder='type username...'
							className='bg-transparent focus:outline-transparent border-none outline-none w-full h-full rounded-full'
							type='text'
							name="username"
						/>
						<Button size={"sm"} className='bg-transparent hover:bg-transparent text-sigSnapChat' type='submit'>
							search
						</Button>
					</form>
				</div>
			</div>
			<div>
				{searchContent && <SearchedUserCard key={searchContent} content={searchContent} />}
			</div>
		</main>
	)
}

export default SearchPage
"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchUserByUsername } from "@/lib/actions";
import { useState } from "react";

export default function FriendSearch() {
	const [searchContent, setSearchContent] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	// const receiverId = params.id;

	const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await fetchUserByUsername(searchContent);
			setSearchContent("");
		} catch (error) {
			throw error
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form
			onSubmit={handleSendMessage}
			className='flex-1 flex  items-center gap-1 bg-sigBackgroundSecondaryHover rounded-full border   border-sigColorBgBorder'
		>
			<Input
				placeholder='Send a chat'
				className='bg-transparent focus:outline-transparent border-none outline-none w-full h-full rounded-full'
				type='text'
				value={searchContent}
				onChange={(e) => setSearchContent(e.target.value)}
				disabled={isLoading}
			/>
			<Button size={"sm"} className='bg-transparent hover:bg-transparent text-sigSnapChat' type='submit'>
				search
			</Button>
		</form>
	)
}

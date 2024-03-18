import ChatCamera from "@/components/chat/chat-camera";
import ChatSideBar from "@/components/chat/chat-sidebar";
import Image from "next/image";

export default async function ChatRootPage() {
	return (
		<main className='flex-grow min-h-screen bg-black'>
			{/* <div
				className='bg-chat bg-right-bottom
				rounded-3xl w-full h-[96%] flex items-center justify-center px-6'
			>
				<ChatCamera />
				<div className='hidden lg:block'>
					<Image src={"/snapemoji.png"} width={500} height={600} alt='Snap avatar' />
				</div>
			</div> */}
			<ChatSideBar/>
		</main>
	);
}

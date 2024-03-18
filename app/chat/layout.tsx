import ChatSideBar from "@/components/chat/chat-sidebar";
import Navbar from "@/components/shared/navbar";

const Layout = ({ children }: React.PropsWithChildren) => {
	return (
		<>
			<Navbar bgColor="bg-black" textColor="text-white" />
			<main className='flex h-[90vh]'>
				{/* <ChatSideBar /> */}
				{children}
			</main>
		</>
	);
};
export default Layout;


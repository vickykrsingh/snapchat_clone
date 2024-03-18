import { auth } from "@/auth";
import { connectToMongoDB } from "@/lib/db";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		const session = await auth();
		if (!session) return;
		await connectToMongoDB();

		const users = await User.findById(session.user._id).populate('friends').exec();
		const friends = users?.friends
		let filteredUsers;
		if(friends && friends.length>0){
			filteredUsers = friends.filter((user) => user._id.toString() !== session.user._id.toString());
		}else{
			filteredUsers=[]
		}
		return NextResponse.json(filteredUsers);
	} catch (error) {
		throw error;
	}
};

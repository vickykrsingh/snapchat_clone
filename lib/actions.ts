"use server";
import { auth, signIn, signOut } from "@/auth";
import { connectToMongoDB } from "./db";
import { v2 as cloudinary } from "cloudinary";
import Message, { IContent, IMessageDocument } from "@/models/messageModel";
import Chat, { IChatDocument } from "@/models/chatModel";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { PopulatedDoc, Types } from "mongoose";
import User from "@/models/userModel";

export interface IChatMsg {
  _id: Types.ObjectId;
  participants: Types.ObjectId[];
  messages: PopulatedDoc<IMessageDocument>[];
  createdAt: Date;
  updatedAt: Date;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function authAction() {
  try {
    await signIn("github"); // redirect()
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") {
      throw error;
    }
    return error.message;
  }
}

export async function logoutAction() {
  await signOut();
}

export const sendMessageAction = async (
  receiverId: string,
  content: string,
  messageType: "image" | "text"
) => {
  noStore();
  try {
    const session = await auth();
    if (!session) return;
    await connectToMongoDB();
    const senderId = session.user._id;

    let uploadedResponse;
    if (messageType === "image") {
      uploadedResponse = await cloudinary.uploader.upload(content);
    }

    const newMessage: IMessageDocument = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content: {
        publicId: uploadedResponse?.public_id,
        secureUrl: uploadedResponse?.secure_url,
        text: content,
      },
      messageType,
    });

    let chat: IChatDocument | null = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
      });
    } else {
      chat.messages.push(newMessage._id);
      await chat.save();
    }

    revalidatePath(`/chat/${receiverId}`);

    // Alternative usage for the revalidatePath function:
    // revalidatePath("/chat/[id]","page")

    return newMessage;
  } catch (error: any) {
    throw error;
  }
};

export const deleteChatAction = async (userId: string) => {
  try {
    await connectToMongoDB();
    const { user } = (await auth()) || {};
    if (!user) return;
    const chat: IChatMsg | null = await Chat.findOne({
      participants: { $all: [user._id, userId] },
    })
      .populate("messages")
      .exec();
    if (!chat) return;
    const messageIds = chat.messages.map((messageId) =>
      messageId._id.toString()
    );
    await Message.deleteMany({ _id: { $in: messageIds } });
    await Chat.deleteOne({ _id: chat._id });
    const url = chat.messages
      .filter((m) => m.messageType == "image")
      .map((item) => {
        return item.content;
      });
    Promise.all(
      url.map((u) => {
        return cloudinary.uploader.destroy(u.publicId);
      })
    ).catch((error) => {
      throw error;
    });

    revalidatePath("/chat/[id]", "page");
    // this will throw an error bc it internally throws an error
    // redirect("/chat");
  } catch (error: any) {
    throw error;
  }
  redirect("/chat");
};

export const sendRequest = async (userId: string) => {
  await connectToMongoDB();
  const { user } = (await auth()) || {};
  if (!user) return;
  try {
    const res = await User.find({ _id: user._id, friends: userId });
    if (!res) {
      return false;
    }
    // find loggedIn user and update its sentRequest attribute
    await User.findByIdAndUpdate(user._id, {
      $push: {
        sentRequests: userId,
      },
    });
    // find target user and update its recievedRequest attribute
    await User.findByIdAndUpdate(userId, {
      $push: {
        recievedRequests: user._id,
      },
    });
    return true;
  } catch (error: any) {
    return false;
  }
};
export const removeFriend = async (userId: string) => {
  // Todo send request functionality.
  await connectToMongoDB();
  const { user } = (await auth()) || {};
  if (!user) return;
  try {
    // find loggedIn user and update its sentRequest attribute
    const res1 = await User.findByIdAndUpdate(user._id, {
      $pull: {
        friends: userId,
      },
    });
    // find target user and update its recievedRequest attribute
    const res2 = await User.findByIdAndUpdate(userId, {
      $pull: {
        friends: user._id,
      },
    });
    revalidatePath("/search");
    return true;
  } catch (error: any) {
    return false;
  }
};

export const acceptRequest = async (userId: string) => {
  // Todo recieved request functionality.
  await connectToMongoDB();
  const { user } = (await auth()) || {};
  if (!user) return;
  try {
    // find loggedIn user and update its recieved request attribute
    await User.findByIdAndUpdate(user._id, {
      $pull: {
        recievedRequests: userId,
      },
    });
    // find target user and update its sentRequest attribute
    await User.findByIdAndUpdate(userId, {
      $pull: {
        sentRequests: user._id,
      },
    });
    // find loggedIn user and update its recieved request attribute
    await User.findByIdAndUpdate(user._id, {
      $push: {
        friends: userId,
      },
    });
    // find target user and update its sentRequest attribute
    await User.findByIdAndUpdate(userId, {
      $push: {
        friends: user._id,
      },
    });
    revalidatePath("/notification");
  } catch (error: any) {
    throw error;
  }
};

export const declineRequest = async (userId: string) => {
  await connectToMongoDB();
  const { user } = (await auth()) || {};
  if (!user) return;
  try {
    // find loggedIn user and update its recieved request attribute
    await User.findByIdAndUpdate(user._id, {
      $pull: {
        recievedRequests: userId,
      },
    });
    // find target user and update its sentRequest attribute
    await User.findByIdAndUpdate(userId, {
      $pull: {
        sentRequests: user._id,
      },
    });
    revalidatePath("/notification");
  } catch (error: any) {
    throw error;
  }
};

export const fetchUserByUsername = async (username: string) => {
  await connectToMongoDB();
  const { user } = (await auth()) || {};
  if (!user) return;
  try {
    const user = await User.find({ username: username });
    if (!user) {
      return;
    }
    return user;
  } catch (error: any) {
    throw error;
  }
};
export const checkFriend = async (userId: string) => {
  try {
    await connectToMongoDB(); // Ensure MongoDB connection is established

    const { user } = (await auth()) || {};
    if (!user) return;

    const foundUser = await User.findOne({
      _id: user._id,
      friends: { $in: [userId] },
    });
    if (foundUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const fetchCurrentUserDetail = async () => {
  try {
    await connectToMongoDB();
    const { user } = (await auth()) || {};
    if (!user) return;

    const users = await User.findById(user._id)
      .populate("recievedRequests")
      .exec();
    return users;
  } catch (error) {
    return null;
  }
};

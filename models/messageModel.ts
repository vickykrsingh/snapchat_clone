import mongoose, { Document, Model, PopulatedDoc, Schema, Types } from "mongoose";
import { IUserDocument } from "./userModel";

export interface IContent {
	publicId:string|null,
	secureUrl:string|null,
	text:string|null
}
export interface IMessage {
	sender: Types.ObjectId | PopulatedDoc<IUserDocument>;
	receiver: Types.ObjectId | PopulatedDoc<IUserDocument>;
	content: IContent;
	messageType: "text" | "image";
	opened: boolean;
}


export interface IMessageDocument extends IMessage, Document {
	createdAt: Date;
	updatedAt: Date;
}

const messageSchema = new Schema<IMessageDocument>(
	{
		sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
		receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
		content: {
			publicId:{
				type:String,
				required:false
			},
			secureUrl:{
				type:String,
				required:false
			},
			text:{
				type:String,
				required:false
			}
		},
		messageType: { type: String, required: true, enum: ["text", "image"] },
		opened: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const Message: Model<IMessageDocument> = mongoose.models?.Message || mongoose.model("Message", messageSchema);

export default Message;

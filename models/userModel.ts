import mongoose, { Document, Model, PopulatedDoc, Types } from "mongoose";

export interface IUser {
	username: string;
	fullName: string;
	email: string;
	avatar?: string;
	friends:Types.ObjectId[]|PopulatedDoc<IUserDocument>[],
	sentRequests:Types.ObjectId[]|PopulatedDoc<IUserDocument>[],
	recievedRequests:Types.ObjectId[]|PopulatedDoc<IUserDocument>[]
}

export interface IUserDocument extends IUser, Document {
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		avatar: {
			type: String,
			default: "",
		},
		friends:[
			{
				type:mongoose.Schema.Types.ObjectId,
				ref:"User",
			}
		],
		sentRequests:[
			{
				type:mongoose.Schema.Types.ObjectId,
				ref:"User",
			}
		],
		recievedRequests:[
			{
				type:mongoose.Schema.Types.ObjectId,
				ref:"User"
			}
		]
	},
	{
		// createdAt, updatedAt
		timestamps: true,
	}
);

const User: Model<IUserDocument> = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;

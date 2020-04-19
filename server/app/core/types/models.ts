import { Schema, Document } from 'mongoose';

export interface IModel extends Document {
	_id: Schema.Types.ObjectId;
	created_at?: string;
	updated_at?: string;
}

export interface IUserModel extends Document {
	name: string;
	username: string;
	email: string;
	password: string;
	gender: string;
	confirmed: boolean;
	email_token?: string;
	avatar?: string;
}

export interface ITaskModel {
	_id?: string;
	id?: string;
	title: string;
	description: string;
	date: string;
	status: string;
	is_important: boolean;
	user: string;
}

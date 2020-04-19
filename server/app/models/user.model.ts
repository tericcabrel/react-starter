import mongoose, { Document, Model as MongooseModel } from 'mongoose';

const userSchema: mongoose.Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: false,
		default: 'M',
	},
	confirmed: {
		type: Boolean,
		required: true,
		default: false,
	},
	email_token: {
		type: String,
		required: false,
		default: null,
	},
	avatar: {
		type: String,
		required: false,
		default: null,
	},
},                                                      {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
	collection: 'users',
});

// tslint:disable-next-line:variable-name
const UserModel: MongooseModel<Document, {}> = mongoose.model('User', userSchema);

const userUpdateParams: string[] = [
	'name',
	'username',
	'gender',
];

export { UserModel, userUpdateParams };

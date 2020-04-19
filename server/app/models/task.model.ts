import mongoose, { Document, Model, Schema } from 'mongoose';

// tslint:disable-next-line:variable-name
const TaskSchema: Schema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	status: {
		type: String,
		enum: ['Pending', 'Working', 'Done'],
		required: true,
		default: 'Pending',
	},
	is_important: {
		type: Boolean,
		required: true,
		default: false,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
},                                    {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
	collection: 'tasks',
});

// tslint:disable-next-line:variable-name
const TaskModel: Model<Document> = mongoose.model('Task', TaskSchema);

const taskUpdateParams: string[] = [
	'title',
	'description',
	'date',
	'status',
	'is_important',
];

export { TaskModel, taskUpdateParams };

import mongoose, { Schema } from 'mongoose';
import { taskModel } from '../../models/asana/taskModel';

// Create a Schema corresponding to the document interface.
const taskSchema = new Schema<taskModel>({
    "gid": { type: String, required: true, unique: true },
    "name": { type: String, required: true },
    "resource_type": String,
    "resource_subtype": String
});

export const TaskDatabase = mongoose.model<taskModel>('tasks', taskSchema);
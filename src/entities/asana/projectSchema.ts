import mongoose, { Schema } from 'mongoose';
import { projects } from '../../models/asana/projectsModel';

// Create a Schema corresponding to the document interface.
const projectSchema = new Schema<projects>({
    "gid": { type: String, required: true, unique: true },
    "name": { type: String, required: true },
    "resource_type": String
});

export const ProjectDatabase = mongoose.model<projects>('projects', projectSchema);
const mongoose = require('mongoose');

export async function initalizeDB(): Promise<number> {
    await mongoose.connect(process.env.MONGODB_URI);
    return mongoose.connection.readyState;
}
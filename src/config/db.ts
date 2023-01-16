const mongoose = require('mongoose');

export function initalizeDB(): void {
    mongoose.connect('mongodb://localhost:27017/nodeasana');
    mongoose.connection.on('open', () => {
        console.log('MongoDB connected')
    })
    mongoose.connection.on('error', (err) => {
        console.log('DB failed with error -' + err)
    })
}
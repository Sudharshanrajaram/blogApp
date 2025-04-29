import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sudharshanrofficial:q6ve8llvl3TWwRk3@cluster0.2uxrx.mongodb.net/bloggers')
    console.log('Connected to MongoDB');
}

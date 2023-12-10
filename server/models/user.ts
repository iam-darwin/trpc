import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

// Define a TypeScript interface for the user document
interface IUser extends Document {
    email: string;
    password: string;
}

// Define the Mongoose schema with TypeScript types
const userSchema: Schema<IUser> = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', async function (next) {
    const user = this;
    // Generate a salt and hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    // Replace the plain password with the hashed one
    user.password = hashedPassword;
    next();
});

// Define the TypeScript model for the user
const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;

import mongoose, { Schema, Document } from "mongoose";

interface ITodo extends Document {
    title: string;
    description: string;
    done: boolean;
    id: mongoose.Types.ObjectId | string; // Corrected type
}

const todoSchema: Schema<ITodo> = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    done: {
        type: Boolean,
    },
    //@ts-ignore
    id: {
        type: mongoose.Types.ObjectId, // Corrected type
        ref: 'User', // Assuming 'User' is the name of the referenced collection
    },
});

const TodoModel = mongoose.model<ITodo>('Todo', todoSchema);

export default TodoModel;

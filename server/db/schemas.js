import mongoose from "mongoose";

const Schema = mongoose.Schema;

const audioSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    audioUrl: { type: String, required: true },
});


export {audioSchema}
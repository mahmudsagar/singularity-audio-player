import mongoose from "mongoose";
import { audioSchema } from "../db/schemas.js";

const AudioModel = mongoose.model("Audio", audioSchema, "audio_files");

const createAudio = async ({title, artist, url}) => {
    const audio = {
        title,
        artist,
        audioUrl: url,
    };
    try {
        const newAudio = new AudioModel(audio);
        return await newAudio.save();
    } catch (error) {
        throw new Error(error);
    }
}

const getAudioByValue = async (value) => {
    try {
        return await AudioModel.find({
            $or: [
                { title: new RegExp(value, 'i') },
                { artist: new RegExp(value, 'i') },
                { audioUrl: new RegExp(value, 'i') },
            ],
        });
    } catch (error) {
        throw new Error(error);
    }
};

const getAllAudio = async () => {
    try {
        return await AudioModel.find();
    } catch (error) {
        throw new Error(error);
    }
}

const getAudioById = async (id) => {
    try {
        return await AudioModel.findById(id);
    } catch (error) {
        throw new Error(error);
    }
}

const updateAudio = async ({id, title, artist, url}) => {
    try {
        const audio = await AudioModel.findById(id);
        if (audio) {
            if (title) {
                audio.title = title;
            }
            if (artist) {
                audio.artist = artist;
            }
            if (url) {
                audio.audioUrl = url;
            }
            return await audio.save();
        } else {
            throw new Error("Audio not found");
        }
    } catch (error) {
        throw new Error(error);
    }
}

const deleteAudioById = async (id) => {
    try {
        return await AudioModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

export { AudioModel, createAudio, getAudioByValue, getAllAudio, getAudioById, updateAudio, deleteAudioById};
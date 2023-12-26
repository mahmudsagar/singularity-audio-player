// Desc: Controller for audio
import { createAudio, getAllAudio, getAudioById, updateAudio, deleteAudioById, getAudioByValue } from "../model/audio.js";
import { validationResult } from 'express-validator';

const audioController = {}

const responseFormatter = (status, message, data, error) => {
    return {
        status,
        message,
        data: data,
        error
    };
};



audioController.create = async (req, res) => {
    const errors = validationResult(req);
    console.log("req.body", req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json(responseFormatter(400, 'Validation errors', null, errors.array()));
    }

    try {
        const { title, artist, audioUrl } = req.body;
        const audio = await createAudio({ title, artist, url: audioUrl });
        return res.status(201).json(responseFormatter(201, 'Audio created successfully', audio, null));
    } catch (error) {
        return res.status(500).json(responseFormatter(500, 'An error occurred', null, error.message));
    }
}

audioController.getAll = async (req, res) => {
    try {
        if (req.query.search) {
            const audio = await getAudioByValue(req.query.search);
            return res.status(200).json(responseFormatter(200, 'Audio retrieved successfully', audio, null));
        }
        const audio = await getAllAudio();
        return res.status(200).json(responseFormatter(200, 'All audio retrieved successfully', audio, null));
    } catch (error) {
        return res.status(500).json(responseFormatter(500, 'An error occurred', null, error.message));
    }
}

audioController.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const audio = await getAudioById(id);
        if (audio) {
            return res.status(200).json(responseFormatter(200, 'Audio retrieved successfully', audio, null));
        } else {
            return res.status(404).json(responseFormatter(404, 'Audio not found', null, 'Audio not found'));
        }
    } catch (error) {
        return res.status(500).json(responseFormatter(500, 'An error occurred', null, error.message));
    }
}

audioController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, artist, url } = req.body;
        const audio = await updateAudio({ id, title, artist, url });
        if (audio) {
            return res.status(200).json(responseFormatter(200, 'Audio updated successfully', audio, null));
        } else {
            return res.status(404).json(responseFormatter(404, 'Audio not found', null, 'Audio not found'));
        }
    } catch (error) {
        return res.status(500).json(responseFormatter(500, 'An error occurred', null, error.message));
    }
}

audioController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const audio = await deleteAudio(id);
        if (audio) {
            return res.status(200).json(responseFormatter(200, 'Audio deleted successfully', null, null));
        } else {
            return res.status(404).json(responseFormatter(404, 'Audio not found', null, 'Audio not found'));
        }
    } catch (error) {
        return res.status(500).json(responseFormatter(500, 'An error occurred', null, error.message));
    }
}

export default audioController;
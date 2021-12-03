
/* each IBM Watson Tone Analyzer emotion and its image mapping and friendly text */
export const emojiMap = {
    anger: {img: "angry.png", text: "angry"},
    joy: {img: "joy.png", text: "joyful"},
    disgust: {img: "disgusted", text: "disgusted"},
    fear: {img: "fear.png", text: "fearful"},
    sadness: {img: "sad.png", text: "sad"},
    unknown: {img: "unknown.png", text: "---"},
};

export const RESOURCES_BASE_URL = import.meta.env.VITE_RESOURCES_BASE;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

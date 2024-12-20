import axios from "axios";

const API_URL = "http://127.0.0.1:8000/forms/api/forms1/forms/";

export const getCancelaciones = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
        
    } catch (error) {
        console.error(error);
        throw error;
    }

};
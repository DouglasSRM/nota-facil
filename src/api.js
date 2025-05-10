import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const fetchNotes = async () => {
    try {
        const response = await axios.get(`${API_URL}/get`)
        return response.data
    } catch (error) {
        console.error("Erro ao buscar notas", error)
        return []
    }
}

export const createNote = async (note) => {
    try {
        const response = await axios.post(`${API_URL}/post`, note)
        return response.data
    } catch (error) {
        console.error("Erro ao criar nota", error)
    }
};

export const updateNote = async (note) => {
    try {
        const response = await axios.put(`${API_URL}/update/${note.id}`, note)
        return response.data
    } catch (error) {
        console.error("Erro ao atualizar nota", error)
    }
}

export const deleteNotes = async (noteIds) => {
    try {
        await axios.post(`${API_URL}/delete`, { ids: noteIds } )
    } catch (error) {
        console.error("Erro ao deletar notas", error)
    }
}

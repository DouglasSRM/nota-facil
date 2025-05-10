import axios from "axios"
import { getAuth } from "firebase/auth"

const API_URL = import.meta.env.VITE_API_URL

async function getAuthHeader() {
    const user = getAuth().currentUser
    const token = user ? await user.getIdToken() : null
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }

export const fetchNotes = async () => {
    try {
        const config = await getAuthHeader()
        const response = await axios.get(`${API_URL}/get`, config)
        return response.data
    } catch (error) {
        console.error("Erro ao buscar notas", error)
        return []
    }
}

export const createNote = async (note) => {
    try {
        const config = await getAuthHeader()
        const response = await axios.post(`${API_URL}/post`, note, config)
        return response.data
    } catch (error) {
        console.error("Erro ao criar nota", error)
    }
};

export const updateNote = async (note) => {
    try {
        const config = await getAuthHeader()
        const response = await axios.put(`${API_URL}/update/${note.id}`, note, config)
        return response.data
    } catch (error) {
        console.error("Erro ao atualizar nota", error)
    }
}

export const deleteNotes = async (noteIds) => {
    try {
        const config = await getAuthHeader()
        await axios.post(`${API_URL}/delete`, { ids: noteIds }, config)
    } catch (error) {
        console.error("Erro ao deletar notas", error)
    }
}

import { onAuthStateChanged, signOut } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../services/firebase"


const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const logout = () => {
        return signOut(auth);
    }

    return(
        <AuthContext.Provider value = {{user, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

const lightTheme = {
    'name': 'light',
    '--bg-primary': '#f5f5f5',     
    '--bg-secondary': '#ffffff',   
    '--bg-tertiary': '#eaeaea', 
    '--text-background': '#f3f3f3',
    '--text-primary': '#1e1e1e',     
    '--text-secondary': '#555555',   
    '--accent-color': '#7b3fe4',     
    '--accent-hover': '#5c2db2',    
    '--danger-color': '#d32f2f',    
    '--border-color': '#ccc',  
    '--shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
}

const darkTheme = {
    'name': 'dark',
    '--bg-primary': '#121212',
    '--bg-secondary': '#1e1e1e',
    '--bg-tertiary': '#2d2d2d',
    '--text-background':'#404040',
    '--text-primary': '#e0e0e0',
    '--text-secondary': '#a0a0a0',
    '--accent-color': '#bb86fc',
    '--accent-hover': '#9a67cf',
    '--danger-color': '#cf6679',
    '--border-color': '#333',
    '--shadow': '0 4px 6px rgba(0, 0, 0, 0.3)',
}

export const ThemeProvider = ({ children }) => {
    const savedTheme = localStorage.getItem('theme') === 'light' ? lightTheme : darkTheme;
    const [theme, setTheme] = useState(savedTheme)

    const toggleTheme = () => {
        const newTheme = theme === darkTheme ? lightTheme : darkTheme;
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme === lightTheme ? 'light' : 'dark');
    }

    useEffect(() => {
        const root = document.documentElement;
        for (const key in theme) {
          if (theme.hasOwnProperty(key)) {
            root.style.setProperty(key, theme[key]);
          }
        }
      }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
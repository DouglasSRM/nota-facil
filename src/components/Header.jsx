import { FiPlus, FiTrash2, FiX, FiSun, FiMoon } from "react-icons/fi"
import { TbLogout2 } from "react-icons/tb";
import { useTheme } from '../contexts/ThemeContext'

export default function Header({
  onCreateNote,
  isSelecting,
  onCancelSelection,
  onDeleteSelected,
  hasSelected,
  selectedCount,
  logout,
}) {

  const { theme, toggleTheme } = useTheme()

  return (
    <header className="app-header">
      <div className="header-content">
        {isSelecting ? (
          <>
            <button onClick={onCancelSelection} className="icon-button">
              <FiX size={24} />
            </button>
            <h2>
              {hasSelected
                ? `${selectedCount} selecionada(s)`
                : "Selecionar notas"}
            </h2>
            {hasSelected && (
              <button
                onClick={onDeleteSelected}
                className="icon-button delete-button"
              >
                <FiTrash2 size={24} />
              </button>
            )}
          </>
        ) : (
          <>
            <div className="header-left">
              <button onClick={logout} className="icon-button">
                <TbLogout2 size={24} />
              </button>    
              <h1>NotaFácil</h1>
            </div>
            <div className="header-right">
              <button onClick={toggleTheme} className="icon-button">
                {theme.name !== 'light' ? <FiSun size={24} /> : <FiMoon size={24} />}
              </button>
              <button onClick={onCreateNote} className="icon-button">
                <FiPlus size={24} />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

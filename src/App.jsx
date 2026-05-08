import { useState } from 'react'
import KanbanBoard from './components/KanbanBoard'

function App() {
  const [resetting, setResetting] = useState(false)

  const handleReset = () => {
    if (window.confirm('¿Seguro que quieres resetear el tablero a la demo inicial?')) {
      localStorage.removeItem('vibeboard-data')
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3ff] to-[#e0f2fe] dark:from-gray-900 dark:to-gray-800 p-4 flex flex-col font-sans selection:bg-purple-200">
      
      {/* Header Section */}
      <header className="flex flex-col items-center justify-center gap-2 pt-12 pb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 drop-shadow-sm tracking-tight">
            VibeBoard
          </h1>
          <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-purple-600 bg-purple-100 rounded-full dark:bg-purple-900/30 dark:text-purple-400">
            v1.0
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Gestión de tareas con estilo y simplicidad.
        </p>
        
        <button
          onClick={handleReset}
          className="mt-4 text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-white/50 backdrop-blur-sm text-gray-500 border border-gray-200 rounded-full hover:bg-white hover:text-red-500 hover:border-red-200 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-400 transition-all duration-300 shadow-sm"
        >
          Resetear Tablero
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <KanbanBoard />
      </main>
      
      {/* Footer / Acerca de - Sección Profesional */}
      <footer className="mt-auto pt-16 pb-8 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-center md:text-left">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Sobre el Proyecto</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
              VibeBoard es un proyecto personal diseñado para demostrar habilidades en React, 
              gestión de estado persistente y diseño de interfaces modernas.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex gap-4">
              <a
                href="https://github.com/Rafael464G"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 p-2 rounded-xl bg-gray-100 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-white transition-all duration-300"
              >
                <svg className="w-5 h-5 group-hover:text-white dark:group-hover:text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82.173.82.173.465.155.725-.309.725-.696 0-.334-.012-.648-.018-1.086-3.338.726-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.014 2.896-.014 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/rafael-gonzalez-86a037370/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 p-2 rounded-xl bg-gray-100 hover:bg-[#0077b5] dark:bg-gray-800 dark:hover:bg-[#0077b5] transition-all duration-300"
              >
                <svg className="w-5 h-5 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter">
              Desarrollado con pasión por Rafael
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

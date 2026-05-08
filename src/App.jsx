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
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3ff] to-[#e0f2fe] dark:from-gray-900 dark:to-gray-800 p-4 flex flex-col">
      <div className="flex items-center justify-center gap-4 pt-8 pb-4">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 drop-shadow-sm">
          VibeBoard
        </h1>
        <button
          onClick={handleReset}
          className="text-xs px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Reset Demo
        </button>
      </div>
      <KanbanBoard />
    </div>
  )
}

export default App

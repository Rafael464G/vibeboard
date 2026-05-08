import { useState } from 'react'
import { Droppable } from '@hello-pangea/dnd'
import Card from './Card'
import moodColors from './moodColors'
import { v4 as uuidv4 } from 'uuid'

const Column = ({ column, onAddCard, onDeleteCard }) => {
  const [showForm, setShowForm] = useState(false)
  const [content, setContent] = useState('')
  const [selectedMood, setSelectedMood] = useState('😊')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) return
    const newCard = {
      id: uuidv4(),
      content: content.trim(),
      mood: selectedMood
    }
    onAddCard(column.id, newCard)
    setContent('')
    setSelectedMood('😊')
    setShowForm(false)
  }

  const moods = Object.keys(moodColors)

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg min-w-[300px] w-full lg:w-80 p-4 flex flex-col gap-3 dark:bg-gray-800/80 dark:text-gray-100">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{column.title}</h2>
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">
          {column.cards.length} {column.cards.length === 1 ? 'tarea' : 'tareas'}
        </span>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-2 flex-1 min-h-[100px] p-1 rounded-lg transition-colors ${
              snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/30' : ''
            }`}
          >
            {column.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onDeleteCard={onDeleteCard}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {showForm ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 flex flex-col gap-2 transition-all">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe una tarea..."
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex gap-2">
            {moods.map((mood) => (
              <button
                key={mood}
                type="button"
                onClick={() => setSelectedMood(mood)}
                style={{ backgroundColor: moodColors[mood] }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                  selectedMood === mood ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
            >
              Agregar
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 text-blue-500 hover:text-blue-600 text-sm font-medium text-left transition-colors"
        >
          + Añadir tarjeta
        </button>
      )}
    </div>
  )
}

export default Column

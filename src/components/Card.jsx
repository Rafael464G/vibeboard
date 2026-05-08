import { Draggable } from '@hello-pangea/dnd'
import moodColors from './moodColors'

const Card = ({ card, index, onDeleteCard }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`relative bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-3 flex items-center gap-3 dark:bg-gray-700 dark:border-gray-600 ${
            snapshot.isDragging ? 'shadow-lg' : ''
          }`}
          style={{ ...provided.draggableProps.style }}
        >
          {/* Círculo de mood con color */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm"
            style={{ backgroundColor: moodColors[card.mood] || '#E5E7EB' }}
          >
            {card.mood}
          </div>
          <p className="flex-1 text-gray-800 text-sm dark:text-gray-100">{card.content}</p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDeleteCard(card.id)
            }}
            className="absolute top-1 right-1 text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Eliminar tarjeta"
          >
            ✕
          </button>
        </div>
      )}
    </Draggable>
  )
}

export default Card

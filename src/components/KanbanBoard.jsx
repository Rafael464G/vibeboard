import { useState, useEffect, useCallback } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import { v4 as uuidv4 } from 'uuid'
import Column from './Column'

const defaultColumns = () => [
  {
    id: uuidv4(),
    title: 'To Do',
    cards: [
      { id: uuidv4(), content: 'Diseñar interfaz de usuario', mood: '😊' },
      { id: uuidv4(), content: 'Configurar base de datos', mood: '🔥' }
    ]
  },
  {
    id: uuidv4(),
    title: 'In Progress',
    cards: [
      { id: uuidv4(), content: 'Implementar drag and drop', mood: '😢' }
    ]
  },
  {
    id: uuidv4(),
    title: 'Done',
    cards: [
      { id: uuidv4(), content: 'Configurar Vite + React', mood: '😴' },
      { id: uuidv4(), content: 'Instalar dependencias', mood: '🤯' }
    ]
  }
]

const KanbanBoard = () => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem('vibeboard-data')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return defaultColumns()
      }
    }
    return defaultColumns()
  })

  useEffect(() => {
    localStorage.setItem('vibeboard-data', JSON.stringify(columns))
  }, [columns])

  const handleAddCard = useCallback((columnId, newCard) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, newCard] }
          : col
      )
    )
  }, [])

  const handleDeleteCard = useCallback((cardId) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.filter((card) => card.id !== cardId)
      }))
    )
  }, [])

  const onDragEnd = useCallback((result) => {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const sourceColIndex = columns.findIndex((col) => col.id === source.droppableId)
    const destColIndex = columns.findIndex((col) => col.id === destination.droppableId)

    const sourceCol = columns[sourceColIndex]
    const destCol = columns[destColIndex]

    const draggedCard = sourceCol.cards[source.index]

    if (source.droppableId === destination.droppableId) {
      const newCards = Array.from(sourceCol.cards)
      newCards.splice(source.index, 1)
      newCards.splice(destination.index, 0, draggedCard)
      const newColumns = [...columns]
      newColumns[sourceColIndex] = { ...sourceCol, cards: newCards }
      setColumns(newColumns)
    } else {
      const newSourceCards = Array.from(sourceCol.cards)
      newSourceCards.splice(source.index, 1)
      const newDestCards = Array.from(destCol.cards)
      newDestCards.splice(destination.index, 0, draggedCard)
      const newColumns = [...columns]
      newColumns[sourceColIndex] = { ...sourceCol, cards: newSourceCards }
      newColumns[destColIndex] = { ...destCol, cards: newDestCards }
      setColumns(newColumns)
    }
  }, [columns])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row gap-6 p-6 overflow-x-auto flex-1">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onAddCard={handleAddCard}
            onDeleteCard={handleDeleteCard}
          />
        ))}
      </div>
    </DragDropContext>
  )
}

export default KanbanBoard

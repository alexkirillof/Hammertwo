import { Status, Data } from '../interfaces'
import { Item } from './Item.tsx'

interface Props {
  items: Data[]
  className?: string
  status: Status
  id?: string
  isDragging?: boolean
  handleDragging: (dragging: boolean) => void
  handleUpdateList: (id: string, status: Status) => void
}

export const ContainerItems = ({
  items = [],
  className,
  status,
  id,
  isDragging,
  handleDragging,
  handleUpdateList
}: Props) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleUpdateList(e.dataTransfer.getData('text'), status)
    handleDragging(false)
  }
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault()
  return (
    <div className='wrap' id={id}>
      <h2>{status} </h2>
      <div
        className={`layout-cards ${
          isDragging ? 'layout-dragging' : ''
        } ${className}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {items.map(
          (item) =>
            status === item.status && (
              <Item data={item} key={item.id} handleDragging={handleDragging} />
            )
        )}
      </div>
    </div>
  )
}

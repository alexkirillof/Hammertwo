import { Status } from '../interfaces'
import { ContainerItems } from './ContainerItems'
import { data } from '../assets'
import { useDragAndDrop } from '../hooks/useDragAndDrop .ts'
import html2canvas from 'html2canvas'

const typesItem: Status[] = ['Мебель', 'Карта заведения']

export const DragAndDrop = () => {
  const { isDragging, listItems, handleDragging, handleUpdateList } =
    useDragAndDrop(data)
  const handleImageDownload = async () => {
    const element: HTMLElement = document.getElementById('map') as HTMLElement,
      canvas = await html2canvas(element),
      data = canvas.toDataURL('image/jpg'),
      link = document.createElement('a')

    link.href = data
    link.download = 'downloaded-image.jpg'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <div className='grid'>
      <ContainerItems
        status={typesItem[0]}
        key={typesItem[0]}
        items={listItems}
        isDragging={isDragging}
        handleDragging={handleDragging}
        handleUpdateList={handleUpdateList}
        className='furniture'
      />
      <div>
        <ContainerItems
          status={typesItem[1]}
          key={typesItem[1]}
          items={listItems}
          isDragging={isDragging}
          handleDragging={handleDragging}
          handleUpdateList={handleUpdateList}
          className='map'
          id='map'
        />
        <button type='button' onClick={handleImageDownload}>
          Download
        </button>
      </div>
    </div>
  )
}

import React,{useState} from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';
import { Boards } from './Boards';
import { Card } from './Card';


function App() {
  const [boards, setBoards] = useState([
    {id:1, title: 'warcrime', items: [{id:1, title: 'albanian children'},{id:2, title: 'hotel hilton'}]},
    {id:2, title: 'flopping', items: [{id:1, title: 'eat cement'},{id:2, title: 'rolling thunder'}]},
    {id:3, title: 'siesta', items: [{id:1, title: 'yugoslavia'},{id:2, title: 'cambodia'}]},
  ])

  const [currentItem, setCurrentItem] = useState(null)
  const [currentBoard, setCurrentBoard] = useState(null)

  const dragOverHandler = (e) => {
    e.preventDefault()
    if(e.target.className == 'card'){
      e.target.style.boxShadow = '0 4px 3px red'
    }
  }

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none'
  }

  const dragStartHandler = (e, board, card) => {
    setCurrentBoard(board)
    setCurrentItem(card)
  }
  
  const dragEndHandler = (e) => {
    e.target.style.boxShadow = 'none'
  }

  const dropHandler = (e, board, card) => {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(card)
    board.items.splice(dropIndex, 0, currentItem)
    setBoards([...boards])
  }

  // const dropCardHandler = (e, board) => {
  //   board.items.push(currentItem)
  //   const currentIndex = currentBoard.indexOf(currentItem)
  //   currentBoard.items.splice(currentIndex, 1)
  //   setBoards([...boards])
  // }
  const board = [{id: 1, title: 'board-1', boardDragId: '1'}, {id: 2, title: 'board-2', boardDragId: '2'},]
  const arr = [{id:1, title: '1', dragId: `1`, boardId: '1'}, {id:2, title: '2', dragId: `2`, boardId: '1'}, {id:3, title: '3', dragId: `3`, boardId: '1'}, 
  {id:4, title: '4', dragId: `4`,  boardId: '2'}, {id:5, title: '5', dragId: `5`, boardId: '2'}, {id:6, title: '6', dragId: `6`,  boardId: '2'}]
  
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result
    console.log("🚀 ~ file: App.js ~ line 55 ~ onDragEnd ~ draggableId", draggableId)
    console.log("🚀 ~ file: Board.tsx ~ line 59 ~ onDragEnd ~ source.index", source.index)
    
    console.log("🚀 ~ file: Board.tsx ~ line 61 ~ onDragEnd ~ destination.index", destination)

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
      ) {
        return
      }

  console.log("🚀 ~ file: App.js ~ line 70 ~ onDragEnd ~ source.droppableId", source.droppableId == destination.droppableId)
  console.log("🚀", destination.droppableId)
  console.log("🚀🚀", source.droppableId)
    if(destination.droppableId !== source.droppableId){
      const find = arr.find((card) => {
        return  draggableId == card.dragId
      })
      console.log("🚀 ~ file: Board.tsx ~ line 68 ~ find ~ find", find)
      arr.splice(source.index, 1)
      arr.splice(destination.index, 0, {...find, boardId: destination.droppableId})
      console.log("🚀 ~ file: App.js ~ line 85 ~ onDragEnd ~ board", arr)
      
    }

    if(destination.droppableId === source.droppableId){
      const find = arr.find((card) => {
        return  draggableId == card.dragId
      })
      console.log("🚀 ~ file: Board.tsx ~ line 68 ~ find ~ find", find)
      arr.splice(source.index, 1)
      arr.splice(destination.index, 0, {...find, boardId: destination.droppableId})
      console.log("🚀 ~ file: App.js ~ line 85 ~ onDragEnd ~ board", arr)
      
    }

  }


  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='wrapper'>
          {board.map((item, index) =>
            <Boards board={item} index={index} key={index} cards={arr}/>
          )}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;

{/* {boards.map((board, index) => 
        <div 
          key={index}
          draggable={true}
          onDragOver={(e) => dragOverHandler(e)}
          
        >
          <h1>{board.title}</h1>
          {board.items.map((card, index) =>
            <p
              className="card" 
              key={index}
              draggable={true}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, card)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, card)}
            >{card.title}</p>
          )}
        </div>
      )} */}
import React,{useState} from 'react';

import './App.css';


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

  const dropCardHandler = (e, board) => {
    board.items.push(currentItem)
    const currentIndex = currentBoard.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards([...boards])
  }

  return (
    <div className="App">
      {boards.map((board, index) => 
        <div 
          key={index}
          draggable={true}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
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
      )}
    </div>
  );
}

export default App;

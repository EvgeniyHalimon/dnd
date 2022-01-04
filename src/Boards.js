import React from 'react';
import { Card } from './Card';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export function Boards({board, index, cards}){
    return(
        <Droppable droppableId={board.boardDragId} index={index} type="card" direction="vertical" key={index}>
                {(provided) => (
                    <div className='board' ref={provided.innerRef} {...provided.droppableProps}>
                        <h1>{board.title}</h1>
                            {cards.map((card, index) =>
                                board.boardId == card.boardId ?
                                <Card card={card} index={index} key={index}/> : null
                            )}
                        {provided.placeholder}
                    </div> 
                )}
        </Droppable>
    )
}
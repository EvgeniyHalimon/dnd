import React from 'react';
import { Card } from './Card';
import { Droppable } from 'react-beautiful-dnd';

export function Boards({board, index, cards}){
    return(
        <Droppable droppableId={board.boardDragId} index={index} type="list" direction="vertical">
                {(provided) => (
                    <div className='board' ref={provided.innerRef} {...provided.droppableProps}>
                        <h1>{board.title}</h1>
                        {cards.map((card, index) =>
                            board.id == card.boardId ?
                            <Card card={card} index={index} key={index}/> : null
                        )}
                        {provided.placeholder}
                    </div> 
                )}
        </Droppable>
    )
}
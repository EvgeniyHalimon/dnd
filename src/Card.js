import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export function Card({card, index}){
    console.log("🚀 ~ file: Card.js ~ line 5 ~ Card ~ card", card.dragId)
    return(
        <Draggable draggableId={card.dragId} index={index} key={card.dragId}>
            {(provided) => (
                <div
                    className='card'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <p key={index}>{card.title}</p>
                </div>
            )}
        </Draggable>
    )
}
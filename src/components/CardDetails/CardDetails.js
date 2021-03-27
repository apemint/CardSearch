import React from 'react';

function CardDetails(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <img src={props.imageUrl} alt={props.name}/>
        </div>
    )
}

export default CardDetails;

//Component that is rendered in the list displaying card image and name
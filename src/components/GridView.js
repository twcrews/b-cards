import React from 'react';
import BCard from './BCard';

export function GridView(props) {
    const handleCardChange = (content, id, flipped) => {
        props.onChange(content, id, flipped)
    }

    return (
        <div className="GridView">
            {props.cards.map(card =>
                <React.Fragment>
                </React.Fragment>
            )}
        </div>
    );
}
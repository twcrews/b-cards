import React from 'react';
import { CardEdit } from './CardEdit';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

export function GridView(props) {
    const handleCardChange = (content, id, side) => {
        props.onChange(content, id, side === "back");
    };
    const handleAddCard = () => { props.onAddCard(); };

    return (
        <div>
            {props.deck.cards.map(card =>
                <CardEdit
                    key={card.id}
                    card={card}
                    onChange={(content, side) =>
                        handleCardChange(content, card.id, side)}
                />
            )}
            <Button
                startIcon={<Add/>}
                onClick={handleAddCard}
                variant="contained"
                color="primary"
            />
        </div>);
}
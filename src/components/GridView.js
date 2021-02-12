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
        <div style={{marginBottom: "80px"}}>
            {props.deck.cards.map(card =>
                <CardEdit
                    key={card.id}
                    card={card}
                    onChange={(content, side) =>
                        handleCardChange(content, card.id, side)}
                />
            )}
            <Button
                style={{marginTop: "40px"}}
                size="large"
                startIcon={<Add/>}
                onClick={handleAddCard}
                variant="contained"
                color="primary"
            >
                Add Card
            </Button>
        </div>);
}
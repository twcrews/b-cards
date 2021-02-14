import React from 'react';
import { CardEdit } from './CardEdit';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

export function GridView(props) {
    const handleCardChange = (content, id, side) => {
        props.onChange(content, id, side === "back");
    };
    const handleAddCard = () => { props.onAddCard(); };
    const handleFlag = (id) => { props.onFlag(id); };
    const handleDelete = (index) => { props.onDelete(index); };

    return (
        <div style={{marginBottom: "80px"}}>
            {props.deck.cards.map((card, index) =>
                <CardEdit
                    key={card.id}
                    card={card}
                    onChange={(content, side) =>
                        handleCardChange(content, card.id, side)}
                    onFlag={handleFlag}
                    onDelete={() => handleDelete(index)}
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
import React from 'react';
import { CardEdit } from './CardEdit';
import { Button, ButtonGroup } from '@material-ui/core';
import { Add, SwapHoriz, Slideshow } from '@material-ui/icons';

export function GridView(props) {
    const handleCardChange = (content, id, side) => {
        props.onChange(content, id, side === "back");
    };
    const handleAddCard = () => { props.onAddCard(); };
    const handleFlag = (id) => { props.onFlag(id); };
    const handleDelete = (index) => { props.onDelete(index); };
    const handleSwapAll = () => { props.onSwapAll(); };
    const handleViewCards = () => { props.onViewCards(); };

    return (
        <div style={{ marginBottom: "80px" }}>
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
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
                gap: "20px"
            }}>
                <ButtonGroup>
                    <Button
                        size="large"
                        startIcon={<Add />}
                        onClick={handleAddCard}
                        variant="outlined"
                        color="primary"
                    >
                        Add Card
                    </Button>
                    <Button
                        size="large"
                        startIcon={<SwapHoriz />}
                        onClick={handleSwapAll}
                        variant="outlined"
                        color="primary"
                    >
                        Swap All
                    </Button>
                </ButtonGroup>
                <Button
                    size="large"
                    startIcon={<Slideshow />}
                    onClick={handleViewCards}
                    variant="contained"
                    color="primary"
                >
                    View Cards
                </Button>
            </div>
        </div>);
}
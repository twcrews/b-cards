import React, { useState, useEffect } from 'react';
import { CardEdit } from './CardEdit';
import { Button, ButtonGroup, TextField, Paper} from '@material-ui/core';
import { Add, SwapHoriz, Slideshow } from '@material-ui/icons';

export default function GridView(props) {
    const [cardAdded, setCardAdded] = useState(false);

    const handleCardChange = (content, id, side) => {
        props.onChange(content, id, side === "back");
    };
    const handleAddCard = () => { 
        props.onAddCard(); 
        setCardAdded(true);
    };
    const handleFlag = (id) => { props.onFlag(id); };
    const handleDelete = (index) => { props.onDelete(index); };
    const handleSwapAll = () => { props.onSwapAll(); };
    const handleViewCards = () => { props.onViewCards(); };
    const handleRenameDeck = (event) => { props.onRenameDeck(event.target.value); };

    useEffect(() => {
        window.scrollTo(0,document.body.scrollHeight);
    }, [props.deck.cards.length]);

    useEffect(() => {
        if (cardAdded) {
            let lastCard = props.deck.cards.length - 1
            setCardAdded(false);
            document
                .getElementById(props.deck.cards[lastCard].id + "-front")
                .focus();
        }
    }, [cardAdded, props.deck.cards]);

    return (
        <div style={{ marginBottom: "80px" }}>
            <div id="deck-name-input-container">
                <TextField
                    id="deck-name-input"
                    value={props.deck.name || ""}
                    onChange={handleRenameDeck}
                    variant="outlined"
                    label="Deck name"
                    autoFocus={!props.deck.name}
                />
            </div>
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
            <Paper
                className="Toolbar"
                elevation={3}
            >
                <ButtonGroup>
                    <Button
                        startIcon={<Add />}
                        onClick={handleAddCard}
                        variant="outlined"
                        color="primary"
                    >
                        Add Card
                    </Button>
                    <Button
                        startIcon={<SwapHoriz />}
                        onClick={handleSwapAll}
                        variant="outlined"
                        color="primary"
                    >
                        Swap All
                    </Button>
                </ButtonGroup>
                <Button
                    startIcon={<Slideshow />}
                    onClick={handleViewCards}
                    variant="contained"
                    color="primary"
                >
                    View Deck
                </Button>
            </Paper>
        </div>);
}
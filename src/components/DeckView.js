import React, { useState, useEffect } from 'react';
import {
    Button, 
    ButtonGroup, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions
} from '@material-ui/core'; 
import * as Icon from '@material-ui/icons';
import BCard from './BCard.js';
import ReactCardFlip from 'react-card-flip';

export default function DeckView(props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [selectedCard, setSelectedCard] = useState(0);

    const activeCard = () => {
        var card = props.deck.cards[selectedCard];
        return card ? selectedCard : 0;
    }

    const handleDialogClose = () => { setDialogOpen(false); };
    const handleFlip = () => { setFlipped(!flipped); };
    const handleDelete = () => { setDialogOpen(true); };
    const handleDeleteConfirm = () => {
        setSelectedCard(c => c < props.deck.cards.length - 1 ? 
            c : c === 0 ? 0 : c - 1);
        props.onDeleteCard(selectedCard);
        setDialogOpen(false);
    };
    const handleCardChange = (content) => {
        props.onCardChange(content, selectedCard, flipped);
    };

    const handleAdvanceCard = () => { 
        if (flipped) {
            setFlipped(false);
            setTimeout(() => { setSelectedCard(c => c + 1); }, 120);
        }
        else {
            setSelectedCard(c => c + 1); 
        }
    };
    const handleReverseCard = () => { 
        if (flipped) {
            setFlipped(false);
            setTimeout(() => { setSelectedCard(c => c - 1); }, 120);
        }
        else {
            setSelectedCard(c => c - 1); 
        }
    };
    const handleJumpToEnd = () => {
        setFlipped(false);
        setSelectedCard(props.deck.cards.length - 1);
    };
    const handleJumpToStart = () => { 
        setFlipped(false);
        setSelectedCard(0); 
    };
    const addCard = (frontContent, backContent) => {
        props.onAddCard(frontContent, backContent);
        setSelectedCard(props.deck.cards.length - 1)
    }
    const handleAddCard = () => { addCard("<p></p>", "<p></p>"); };
    const handleDuplicateCard = () => {
        addCard(props.deck.cards[selectedCard].front,
            props.deck.cards[selectedCard].back);
    };

    const controls = (
        <div className="DeckControls">
            <Button
                variant="contained"
                color="primary"
                startIcon={<Icon.FirstPage />}
                disabled={selectedCard === 0}
                onClick={handleJumpToStart}
            >
                First
            </Button>
            <ButtonGroup>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Icon.ArrowBack />}
                    disabled={selectedCard === 0}
                    onClick={handleReverseCard}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Icon.Shuffle />}
                    disabled={props.deck.cards.length === 1}
                >
                    Shuffle
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Icon.ArrowForward />}
                    disabled={selectedCard + 1 === 
                        props.deck.cards.length}
                        onClick={handleAdvanceCard}
                >
                    Next
                </Button>
            </ButtonGroup>
            <Button
                variant="contained"
                color="primary"
                endIcon={<Icon.LastPage />}
                disabled={selectedCard + 1 ===
                    props.deck.cards.length}
                    onClick={handleJumpToEnd}
            >
                Last
            </Button>
        </div>
    );

    useEffect(() => {
        setSelectedCard(0);
        setFlipped(false);
    }, [props.deck.id]);

    return (
        <React.Fragment>
            <div className="Cards">
                <ReactCardFlip
                    isFlipped={flipped}
                    flipDirection="vertical"
                    flipSpeedBackToFront={0.3}
                    flipSpeedFrontToBack={0.3}
                >
                    <BCard
                        id={props.deck.id + "-front-" + selectedCard}
                        flipped={false}
                        onEditorChange={handleCardChange}
                        onFlip={handleFlip}
                        onDelete={handleDelete}
                        onAddCard={handleAddCard}
                        onDuplicate={handleDuplicateCard}
                        number={selectedCard + 1}
                        count={props.deck.cards.length}
                        content={props.deck.cards[activeCard()].front}
                    />
                    <BCard
                        id={props.deck.id + "-back-" + selectedCard}
                        flipped={true}
                        onEditorChange={handleCardChange}
                        onFlip={handleFlip}
                        onDelete={handleDelete}
                        number={selectedCard + 1}
                        count={props.deck.cards.length}
                        content={props.deck.cards[activeCard()].back}
                    />
                </ReactCardFlip>
                <Dialog open={dialogOpen} onClose={handleDialogClose}>
                    <DialogTitle>Delete this card?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This card will be deleted forever (a really long time).
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button color="secondary" onClick={handleDeleteConfirm}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </div>
            {controls}
        </React.Fragment>
    );
}
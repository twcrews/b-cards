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
    const [activeCard, setActiveCard] = useState(0);

    const handleDialogClose = () => { setDialogOpen(false); };
    const handleFlip = () => { setFlipped(!flipped); };
    const handleDelete = () => { setDialogOpen(true); };
    const handleDeleteConfirm = () => {
        props.onDeleteCard(activeCard);
        setDialogOpen(false);
    };
    const handleCardChange = (content) => {
        props.onCardChange(content, activeCard, flipped);
    };

    const handleAdvanceCard = () => { 
        setFlipped(false);
        setActiveCard(c => c + 1); 
    };
    const handleReverseCard = () => { 
        setFlipped(false);
        setActiveCard(c => c - 1); 
    };
    const handleJumpToEnd = () => {
        setFlipped(false);
        setActiveCard(props.deck.cards.length - 1);
    };
    const handleJumpToStart = () => { 
        setFlipped(false);
        setActiveCard(0); 
    };
    const addCard = (frontContent, backContent) => {
        props.onAddCard(frontContent, backContent);
        setActiveCard(c => c + 1)
    }
    const handleAddCard = () => { addCard("<p></p>", "<p></p>"); };
    const handleDuplicateCard = () => {
        addCard(props.deck.cards[activeCard].front,
            props.deck.cards[activeCard].back);
    };

    const controls = (
        <div className="DeckControls">
            <Button
                variant="contained"
                color="primary"
                startIcon={<Icon.FirstPage />}
                disabled={activeCard === 0}
                onClick={handleJumpToStart}
            >
                First
            </Button>
            <ButtonGroup>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Icon.ArrowBack />}
                    disabled={activeCard === 0}
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
                    disabled={activeCard + 1 === 
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
                disabled={activeCard + 1 ===
                    props.deck.cards.length}
                    onClick={handleJumpToEnd}
            >
                Last
            </Button>
        </div>
    );

    useEffect(() => {
        setFlipped(false);
    }, [props.deck.cards.length, props.deck.id]);

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
                        id={props.deck.id + "-front-" + activeCard}
                        flipped={false}
                        onEditorChange={handleCardChange}
                        onFlip={handleFlip}
                        onDelete={handleDelete}
                        onAddCard={handleAddCard}
                        onDuplicate={handleDuplicateCard}
                        number={activeCard + 1}
                        count={props.deck.cards.length}
                        content={props.deck.cards[activeCard].front}
                    />
                    <BCard
                        id={props.deck.id + "-back-" + activeCard}
                        flipped={true}
                        onEditorChange={handleCardChange}
                        onFlip={handleFlip}
                        onDelete={handleDelete}
                        number={activeCard + 1}
                        count={props.deck.cards.length}
                        content={props.deck.cards[activeCard].back}
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
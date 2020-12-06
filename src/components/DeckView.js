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
    const displayCard = () => selectedCard + 1;
    const activeId = () => {
        var card = props.deck.cards[selectedCard];
        return card ? card.id : 0;
    }

    const lastCard = () => selectedCard === props.deck.cards.length - 1;
    const firstCard = () => selectedCard === 0;

    const handleDialogClose = () => { setDialogOpen(false); };
    const handleFlip = () => { setFlipped(!flipped); };
    const handleDelete = () => { setDialogOpen(true); };
    const handleDeleteConfirm = () => {
        if (flipped) {
            setFlipped(false);
            setTimeout(() => { props.onDeleteCard(activeId()); });
        } else {
            props.onDeleteCard(activeId());
        }
        setSelectedCard(c => c < props.deck.cards.length - 1 ? 
            c : c === 0 ? 0 : c - 1);
        setDialogOpen(false);
    };
    const handleCardChange = (content) => {
        props.onCardChange(content, activeId(), flipped);
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
        setFlipped(false);
        props.onAddCard(frontContent, backContent);
        setSelectedCard(props.deck.cards.length - 1)
    }
    const handleAddCard = () => { addCard("", ""); };
    const handleDuplicateCard = () => {
        addCard(props.deck.cards[selectedCard].front,
            props.deck.cards[selectedCard].back);
    };
    const handleFlagToggle = () => { 
        if (props.flaggedOnly && 
            props.deck.cards.length - 1 === selectedCard) {
                setSelectedCard(c => c === 0 ? 0 : c - 1);
        }
        props.onFlag(activeId()); 
    };
    const handleFlaggedOnlyToggle = () => { 
        setSelectedCard(0);
        props.onFlaggedOnly(); 
    };
    const handleShuffleToggle = () => {
        setSelectedCard(0);
        props.onShuffle();
    }

    const controls = (
        <div className="DeckControls">
            <ButtonGroup>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Icon.FirstPage />}
                    disabled={firstCard()}
                    onClick={handleJumpToStart}
                >
                    First
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Icon.ArrowBack />}
                    disabled={firstCard()}
                    onClick={handleReverseCard}
                >
                    Back
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={props.shuffled ? 
                        <Icon.CheckBox /> : 
                        <Icon.CheckBoxOutlineBlank />}
                    disabled={props.deck.cards.length === 1}
                    onClick={handleShuffleToggle}
                >
                    Shuffle
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={props.flaggedOnly ? 
                        <Icon.CheckBox /> : 
                        <Icon.CheckBoxOutlineBlank />}
                    disabled={props.deck.cards.filter(c => c.flagged).length < 1}
                    onClick={handleFlaggedOnlyToggle}
                >
                    Flagged Only
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Icon.ArrowForward />}
                    disabled={lastCard()}
                    onClick={handleAdvanceCard}
                >
                    Next
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Icon.LastPage />}
                    disabled={lastCard()}
                    onClick={handleJumpToEnd}
                >
                    Last
                </Button>
            </ButtonGroup>
        </div>
    );

    useEffect(() => {
        setSelectedCard(0);
        setFlipped(false);
    }, [props.deck.id]);

    return (
        <React.Fragment>
            <div className="CardSpace">
                <ReactCardFlip
                    isFlipped={flipped}
                    flipDirection="vertical"
                    flipSpeedBackToFront={0.3}
                    flipSpeedFrontToBack={0.3}
                >
                    <BCard
                        id={activeId() + "-front"}
                        flipped={false}
                        onEditorChange={handleCardChange}
                        onFlip={handleFlip}
                        onDelete={handleDelete}
                        onAddCard={handleAddCard}
                        onDuplicate={handleDuplicateCard}
                        number={displayCard()}
                        count={props.deck.cards.length}
                        content={props.deck.cards[selectedCard]?.front}
                        flagged={props.deck.cards[selectedCard]?.flagged}
                        onFlag={handleFlagToggle}
                        flaggedOnly={props.flaggedOnly}
                    />
                    <BCard
                        id={activeId() + "-back"}
                        flipped={true}
                        onEditorChange={handleCardChange}
                        onFlip={handleFlip}
                        onDelete={handleDelete}
                        onAddCard={handleAddCard}
                        onDuplicate={handleDuplicateCard}
                        number={displayCard()}
                        count={props.deck.cards.length}
                        content={props.deck.cards[selectedCard]?.back}
                        flagged={props.deck.cards[selectedCard]?.flagged}
                        onFlag={handleFlagToggle}
                        flaggedOnly={props.flaggedOnly}
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
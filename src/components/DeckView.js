import React, { useState, useReducer } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import BCard from './BCard.js';
import ReactCardFlip from 'react-card-flip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ShuffleIcon from '@material-ui/icons/Shuffle';

export default function DeckView(props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [selectedCard, setSelectedCard] = useState(0);

    const handleDialogClose = () => { setDialogOpen(false); };
    const handleFlip = () => { setFlipped(!flipped); };
    const handleDelete = () => { setDialogOpen(true); };
    const handleDeleteConfirm = () => {
        props.onDelete();
        setDialogOpen(false);
    };
    const handleCardChange = (content, editor) => {
        props.onChange(content, editor, selectedCard, flipped);
    };

    const controls = (
        <div className="DeckControls">
            <ButtonGroup>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                >
                    Back
          </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShuffleIcon />}
                >
                    Shuffle
          </Button>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                >
                    Next
          </Button>
            </ButtonGroup>
        </div>
    );

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
                        onChange={(content, editor) =>
                            handleCardChange(content, editor)}
                        onFlip={handleFlip}
                        onDelete={handleDelete}
                        number={selectedCard + 1}
                        count={props.deck.cards.length}
                        content={props.deck.cards[selectedCard].front}
                    />
                    <BCard
                        id={props.deck.id + "-back-" + selectedCard}
                        flipped={true}
                        onChange={(content, editor) =>
                            handleCardChange(content, editor)}
                        onFlip={handleFlip}
                        onDelete={handleDelete}
                        number={selectedCard + 1}
                        count={props.deck.cards.length}
                        content={props.deck.cards[selectedCard].back}/>
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
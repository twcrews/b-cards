import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

export default function DeckView(props) {
    const [deckIndex, setDeckIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogClose = () => { setDialogOpen(false) }

    return (
        <div className="DeckView">
            <div className="PreviewCard">
                {deckIndex > 0 ? 
                    <Card className="SideCard">
                        {props.deck.cards[deckIndex - 1].front}
                    </Card> :
                    <div />}
                <Card elevation={6} className="Card">
                    <div className="CardContent">
                        {flipped ? props.deck.cards[deckIndex].back :
                            props.deck.cards[deckIndex].front}
                    </div>
                    <div className="CardTools">
                        <IconButton>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => setDialogOpen(true)}>
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                </Card>
                {deckIndex >= props.deck.cards.length - 1 ? <div /> :
                <Card className="SideCard">{props.deck.cards[deckIndex + 1].front}</Card>}
            </div>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Delete this card?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This card will be deleted forever (a really long time).
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button color="secondary" onClick={handleDialogClose}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
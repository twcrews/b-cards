import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Card from '@material-ui/core/Card';

export default function DeckView(props) {
    const [deckIndex, setDeckIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="DeckView">
            <div className="PreviewCard">
                {deckIndex > 0 ? 
                    <Card className="SideCard">{props.deck.cards[deckIndex - 1].front}</Card> :
                    ""
                }
            </div>
                <Card elevation={8} className="Card">
                    <div className="CardContent">
                        {flipped ? props.deck.cards[deckIndex].back :
                            props.deck.cards[deckIndex].front}
                    </div>
                    <div className="CardTools">
                        <IconButton>
                            <EditIcon/>
                        </IconButton>
                        <IconButton>
                            <DeleteForeverIcon/>
                        </IconButton>
                    </div>
                </Card>
            <div className="PreviewCard">
                {deckIndex >= props.deck.cards.length - 1 ? "" :
                <Card className="SideCard">{props.deck.cards[deckIndex + 1].front}</Card>}
            </div>
        </div>
    );
}
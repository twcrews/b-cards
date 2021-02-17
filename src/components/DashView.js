import React from 'react';
import * as Material from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import ReactHtmlParser from 'react-html-parser';

export default function DashView(props) {
  const formattedDate = (date) => {
    return (new Date(date)).toLocaleString(
      [], {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSelectDeck = (deck) => {
      props.onSelect(deck);
  };
  const handleNewDeck = () => { props.onNewDeck() }

    return (
        <div className="DashView">
            {props.decks.sort((a, b) =>
                (a.modified < b.modified) ? 1 : -1)
                .map(deck =>
                    <div 
                        className="DashCardContainer"
                        onClick={() => handleSelectDeck(deck)}
                    >
                        <Material.Paper 
                            className="DashCard" 
                            square
                            elevation={3}
                        >
                            <div style={{
                                overflow: "hidden",
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                {ReactHtmlParser(deck.cards[0].front)}
                            </div>
                        </Material.Paper>
                        <Material.Typography variant="h5">
                            {deck.name || "Untitled"}
                        </Material.Typography>
                        <Material.Typography
                            className="GrayText"
                            variant="subtitle1"
                        >
                            {formattedDate(deck.modified)}
                        </Material.Typography>
                    </div>
                )}
            <div 
                className="DashCardContainer"
                onClick={handleNewDeck}
            >
                <div className="DashNewCard">
                    <span style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <Icon.Add />
                        <Material.Typography variant="h5">
                            New deck
                    </Material.Typography>
                    </span>
                </div>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import {
    Button,
    ButtonGroup,
    Slide
} from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import BCard from './BCard.js';
import ReactCardFlip from 'react-card-flip';

export default function DeckView(props) {
    const [flipped, setFlipped] = useState(false);
    const [selectedCard, setSelectedCard] = useState(0);
    const [cardIn, setCardIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState(null);

    const displayCard = () => selectedCard + 1;
    const activeId = () => {
        let card = props.deck.cards[selectedCard];
        return card ? card.id : 0;
    }

    const lastCard = () => props.deck.cards.length - 1;

    const isLastCard = selectedCard === props.deck.cards.length - 1;
    const isFirstCard = selectedCard === 0;

    const discreetFlip = (callback) => {
        if (flipped) {
            setFlipped(false);
            callback();
        } else {
            callback();
        }
    }
    const handleFlip = () => { setFlipped(!flipped); };
    const handleCardChange = (content) => {
        props.onCardChange(content, activeId(), flipped);
    };

    const handleAdvanceCard = () => {
        setSlideDirection("right");
        setCardIn(false);
        discreetFlip(() => setTimeout(() => {
            setSlideDirection("left");
            setCardIn(true);
            setSelectedCard(c => c < lastCard() ? 
                c + 1 : lastCard());
        }, 230));
    };
    const handleReverseCard = () => {
        setSlideDirection("left");
        setCardIn(false);
        discreetFlip(() => setTimeout(() => {
            setSlideDirection("right");
            setCardIn(true);
            setSelectedCard(c => c > 0 ? c - 1 : 0);
        }, 230));
    };
    const handleJumpToEnd = () => {
        setSlideDirection("right");
        setCardIn(false);
        discreetFlip(() => setTimeout(() => {
            setSlideDirection("left");
            setCardIn(true);
            setSelectedCard(props.deck.cards.length - 1);
        }, 230));
    };
    const handleJumpToStart = () => {
        setSlideDirection("left");
        setCardIn(false);
        discreetFlip(() => setTimeout(() => {
            setSlideDirection("right");
            setCardIn(true);
            setSelectedCard(0);
        }, 230));
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
        discreetFlip(() => setSelectedCard(0));
        props.onFlaggedOnly();
    };
    const handleShuffleToggle = () => {
        discreetFlip(() => setSelectedCard(0));
        props.onShuffle();
    }
    const handleKeyPress = (event) => {
        if (props.focus) {
            switch (event.key) {
                case "ArrowLeft":
                    if (!isFirstCard) {
                        handleReverseCard();
                    }
                    break;
                case "ArrowRight":
                    if (!isLastCard) {
                        handleAdvanceCard();
                    }
                    break;
                case "ArrowUp":
                    if (!isFirstCard) {
                        handleJumpToStart();
                    }
                    break;
                case "ArrowDown":
                    if (!isLastCard) {
                        handleJumpToEnd();
                    }
                    break;
                case " ":
                    event.preventDefault();
                    event.stopPropagation();
                    handleFlip();
                    break;
                default: break;
            }
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    });

    const controls = (
        <div className="DeckControls">
            <ButtonGroup>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Icon.FirstPage />}
                    disabled={isFirstCard}
                    onClick={handleJumpToStart}
                >
                    First
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Icon.ArrowBack />}
                    disabled={isFirstCard}
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
                    disabled={isLastCard}
                    onClick={handleAdvanceCard}
                >
                    Next
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Icon.LastPage />}
                    disabled={isLastCard}
                    onClick={handleJumpToEnd}
                >
                    Last
                </Button>
            </ButtonGroup>
            <Button
                color="primary"
                variant="contained"
                startIcon={<Icon.Add />}
                onClick={handleAddCard}
                disabled={props.flaggedOnly}
            >
                Add Card
            </Button>
        </div>
    );

    useEffect(() => {
        setSelectedCard(0);
        setFlipped(false);
    }, [props.deck.id]);

    return (
        <div className="DeckView">
            <div className="CardSpace">
                <Slide 
                    in={cardIn}
                    direction={slideDirection}>
                    <div
                        style={{height: "100%"}}>
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
                    </div>
                </Slide>
            </div>
            {controls}
        </div>
    );
}
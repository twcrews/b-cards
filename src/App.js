import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import EmptyState from './components/EmptyState';
import DeckView from './components/DeckView';
import './App.css';

function App() {
  const testDeck = ({
    name: "Test Deck",
    cards: [
      {
        front: "First card.",
        back: "First card back."
      },
      {
        front: "Second card.",
        back: "Second card back."
      },
      {
        front: "3",
        back: "3 back"
      },
      {
        front: "4",
        back: "4 back"
      }
    ]
  });

  const [deck, setDeck] = useState(testDeck);
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => { setDrawer(open); }

  const deckTitle = (
    <React.Fragment>
      <span className="TitleText">
        bCards
      </span>
      <Typography className="SubtitleText" variant="h6">
        {"\xa0\xa0—\xa0\xa0" + (deck ? deck.name : "no deck loaded")}
      </Typography>
    </React.Fragment>
  );

  const content = (
    deck ? <DeckView deck={deck}/> :
    <EmptyState>Select a Deck from the drawer to get started.</EmptyState>
  );

  return (
    <div className="App">
      <AppBar position="static" elevation={3}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          {deckTitle}
        </Toolbar>
      </AppBar>
      <div className="Page">
        <Drawer anchor="left" open={drawer} onClose={toggleDrawer(false)}>
        </Drawer>
        {content}
      </div>
    </div>
  );
}

export default App;

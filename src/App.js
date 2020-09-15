import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import EmptyState from './components/EmptyState';
import DeckView from './components/DeckView';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItem';
import './App.css';

function App() {
  const testDecks = ([{
    name: "Test Deck",
    created: "2020-09-07T23:19:39.511Z",
    cards: [
      {
        front: "<mark>card.</mark>",
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
  }]);

  useEffect(() => { setDecks(testDecks) }, []);
  useEffect(() => { setSelectedDeck(testDecks[0]) }, []);

  const [decks, setDecks] = useState(null);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => { setDrawer(open); }

  const drawerContent = (
    <div className="Drawer">
      <List>
        {decks ? decks.map((deck) => 
          <ListItem>
            <ListItemText primary={deck.name} secondary={deck.created} />
          </ListItem>
        ) : ""}
      </List>
    </div>
  );

  const deckTitle = (
    <React.Fragment>
      <span className="TitleText">
        bCards
      </span>
      <Typography className="SubtitleText" variant="h6">
        {"\xa0\xa0—\xa0\xa0" + (selectedDeck ? selectedDeck.name : "no deck loaded")}
      </Typography>
    </React.Fragment>
  );

  const content = (
    selectedDeck ? <DeckView deck={selectedDeck}/> :
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
          {drawerContent}
        </Drawer>
        {content}
      </div>
    </div>
  );
}

export default App;

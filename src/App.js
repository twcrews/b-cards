import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import EmptyState from './components/EmptyState';
import DeckView from './components/DeckView';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import './App.css';
import { Button } from '@material-ui/core';

function App() {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [drawerItems, setDrawerItems] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [newDeckDialogOpen, setNewDeckDialogOpen] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [appMenuOpen, setAppMenuOpen] = useState(false);

  const toggleDrawer = (open) => (event) => { setDrawer(open); };
  const handleNewDeck = () => { setNewDeckDialogOpen(true); };
  const handleNewDeckDialogClose = () => { setNewDeckDialogOpen(false); };
  const handleNewDeckNameChange = (event) => {
    var text = event.target.value;
    text = text.substr(0, 20).replace(/[^0-9a-z_-\s]/gi, '');
    setNewDeckName(text);
  };
  const handleNewDeckConfirm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (newDeckName.trim()) {
      setNewDeckDialogOpen(false);
      addDeck(newDeckName.trim());
      setNewDeckName('');
    }
  };
  const addDeck = (deckName) => {
    var newId = uuid();
    var newObj = {
      name: newId,
      content: {
        id: newId,
        name: deckName,
        created: new Date(),
        cards: [
          {
            front: "<p></p>",
            back: "<p></p>",
            flagged: false
          }
        ]
      }
    }
    localStorage.setItem(newObj.name, JSON.stringify(newObj.content));
    handleDeckSelected(newObj.content);
  };
  const handleDeckSelected = (deck) => {
    setDrawer(false);
    setSelectedDeck(deck);
  };
  const handleCardChange = (content, editor, selected, flipped) => {
    var tmpDeck = { ...selectedDeck };
    if (flipped) {
      tmpDeck.cards[selected].back = content;
    } else {
      tmpDeck.cards[selected].front = content;
    }
    setSelectedDeck(tmpDeck);
  };
  const handleDeleteDeckConfirm = (deck) => {
    var tmpArr = [...drawerItems];
    tmpArr.splice(drawerItems.indexOf(deck), 1);
    localStorage.removeItem(deck.id);
  }

  const allStorage = () => {

    var storage = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      storage.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    return storage;
  }

  const emptyDrawer = (
    <div className="EmptyDrawer">
      <Typography variant="h6">No decks found</Typography>
    </div>
  );

  const newDeckDialog = (
    <Dialog open={newDeckDialogOpen} onClose={handleNewDeckDialogClose}>
      <form onSubmit={handleNewDeckConfirm}>
        <DialogTitle>New Deck</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Deck name"
            value={newDeckName}
            onChange={handleNewDeckNameChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewDeckDialogClose}>Cancel</Button>
          <Button
            disabled={!newDeckName.trim()}
            type="submit"
          >
            Add
            </Button>
        </DialogActions>
      </form>
    </Dialog>
  );

  const drawerContent = (
    <div className="Drawer">
      <div className="DeckList">
        {drawerItems.length > 0 ?
          <List>
            {drawerItems.map((deck) =>
              <ListItem
                key={deck.id}
                button
                onClick={() => handleDeckSelected(deck)}
              >
                <ListItemText
                  primary={deck.name}
                  secondary={deck.created.toLocaleString()}
                  primaryTypographyProps={{ noWrap: true }}
                />
              </ListItem>)}
          </List> :
          emptyDrawer}
      </div>
      <Button
        className="DrawerButton"
        disableElevation
        startIcon={<AddIcon />}
        onClick={handleNewDeck}
        fullWidth
        variant="contained"
      >
        New Deck
      </Button>
    </div>
  );

  const deckTitle = (
    <div className="AppTitle">
      <span className="TitleText">
        bCards
      </span>
      <Typography className="SubtitleText" variant="h6" noWrap>
        {"\xa0\xa0—\xa0\xa0" + (selectedDeck ? selectedDeck.name : "No deck loaded")}
      </Typography>
    </div>
  );

  const content = (
    selectedDeck ?
      <DeckView
        deck={selectedDeck}
        onChange={
          (content, editor, selected, flipped) =>
            handleCardChange(content, editor, selected, flipped)}
      /> :
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
          <IconButton
            color="inherit"
            onClick={handleNewDeck}
          >
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="Page">
        {content}
      </div>
      <React.Fragment>
        <Menu
          open={appMenuOpen}
        >
        </Menu>
        <Drawer anchor="left" open={drawer} onClose={toggleDrawer(false)}>
          {drawerContent}
        </Drawer>
        {newDeckDialog}
      </React.Fragment>
    </div>
  );
}

function uuid() {
  return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/x/g, function (c) {
    return (Math.random() * 16 | 0).toString(16);
  });
}

export default App;

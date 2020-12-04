import React, { useState, useEffect } from 'react';
import {
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  TextField, 
  Menu, 
  MenuItem, 
  Button, 
  FormControlLabel, 
  Checkbox
} from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import './App.css';
import EmptyState from './components/EmptyState';
import DeckView from './components/DeckView';

function App() {
  const [deck, setDeck] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [newDeckDialogOpen, setNewDeckDialogOpen] = useState(false);
  const [duplicateDeckDialogOpen, setDuplicateDeckDialogOpen] = useState(false);
  const [deleteDeckDialogOpen, setDeleteDeckDialogOpen] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [openNewDeck, setOpenNewDeck] = useState(false);
  const [appMenuOpen, setAppMenuOpen] = useState(false);
  const [appMenuAnchor, setAppMenuAnchor] = useState(null);

  const allStorage = () => {
    var storage = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      if (keys[i] !== "lastOpen") {
        storage.push(JSON.parse(localStorage.getItem(keys[i])));
      }
    }
    return storage;
  };

  const formattedDate = (date) => {
    return (new Date(date)).toLocaleString(
      [], {
        month: 'numeric', 
        day: 'numeric', 
        year: 'numeric', 
        hour: '2-digit', 
        minute:'2-digit'});
  }

  useEffect(() => {
    setDeck(JSON.parse(localStorage.getItem(localStorage.getItem("lastOpen"))));
  }, []);

  const writeDeck = (newDeck) => {
    newDeck.modified = new Date();
    setDeck(newDeck);
    localStorage.setItem(newDeck.id, JSON.stringify(newDeck));
  };
  const handleDrawerOpen = () => { setDrawer(true); };
  const handleDrawerClose = () => { setDrawer(false); };
  const handleNewDeck = () => {
    setNewDeckDialogOpen(true);
    setAppMenuOpen(false);
  };
  const handleDuplicateDeck = () => {
    setDuplicateDeckDialogOpen(true);
    setAppMenuOpen(false);
  };
  const handleNewDeckDialogClose = () => 
    { setNewDeckDialogOpen(false); };
    const handleDuplicateDeckDialogClose = () => 
      { setDuplicateDeckDialogOpen(false); };
  const handleNewDeckNameChange = (event) => {
    var text = event.target.value;
    text = text.substr(0, 20);//.replace(/[^0-9a-z_-\s]/gi, '');
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
  const handleDuplicateDeckConfirm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (newDeckName.trim()) {
      setDuplicateDeckDialogOpen(false);
      var newDeck = {...deck};
      newDeck.id = uuid();
      newDeck.name = newDeckName.trim();
      newDeck.created = formattedDate();
      localStorage.setItem(newDeck.id, JSON.stringify(newDeck));
      setNewDeckName('');
      if (openNewDeck) { setDeck(newDeck); }
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
        modified: new Date(),
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
    setDeck(JSON.parse(localStorage.getItem(deck.id)));
    localStorage.setItem("lastOpen", deck.id);
  };
  const handleCardChange = (content, selected, flipped) => {
    var tmpDeck = { ...deck };
    if (flipped) {
      console.log("Writing '" + content + "' to back of card " + selected + " in deck '" + deck.name + "'");
      tmpDeck.cards[selected].back = content;
    } else {
      console.log("Writing '" + content + "' to front of card " + selected + " in deck '" + deck.name + "'");
      tmpDeck.cards[selected].front = content;
    }
    writeDeck(tmpDeck);
  };
  const handleDeleteDeck = () => {
    setAppMenuOpen(false);
    setDeleteDeckDialogOpen(true);
  }
  const handleDeleteDeckDialogClose = () => {
    setDeleteDeckDialogOpen(false);
  };
  const handleDeleteDeckConfirm = () => {
    setDeleteDeckDialogOpen(false);
    localStorage.removeItem(deck.id);
    setDeck(null);
  };
  const handleAppMenuOpen = (event) => {
    setAppMenuAnchor(event.currentTarget);
    setAppMenuOpen(true);
  };
  const handleAppMenuClose = () => { setAppMenuOpen(false); };
  const handleOpenNewDeckChange = () => {
    setOpenNewDeck(!openNewDeck); 
  };
  
  const handleAddCard = (front, back) => {
    var tmpDeck = {...deck};
    tmpDeck.cards.push({
      front: front,
      back: back,
      flagged: false
    });
    writeDeck(tmpDeck);
  };
  const handleDeleteCard = (index) => {
    var tmpDeck = {...deck};
    tmpDeck.cards = tmpDeck.cards.splice(index, 1);
    writeDeck(tmpDeck);
  }

  const emptyDrawer = (
    <div className="EmptyDrawer">
      <Typography variant="h6">No decks found</Typography>
    </div>
  );

  const deleteDeckDialog = (
    <Dialog open={deleteDeckDialogOpen} onClose={handleDeleteDeckDialogClose}>
      <DialogTitle>Delete "{deck ? deck.name : null}"?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This deck will be deleted forever (a really long time).
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteDeckDialogClose}>Cancel</Button>
        <Button color="secondary" onClick={handleDeleteDeckConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
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

  const duplicateDeckDialog = (
    <Dialog open={duplicateDeckDialogOpen} onClose={handleDuplicateDeckDialogClose}>
      <form onSubmit={handleDuplicateDeckConfirm}>
  <DialogTitle>Duplicate "{deck ? deck.name : null}"</DialogTitle>
        <DialogContent className="DialogGrid">
          <TextField
            autoFocus
            label="Deck name"
            value={newDeckName}
            onChange={handleNewDeckNameChange} />
            <FormControlLabel
              control={
                <Checkbox
                  checked={openNewDeck}
                  onChange={handleOpenNewDeckChange}
                  color="primary"
                />
              }
              label={"Open " + (newDeckName ? newDeckName : "new deck")}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDuplicateDeckDialogClose}>Cancel</Button>
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
        {allStorage() && allStorage().length > 0 ?
          <List>
            {allStorage().map((d) =>
              <ListItem
                key={d.id}
                button
                onClick={() => handleDeckSelected(d)}
                selected={deck ? deck.id === d.id : false}
              >
                <ListItemText
                  primary={d.name}
                  secondary={formattedDate(d.modified)}
                  primaryTypographyProps={{ noWrap: true }}
                />
              </ListItem>)}
          </List> :
          emptyDrawer}
      </div>
      <Button
        className="DrawerButton"
        disableElevation
        startIcon={<Icon.Add />}
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
        {"\xa0\xa0—\xa0\xa0" + (deck ? deck.name : "No deck loaded")}
      </Typography>
    </div>
  );

  const content = (
    deck ?
      <DeckView
        deck={deck}
        onCardChange={handleCardChange}
        onAddCard={handleAddCard}
        onDeleteCard={handleDeleteCard}
      /> :
      <EmptyState>Select a Deck from the drawer to get started.</EmptyState>
  );

  return (
    <div className="App">
      <AppBar position="static" elevation={3}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
            <Icon.Menu />
          </IconButton>
          {deckTitle}
          <IconButton
            color="inherit"
            onClick={handleAppMenuOpen}
          >
            <Icon.MoreVert />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="Page">
        {content}
      </div>
      <React.Fragment>
        <Menu
          open={appMenuOpen}
          onClose={handleAppMenuClose}
          anchorEl={appMenuAnchor}
        >
          <MenuItem
            onClick={handleNewDeck}
          >
            <Icon.Add className="GrayText" />
            Add Deck
          </MenuItem>
          <MenuItem
            disabled={!deck}
            onClick={handleDuplicateDeck}
          >
            <Icon.FilterNone className="GrayText" />
            Duplicate Deck
          </MenuItem>
          <MenuItem
            disabled={!deck}
            onClick={handleDeleteDeck}
          >
            <Icon.Delete className="GrayText" />
            Delete Deck
          </MenuItem>
        </Menu>
        <Drawer anchor="left" open={drawer} onClose={handleDrawerClose}>
          {drawerContent}
        </Drawer>
        {newDeckDialog}
        {deleteDeckDialog}
        {duplicateDeckDialog}
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

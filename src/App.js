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
  const [newDeckDialog, setNewDeckDialog] = useState(false);
  const [duplicateDeckDialog, setDuplicateDeckDialog] = useState(false);
  const [renameDeckDialog, setRenameDeckDialog] = useState(false);
  const [deleteDeckDialog, setDeleteDeckDialog] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [renameDeckName, setRenameDeckName] = useState('');
  const [openNewDeck, setOpenNewDeck] = useState(false);
  const [appMenuOpen, setAppMenuOpen] = useState(false);
  const [appMenuAnchor, setAppMenuAnchor] = useState(null);
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [shuffled, setShuffled] = useState(false);

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
      minute: '2-digit'
    });
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
    setNewDeckDialog(true);
    setAppMenuOpen(false);
  };
  const handleDuplicateDeck = () => {
    setDuplicateDeckDialog(true);
    setAppMenuOpen(false);
  };
  const handleNewDeckDialogClose = () => { setNewDeckDialog(false); };
  const handleDuplicateDeckDialogClose = () => { setDuplicateDeckDialog(false); };
  const handleNewDeckNameChange = (event) => {
    var text = event.target.value;
    text = text.substr(0, 20);//.replace(/[^0-9a-z_-\s]/gi, '');
    setNewDeckName(text);
  };
  const handleNewDeckConfirm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (newDeckName.trim()) {
      setNewDeckDialog(false);
      addDeck(newDeckName.trim());
      setNewDeckName('');
    }
  };
  const handleDuplicateDeckConfirm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (newDeckName.trim()) {
      setDuplicateDeckDialog(false);
      var newDeck = { ...deck };
      newDeck.id = uuid();
      newDeck.name = newDeckName.trim();
      newDeck.created = formattedDate();
      localStorage.setItem(newDeck.id, JSON.stringify(newDeck));
      setNewDeckName('');
      if (openNewDeck) { setDeck(newDeck); }
    }
  };
  const addDeck = (deckName) => {
    setFlaggedOnly(false);
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
            id: uuid(),
            front: "",
            back: "",
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
  const handleCardChange = (content, id, flipped) => {
    var tmpDeck = { ...deck };
    if (flipped) {
      tmpDeck.cards.find(c => c.id === id).back = content;
    } else {
      tmpDeck.cards.find(c => c.id === id).front = content;
    }
    writeDeck(tmpDeck);
  };
  const handleRenameDeck = () => {
    setAppMenuOpen(false);
    setRenameDeckName(deck.name);
    setRenameDeckDialog(true);
  }
  const handleRenameDeckDialogClose = () => {
    setRenameDeckDialog(false);
  }
  const handleRenameDeckNameChanged = (event) => {
    var text = event.target.value;
    text = text.substr(0, 20);
    setRenameDeckName(text);
  }
  const handleRenameDeckConfirm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (renameDeckName.trim()) {
      setRenameDeckDialog(false);
      var newDeck = { ...deck };
      newDeck.name = renameDeckName.trim();
      writeDeck(newDeck);
    }
  }
  const handleDeleteDeck = () => {
    setAppMenuOpen(false);
    setDeleteDeckDialog(true);
  }
  const handleDeleteDeckDialogClose = () => {
    setDeleteDeckDialog(false);
  };
  const handleDeleteDeckConfirm = () => {
    setDeleteDeckDialog(false);
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
    var tmpDeck = { ...deck };
    tmpDeck.cards.push({
      id: uuid(),
      front: front,
      back: back,
      flagged: false
    });
    writeDeck(tmpDeck);
  };
  const handleDeleteCard = (index) => {
    if (deck.cards.length === 1) {
      handleDeleteDeckConfirm();
    } else {
      var tmpDeck = { ...deck };
      tmpDeck.cards.splice(index, 1);
      writeDeck(tmpDeck);
    }
  };
  const handleFlagToggle = (id) => {
    if (flaggedOnly && deck.cards.filter(c => c.flagged).length < 2) {
      handleFlaggedOnlyToggle();
    }
    var tmpDeck = { ...deck };
    tmpDeck.cards.find(c => c.id === id).flagged =
      !deck.cards.find(c => c.id === id).flagged;
    writeDeck(tmpDeck);
  };
  const handleFlaggedOnlyToggle = () => { setFlaggedOnly(f => !f); };
  const handleShuffleToggle = () => { setShuffled(s => !s); };

  const visibleCards = () => {
    var visibleDeck = { ...deck }
    if (flaggedOnly) {
      visibleDeck.cards = deck.cards.filter(c =>
        c.flagged);
    }
    if (shuffled) {
      var cards = [...visibleDeck.cards];
      visibleDeck.cards = shuffle(cards);
    }
    return visibleDeck;
  };

  const emptyDrawer = (
    <div className="EmptyDrawer">
      <Typography variant="h6">No decks found</Typography>
    </div>
  );

  const deleteDeckDialogContent = (
    <Dialog open={deleteDeckDialog} onClose={handleDeleteDeckDialogClose}>
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

  const newDeckDialogContent = (
    <Dialog open={newDeckDialog} onClose={handleNewDeckDialogClose}>
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

  const duplicateDeckDialogContent = (
    <Dialog open={duplicateDeckDialog} onClose={handleDuplicateDeckDialogClose}>
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

  const renameDeckDialogContent = (
    <Dialog open={renameDeckDialog} onClose={handleRenameDeckDialogClose}>
      <form onSubmit={handleRenameDeckConfirm}>
        <DialogTitle>Rename Deck</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Deck name"
            value={renameDeckName}
            onChange={handleRenameDeckNameChanged} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRenameDeckDialogClose}>Cancel</Button>
          <Button
            disabled={!renameDeckName.trim() || renameDeckName === deck.name}
            type="submit"
          >
            Rename
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
            {allStorage().sort((a, b) =>
              (a.modified < b.modified) ? 1 : -1).map((d) =>
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

  const content = (
    deck ?
      <DeckView
        deck={visibleCards()}
        onCardChange={handleCardChange}
        onAddCard={handleAddCard}
        onDeleteCard={handleDeleteCard}
        onFlag={handleFlagToggle}
        onFlaggedOnly={handleFlaggedOnlyToggle}
        onShuffle={handleShuffleToggle}
        flaggedOnly={flaggedOnly}
        shuffled={shuffled}
      /> :
      <EmptyState>Select a Deck from the drawer to get started.</EmptyState>
  );

  return (
    <div className="App">
      <AppBar position="static" elevation={3}>
        <Toolbar>
          <div className="ThreeColumn CenterVertical">
            <div className="LeftAlign">
              <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
                <Icon.Menu />
              </IconButton>
              <span className="TitleText">
                bCards
              </span>
            </div>
            <Typography className="TitleText CenterAlign" variant="h6" noWrap>
              {deck ? deck.name : "No deck loaded"}
            </Typography>
            <span className="AutoWidth RightAlign">
              <IconButton
                color="inherit"
                onClick={handleAppMenuOpen}
              >
                <Icon.MoreVert />
              </IconButton>
            </span>
          </div>
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
            onClick={handleRenameDeck}
          >
            <Icon.Edit className="GrayText" />
            Rename Deck
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
        {newDeckDialogContent}
        {deleteDeckDialogContent}
        {duplicateDeckDialogContent}
        {renameDeckDialogContent}
      </React.Fragment>
    </div>
  );
}

function uuid() {
  return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/x/g, function (c) {
    return (Math.random() * 16 | 0).toString(16);
  });
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default App;

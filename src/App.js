import React, { useState, useEffect } from 'react';
import * as M from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import './App.css';
import EmptyState from './components/EmptyState';
import DeckView from './components/DeckView';

function App() {
  /********** STATES **********/
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

  /********** FUNCTIONS **********/
  const uuid = () => {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/x/g, function (c) {
      return (Math.random() * 16 | 0).toString(16);
    });
  };

  const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  };

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
  };

  const writeDeck = (newDeck) => {
    newDeck.modified = new Date();
    setDeck(newDeck);
    localStorage.setItem(newDeck.id, JSON.stringify(newDeck));
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

  /********** EFFECTS **********/
  useEffect(() => {
    setDeck(JSON.parse(localStorage.getItem(localStorage.getItem("lastOpen"))));
  }, []);

  /********** EVENT HANDLERS **********/
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
    text = text.substr(0, 20);
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

  /********** UI CONSTANTS **********/
  const emptyDrawer = (
    <div className="EmptyDrawer">
      <M.Typography variant="h6">No decks found</M.Typography>
    </div>
  );

  const deleteDeckDialogContent = (
    <M.Dialog open={deleteDeckDialog} onClose={handleDeleteDeckDialogClose}>
      <M.DialogTitle>Delete "{deck ? deck.name : null}"?</M.DialogTitle>
      <M.DialogContent>
        <M.DialogContentText>
          This deck will be deleted forever (a really long time).
        </M.DialogContentText>
      </M.DialogContent>
      <M.DialogActions>
        <M.Button onClick={handleDeleteDeckDialogClose}>Cancel</M.Button>
        <M.Button color="secondary" onClick={handleDeleteDeckConfirm}>Delete</M.Button>
      </M.DialogActions>
    </M.Dialog>
  );

  const newDeckDialogContent = (
    <M.Dialog open={newDeckDialog} onClose={handleNewDeckDialogClose}>
      <form onSubmit={handleNewDeckConfirm}>
        <M.DialogTitle>New Deck</M.DialogTitle>
        <M.DialogContent>
          <M.TextField
            autoFocus
            label="Deck name"
            value={newDeckName}
            onChange={handleNewDeckNameChange} />
        </M.DialogContent>
        <M.DialogActions>
          <M.Button onClick={handleNewDeckDialogClose}>Cancel</M.Button>
          <M.Button
            disabled={!newDeckName.trim()}
            type="submit"
          >
            Add
            </M.Button>
        </M.DialogActions>
      </form>
    </M.Dialog>
  );

  const duplicateDeckDialogContent = (
    <M.Dialog open={duplicateDeckDialog} onClose={handleDuplicateDeckDialogClose}>
      <form onSubmit={handleDuplicateDeckConfirm}>
        <M.DialogTitle>Duplicate "{deck ? deck.name : null}"</M.DialogTitle>
        <M.DialogContent className="DialogGrid">
          <M.TextField
            autoFocus
            label="Deck name"
            value={newDeckName}
            onChange={handleNewDeckNameChange} />
          <M.FormControlLabel
            control={
              <M.Checkbox
                checked={openNewDeck}
                onChange={handleOpenNewDeckChange}
                color="primary"
              />
            }
            label={"Open " + (newDeckName ? newDeckName : "new deck")}
          />
        </M.DialogContent>
        <M.DialogActions>
          <M.Button onClick={handleDuplicateDeckDialogClose}>Cancel</M.Button>
          <M.Button
            disabled={!newDeckName.trim()}
            type="submit"
          >
            Add
            </M.Button>
        </M.DialogActions>
      </form>
    </M.Dialog>
  );

  const renameDeckDialogContent = (
    <M.Dialog open={renameDeckDialog} onClose={handleRenameDeckDialogClose}>
      <form onSubmit={handleRenameDeckConfirm}>
        <M.DialogTitle>Rename Deck</M.DialogTitle>
        <M.DialogContent>
          <M.TextField
            autoFocus
            label="Deck name"
            value={renameDeckName}
            onChange={handleRenameDeckNameChanged} />
        </M.DialogContent>
        <M.DialogActions>
          <M.Button onClick={handleRenameDeckDialogClose}>Cancel</M.Button>
          <M.Button
            disabled={!renameDeckName.trim() || renameDeckName === deck.name}
            type="submit"
          >
            Rename
            </M.Button>
        </M.DialogActions>
      </form>
    </M.Dialog>
  );

  const drawerContent = (
    <div className="Drawer">
      <div className="DeckList">
        {allStorage() && allStorage().length > 0 ?
          <M.List>
            {allStorage().sort((a, b) =>
              (a.modified < b.modified) ? 1 : -1).map((d) =>
                <M.ListItem
                  key={d.id}
                  button
                  onClick={() => handleDeckSelected(d)}
                  selected={deck ? deck.id === d.id : false}
                >
                  <div className="DrawerItemContent">
                    <M.ListItemText
                      primary={d.name}
                      secondary={formattedDate(d.modified)}
                      primaryTypographyProps={{ noWrap: true }}
                    />
                    <span>
                      <M.IconButton 
                        edge="end"
                      >
                        <Icon.Edit color="disabled" />
                      </M.IconButton>
                      <M.IconButton 
                        edge="end"
                      >
                        <Icon.Delete color="disabled" />
                      </M.IconButton>
                    </span>
                  </div>
                </M.ListItem>)}
          </M.List> :
          emptyDrawer}
      </div>
      <M.Button
        className="DrawerButton"
        disableElevation
        startIcon={<Icon.Add />}
        onClick={handleNewDeck}
        fullWidth
        variant="contained"
      >
        New Deck
      </M.Button>
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
      <EmptyState
        onClick={handleNewDeck}
        button="New Deck"
        buttonIcon={<Icon.Add />}
      >
        Select a Deck from the drawer to get started.
      </EmptyState>
  );

  /********** RENDER **********/
  return (
    <div className="App">
      <M.AppBar position="static" elevation={3}>
        <M.Toolbar>
          <div className="ThreeColumn CenterVertical">
            <div className="LeftAlign">
              <M.IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
                <Icon.Menu />
              </M.IconButton>
              <span className="TitleText">
                bCards
              </span>
            </div>
            <M.Typography className="TitleText CenterAlign" variant="h6" noWrap>
              {deck ? deck.name : "No deck loaded"}
            </M.Typography>
            <span className="AutoWidth RightAlign">
              <M.IconButton
                color="inherit"
                onClick={handleAppMenuOpen}
              >
                <Icon.MoreVert />
              </M.IconButton>
            </span>
          </div>
        </M.Toolbar>
      </M.AppBar>
      <div className="Page">
        {content}
      </div>
      <React.Fragment>
        <M.Menu
          open={appMenuOpen}
          onClose={handleAppMenuClose}
          anchorEl={appMenuAnchor}
        >
          <M.MenuItem
            onClick={handleNewDeck}
          >
            <Icon.Add className="GrayText" />
            Add Deck
          </M.MenuItem>
          <M.MenuItem
            disabled={!deck}
            onClick={handleDuplicateDeck}
          >
            <Icon.FilterNone className="GrayText" />
            Duplicate Deck
          </M.MenuItem>
          <M.MenuItem
            disabled={!deck}
            onClick={handleRenameDeck}
          >
            <Icon.Edit className="GrayText" />
            Rename Deck
          </M.MenuItem>
          <M.MenuItem
            disabled={!deck}
            onClick={handleDeleteDeck}
          >
            <Icon.Delete className="GrayText" />
            Delete Deck
          </M.MenuItem>
        </M.Menu>
        <M.Drawer anchor="left" open={drawer} onClose={handleDrawerClose}>
          {drawerContent}
        </M.Drawer>
        {newDeckDialogContent}
        {deleteDeckDialogContent}
        {duplicateDeckDialogContent}
        {renameDeckDialogContent}
      </React.Fragment>
    </div>
  );
}

export default App;

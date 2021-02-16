import React, { useState, useEffect } from 'react';
import * as Material from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import './App.css';
import EmptyState from './components/EmptyState';
import DeckView from './components/DeckView';
import { GridView } from './components/GridView';

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
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [editing, setEditing] = useState(false);


  /********** CONSTANTS **********/
  const freeView =
    deck &&
    !drawer &&
    !newDeckDialog &&
    !duplicateDeckDialog &&
    !renameDeckDialog &&
    !deleteDeckDialog;


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
  };
  const handleDuplicateDeck = () => {
    setDuplicateDeckDialog(true);
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
      setEditing(true);
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
    let tmpDeck = { ...deck };
    if (flipped) {
      tmpDeck.cards.find(c => c.id === id).back = content;
    } else {
      tmpDeck.cards.find(c => c.id === id).front = content;
    }
    writeDeck(tmpDeck);
  };
  const handleRenameDeck = () => {
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
  const handleToggleEdit = () => { setEditing(!editing); };
  const handleSwapAll = () => {
    let tmpDeck = { ...deck };
    tmpDeck.cards.forEach(card => {
      let tmpContent = card.front;
      card.front = card.back;
      card.back = tmpContent;
    });
    setDeck(tmpDeck);
  }

  /********** UI CONSTANTS **********/
  const emptyDrawer = (
    <div className="EmptyDrawer">
      <Material.Typography variant="h6">No decks found</Material.Typography>
    </div>
  );

  const deleteDeckDialogContent = (
    <Material.Dialog open={deleteDeckDialog} onClose={handleDeleteDeckDialogClose}>
      <Material.DialogTitle>Delete "{deck ? deck.name : null}"?</Material.DialogTitle>
      <Material.DialogContent>
        <Material.DialogContentText>
          This deck will be deleted forever (a really long time).
        </Material.DialogContentText>
      </Material.DialogContent>
      <Material.DialogActions>
        <Material.Button onClick={handleDeleteDeckDialogClose}>Cancel</Material.Button>
        <Material.Button color="secondary" onClick={handleDeleteDeckConfirm}>Delete</Material.Button>
      </Material.DialogActions>
    </Material.Dialog>
  );

  const newDeckDialogContent = (
    <Material.Dialog open={newDeckDialog} onClose={handleNewDeckDialogClose}>
      <form onSubmit={handleNewDeckConfirm}>
        <Material.DialogTitle>New Deck</Material.DialogTitle>
        <Material.DialogContent>
          <Material.TextField
            autoFocus
            label="Deck name"
            value={newDeckName}
            onChange={handleNewDeckNameChange} />
        </Material.DialogContent>
        <Material.DialogActions>
          <Material.Button onClick={handleNewDeckDialogClose}>Cancel</Material.Button>
          <Material.Button
            disabled={!newDeckName.trim()}
            type="submit"
          >
            Add
            </Material.Button>
        </Material.DialogActions>
      </form>
    </Material.Dialog>
  );

  const duplicateDeckDialogContent = (
    <Material.Dialog open={duplicateDeckDialog} onClose={handleDuplicateDeckDialogClose}>
      <form onSubmit={handleDuplicateDeckConfirm}>
        <Material.DialogTitle>Duplicate "{deck ? deck.name : null}"</Material.DialogTitle>
        <Material.DialogContent className="DialogGrid">
          <Material.TextField
            autoFocus
            label="Deck name"
            value={newDeckName}
            onChange={handleNewDeckNameChange} />
          <Material.FormControlLabel
            control={
              <Material.Checkbox
                checked={openNewDeck}
                onChange={handleOpenNewDeckChange}
                color="primary"
              />
            }
            label={"Open " + (newDeckName ? newDeckName : "new deck")}
          />
        </Material.DialogContent>
        <Material.DialogActions>
          <Material.Button onClick={handleDuplicateDeckDialogClose}>Cancel</Material.Button>
          <Material.Button
            disabled={!newDeckName.trim()}
            type="submit"
          >
            Add
            </Material.Button>
        </Material.DialogActions>
      </form>
    </Material.Dialog>
  );

  const renameDeckDialogContent = (
    <Material.Dialog open={renameDeckDialog} onClose={handleRenameDeckDialogClose}>
      <form onSubmit={handleRenameDeckConfirm}>
        <Material.DialogTitle>Rename Deck</Material.DialogTitle>
        <Material.DialogContent>
          <Material.TextField
            autoFocus
            label="Deck name"
            value={renameDeckName}
            onChange={handleRenameDeckNameChanged} />
        </Material.DialogContent>
        <Material.DialogActions>
          <Material.Button onClick={handleRenameDeckDialogClose}>Cancel</Material.Button>
          <Material.Button
            disabled={!renameDeckName.trim() || renameDeckName === deck.name}
            type="submit"
          >
            Rename
            </Material.Button>
        </Material.DialogActions>
      </form>
    </Material.Dialog>
  );

  const drawerContent = (
    <div className="Drawer">
      <div className="DeckList">
        {allStorage() && allStorage().length > 0 ?
          <Material.List>
            {allStorage().sort((a, b) =>
              (a.modified < b.modified) ? 1 : -1).map((d) =>
                <Material.ListItem
                  key={d.id}
                  button
                  onClick={() => handleDeckSelected(d)}
                  selected={deck ? deck.id === d.id : false}
                >
                  <Material.ListItemText
                    primary={d.name}
                    secondary={formattedDate(d.modified)}
                    primaryTypographyProps={{ noWrap: true }}
                  />
                </Material.ListItem>)}
          </Material.List> :
          emptyDrawer}
      </div>
      <Material.Button
        className="DrawerButton"
        disableElevation
        startIcon={<Icon.Add />}
        onClick={handleNewDeck}
        fullWidth
        variant="contained"
      >
        New Deck
      </Material.Button>
    </div>
  );

  const emptyState = (
    <EmptyState
      onClick={handleNewDeck}
      button="New Deck"
      buttonIcon={<Icon.Add />}
    >
      Select a Deck from the drawer to get started.
    </EmptyState>
  );

  const viewContent = (
    deck ?
      <DeckView
        deck={visibleCards()}
        onFlag={handleFlagToggle}
        onFlaggedOnly={handleFlaggedOnlyToggle}
        onShuffle={handleShuffleToggle}
        flaggedOnly={flaggedOnly}
        shuffled={shuffled}
        focus={freeView}
      /> : emptyState);

  const editContent = (
    deck ?
      <GridView
        deck={deck}
        onChange={handleCardChange}
        onAddCard={handleAddCard}
        onDeleteCard={handleDeleteCard}
        onFlag={handleFlagToggle}
        onDelete={handleDeleteCard}
        onSwapAll={handleSwapAll}
        onViewCards={handleToggleEdit}
      /> : emptyState);

  const content = editing ? editContent : viewContent;

  const appMenuContent = (
    <div>
      <Material.Tooltip title="Add Deck">
        <Material.IconButton
          onClick={handleNewDeck}
        >
          <Icon.AddCircle style={{ color: "#fff" }} />
        </Material.IconButton>
      </Material.Tooltip>
      <Material.Tooltip title={editing ? "View Deck" : "Edit Deck"}>
        <Material.IconButton
          disabled={!deck}
          onClick={handleToggleEdit}
        >
          {editing ?
            <Icon.Slideshow style={{ color: "#fff" }} /> :
            <Icon.Edit style={{ color: "#fff" }} />
          }
        </Material.IconButton>
      </Material.Tooltip>
      <Material.Tooltip title="Rename Deck">
        <Material.IconButton
          disabled={!deck}
          onClick={handleRenameDeck}
        >
          <Icon.Spellcheck style={{ color: "#fff" }} />
        </Material.IconButton>
      </Material.Tooltip>
      <Material.Tooltip title="Duplicate Deck">
        <Material.IconButton
          disabled={!deck}
          onClick={handleDuplicateDeck}
        >
          <Icon.FilterNone style={{ color: "#fff" }} />
        </Material.IconButton>
      </Material.Tooltip>
      <Material.Tooltip title="Delete Deck">
        <Material.IconButton
          disabled={!deck}
          onClick={handleDeleteDeck}
          edge="end"
        >
          <Icon.Delete style={{ color: "#fff" }} />
        </Material.IconButton>
      </Material.Tooltip>
    </div>
  );

  /********** RENDER **********/
  return (
    <div className="App">
      <Material.AppBar position="sticky" elevation={3}>
        <Material.Toolbar>
          <div style={{
            display: "flex",
            width: "100%",
            alignItems: "center"
          }}>
            <div className="EvenFlex">
              <span>
                <div
                  className="LeftAlign"
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Material.IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
                    <Icon.Menu />
                  </Material.IconButton>
                  <span className="TitleText">
                    bCards
                  </span>
                </div>
              </span>
            </div>
            <div className="EvenFlex">
              <span>
                <Material.Typography className="TitleText CenteredFlex" variant="h6" noWrap>
                  {deck ? deck.name : "No deck loaded"}
                </Material.Typography>
              </span>
            </div>
            <div className="EvenFlex">
              <span className="AutoWidth RightAlign">
                {appMenuContent}
              </span>
            </div>
          </div>
        </Material.Toolbar>
      </Material.AppBar>
      <div className="Page">
        {content}
      </div>
      <React.Fragment>
        <Material.Drawer anchor="left" open={drawer} onClose={handleDrawerClose}>
          {drawerContent}
        </Material.Drawer>
        {newDeckDialogContent}
        {deleteDeckDialogContent}
        {duplicateDeckDialogContent}
        {renameDeckDialogContent}
      </React.Fragment>
    </div>
  );
}

export default App;

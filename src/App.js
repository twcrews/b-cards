import React, { useState } from 'react';
import * as Material from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import './App.css';
import DeckView from './components/DeckView';
import GridView from './components/GridView';
import DashView from './components/DashView';


function App() {
  /********** STATES **********/
  const [deck, setDeck] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [duplicateDeckDialog, setDuplicateDeckDialog] = useState(false);
  const [deleteDeckDialog, setDeleteDeckDialog] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [openNewDeck, setOpenNewDeck] = useState(false);
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [editing, setEditing] = useState(false);
  const [appMenu, setAppMenu] = useState(false);
  const [appMenuAnchor, setAppMenuAnchor] = useState(null);


  /********** CONSTANTS **********/
  const freeView =
    deck &&
    !drawer &&
    !duplicateDeckDialog &&
    !deleteDeckDialog;


  /********** FUNCTIONS **********/
  const uuid = () => {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
      .replace(/x/g, function (c) {
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

  const addDeck = () => {
    var newId = uuid();
    var newObj = {
      name: newId,
      content: {
        id: newId,
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
    localStorage.setItem(newId, JSON.stringify(newObj.content));
    handleDeckSelected(newObj.content);
    setAppMenu(false);
  };

  const visibleCards = () => {
    if (deck) {
      let visibleDeck = { ...deck }
      if (flaggedOnly) {
        visibleDeck.cards = deck.cards.filter(c =>
          c.flagged);
      }
      if (shuffled) {
        let cards = [...visibleDeck.cards];
        visibleDeck.cards = shuffle(cards);
      }
      return visibleDeck;
    } else {
      return null;
    }
  };

  /********** EVENT HANDLERS **********/
  const handleDrawerOpen = () => { setDrawer(true); };
  const handleDrawerClose = () => { setDrawer(false); };
  const handleDuplicateDeck = () => {
    setDuplicateDeckDialog(true);
    setAppMenu(false);
  };
  const handleDuplicateDeckDialogClose = () => { setDuplicateDeckDialog(false); };
  const handleNewDeckNameChange = (event) => {
    var text = event.target.value;
    text = text.substr(0, 20);
    setNewDeckName(text);
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
    setEditing(true);
    setFlaggedOnly(false);
    setShuffled(false);
    setDrawer(false);
    setDeck(JSON.parse(localStorage.getItem(deck.id)));
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
  const handleRenameDeck = (name) => {
    let tmpDeck = { ...deck };
    tmpDeck.name = name.substr(0, 20);
    writeDeck(tmpDeck);
  }
  const handleDeleteDeck = () => {
    setDeleteDeckDialog(true);
    setAppMenu(false);
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
  const handleToggleEdit = () => { 
    setEditing(!editing);
    setAppMenu(false); 
  };
  const handleSwapAll = () => {
    let tmpDeck = { ...deck };
    tmpDeck.cards.forEach(card => {
      let tmpContent = card.front;
      card.front = card.back;
      card.back = tmpContent;
    });
    writeDeck(tmpDeck);
  };
  const handleAppMenuOpen = (event) => {
    setAppMenuAnchor(event.currentTarget);
    setAppMenu(true);
  };
  const handleAppMenuClose = () => { setAppMenu(false); };
  const handleHome = () => { setDeck(null); };

  /********** UI CONSTANTS **********/
  const emptyDrawer = (
    <div className="EmptyDrawer">
      <Material.Typography variant="h6">No decks found</Material.Typography>
    </div>
  );

  const deleteDeckDialogContent = (
    <Material.Dialog open={deleteDeckDialog} onClose={handleDeleteDeckDialogClose}>
      <Material.DialogTitle>
        Delete "{deck ? deck.name || "Untitled" : null}"?
      </Material.DialogTitle>
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

  const duplicateDeckDialogContent = (
    <Material.Dialog open={duplicateDeckDialog} onClose={handleDuplicateDeckDialogClose}>
      <form onSubmit={handleDuplicateDeckConfirm}>
        <Material.DialogTitle>
          Duplicate "{deck ? deck.name || "Untitled" : null}"
        </Material.DialogTitle>
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

  const drawerData = () => {
    let stg = allStorage();
    if (stg && stg.length > 0) {
      return (
        <Material.List>
          {stg.sort((a, b) =>
            (a.modified < b.modified) ? 1 : -1).map((d) =>
              <Material.ListItem
                key={d.id}
                button
                onClick={() => handleDeckSelected(d)}
                selected={deck ? deck.id === d.id : false}
              >
                <Material.ListItemText
                  primary={d.name || "Untitled"}
                  secondary={formattedDate(d.modified)}
                  primaryTypographyProps={{ noWrap: true }}
                />
              </Material.ListItem>)}
        </Material.List>);
    } else {
      return emptyDrawer;
    }
  }

  const drawerContent = (
    <div className="Drawer">
      <div className="DeckList">
        {drawerData()}
      </div>
      <Material.Button
        className="DrawerButton"
        disableElevation
        startIcon={<Icon.Add />}
        onClick={addDeck}
        fullWidth
        variant="contained"
      >
        New Deck
      </Material.Button>
    </div>
  );

  const emptyState = (
    <div className="EmptyState">
      <Icon.Search style={{ fontSize: 200 }} />
      <Material.Typography
        variant="h6"
      >
        You don't have any decks yet.
      </Material.Typography>
      <Material.Button
        variant="contained"
        onClick={addDeck}
        color="primary"
        size="large"
        startIcon={<Icon.Add />}
      >
        New Deck
      </Material.Button>
    </div>
  );

  const viewContent = (
    <DeckView
      deck={visibleCards()}
      onFlag={handleFlagToggle}
      onFlaggedOnly={handleFlaggedOnlyToggle}
      onShuffle={handleShuffleToggle}
      flaggedOnly={flaggedOnly}
      shuffled={shuffled}
      focus={freeView}
    />);

  const editContent = (
    <GridView
      deck={deck}
      onChange={handleCardChange}
      onAddCard={handleAddCard}
      onDeleteCard={handleDeleteCard}
      onFlag={handleFlagToggle}
      onDelete={handleDeleteCard}
      onSwapAll={handleSwapAll}
      onViewCards={handleToggleEdit}
      onRenameDeck={handleRenameDeck}
    />);

  const content = deck ?
    editing ? editContent : viewContent :
    allStorage() && allStorage().length > 0 ?
      (<DashView
        decks={allStorage()}
        onSelect={handleDeckSelected}
        onNewDeck={addDeck}
      />) : emptyState;

  const appActionsContent = (
    <div>
      <Material.Tooltip title="Add deck">
        <Material.IconButton
          onClick={addDeck}
        >
          <Icon.AddCircle style={{ color: "#fff" }} />
        </Material.IconButton>
      </Material.Tooltip>
      <Material.Tooltip title={editing ? "View deck" : "Edit deck"}>
        <Material.IconButton
          disabled={!deck}
          onClick={handleToggleEdit}
        >
          {editing ?
            <Icon.Slideshow style={{
              color: "#fff",
              opacity: deck ? 1 : 0.5
            }} /> :
            <Icon.Edit style={{
              color: "#fff",
              opacity: deck ? 1 : 0.5
            }} />
          }
        </Material.IconButton>
      </Material.Tooltip>
      <Material.Tooltip title="Duplicate deck">
        <Material.IconButton
          disabled={!deck}
          onClick={handleDuplicateDeck}
        >
          <Icon.FilterNone style={{
            color: "#fff",
            opacity: deck ? 1 : 0.5
          }} />
        </Material.IconButton>
      </Material.Tooltip>
      <Material.Tooltip title="Delete deck">
        <Material.IconButton
          disabled={!deck}
          onClick={handleDeleteDeck}
          edge="end"
        >
          <Icon.Delete style={{
            color: "#fff",
            opacity: deck ? 1 : 0.5
          }} />
        </Material.IconButton>
      </Material.Tooltip>
    </div>
  );

  const appMenuContent = (
    <Material.Menu
      open={appMenu}
      onClose={handleAppMenuClose}
      anchorEl={appMenuAnchor}
    >
      <Material.MenuItem
        onClick={addDeck}
      >
        <Icon.Add className="GrayText" />
    Add deck
    </Material.MenuItem>
      <Material.MenuItem
        disabled={!deck}
        onClick={handleToggleEdit}
      >
        {editing ?
          <Icon.Slideshow className="GrayText" /> :
          <Icon.Edit className="GrayText" />
        }
        {editing ? "View deck" : "Edit deck"}
      </Material.MenuItem>
      <Material.MenuItem
        disabled={!deck}
        onClick={handleDuplicateDeck}
      >
        <Icon.FilterNone className="GrayText" />
      Duplicate deck
    </Material.MenuItem>
      <Material.MenuItem
        disabled={!deck}
        onClick={handleDeleteDeck}
      >
        <Icon.Delete className="GrayText" />
      Delete deck
    </Material.MenuItem>
    </Material.Menu>
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
                  <Material.Tooltip title="View decks">
                    <Material.IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
                      <Icon.Menu />
                    </Material.IconButton>
                  </Material.Tooltip>
                  <svg
                    id="header-logo"
                    data-name="header-logo"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 909.4 688.25"
                    height="40"
                    width="40"
                    style={{ cursor: "pointer" }}
                    onClick={handleHome}
                  >
                    <path
                      style={{ fill: "#fff" }}
                      d="M44.82,165.12H154.75V396.39c12.48-8.72,53.51-56.91,
                        156.09-56.91,100.43,0,169.25,72.32,169.25,72.32l-45.38,
                        78.65S398.57,449.36,362,439.81c-61.18-16-128.14,3.52-170.91,
                        49.25-42,44.88-49.6,97.87-29.4,160.62,19.6,60.9,74.94,90,
                        140.11,93.27,68.67,3.41,153.1-53,154-163.6C457,437.72,592,
                        322.18,733.56,335.41,843.48,343,919.35,400.65,953.11,
                        493.52a25,25,0,0,1,.95,3.23c-39.13,
                        0-113.67-.29-113.67-.29s-55.6-97.92-172.26-60.59C610.06,
                        454.45,566.22,509.24,566.22,575c0,66.47-10.25,102.51-37.5,
                        149-58.11,99.15-163.57,136-244.39,128.45C150,839.79,67.9,
                        736.2,49.8,645.27c-3-15.17-5-60.47-5-74.3Z"
                      transform="translate(-44.82 -165.12)"
                    />
                    <path
                      style={{ fill: "#fff" }}
                      d="M593.87,684.29c11,10.31,57.78,69.22,129.09,69,74.66-.2,
                        116.34-63.12,116.34-63.12s80.33-.44,114.84.14c2.31,0-50.27,
                        163-232.29,163-121.29,0-186-86.08-186-86.08S592.89,685.89,
                        593.87,684.29Z"
                      transform="translate(-44.82 -165.12)"
                    />
                  </svg>
                </div>
              </span>
            </div>
            <div className="EvenFlex">
              <span>
                <Material.Typography className="TitleText CenteredFlex" variant="h6" noWrap>
                  {deck ? deck.name || "Untitled" : null}
                </Material.Typography>
              </span>
            </div>
            <div className="EvenFlex">
              <span className="AutoWidth RightAlign">
                <span id="app-actions">
                  {appActionsContent}
                </span>
                <span>
                  <Material.IconButton
                    id="app-menu"
                    onClick={handleAppMenuOpen}
                    edge="end"
                  >
                    <Icon.MoreVert style={{ color: "#fff" }} />
                  </Material.IconButton>
                </span>
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
        {deleteDeckDialogContent}
        {duplicateDeckDialogContent}
        {appMenuContent}
      </React.Fragment>
    </div>
  );
}

export default App;

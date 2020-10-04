import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './App.css';

function App() {
  const [deck, setDeck] = useState(null);
  const [deckList, setDeckList] = useState(null);
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
      storage.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    return storage;
  };

  const formattedDate = () => {
    return (new Date()).toLocaleString(
      [], {
        month: 'numeric', 
        day: 'numeric', 
        year: 'numeric', 
        hour: '2-digit', 
        minute:'2-digit'});
  }

  useEffect(() => {
    setDeckList(allStorage());
  }, []);

  const writeDeck = (newDeck) => {
    setDeck(newDeck);
    localStorage.setItem(newDeck.id, JSON.stringify(newDeck));
  };

  const toggleDrawer = (open) => (event) => { setDrawer(open); };
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
      deckList.push(newDeck);
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
        created: formattedDate(),
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
    deckList.push(newObj.content);
    handleDeckSelected(newObj.content);
  };
  const handleDeckSelected = (deck) => {
    setDrawer(false);
    setDeck(JSON.parse(localStorage.getItem(deck.id)));
  };
  const handleCardChange = (content, editor, selected, flipped) => {
    var tmpDeck = { ...deck };
    if (flipped) {
      tmpDeck.cards[selected].back = content;
    } else {
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
    var tmpArr = [...deckList];
    tmpArr.splice(deckList.indexOf(deck), 1);
    setDeckList(tmpArr);
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
              label="Open new deck"
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
        {deckList && deckList.length > 0 ?
          <List>
            {deckList.map((deck) =>
              <ListItem
                key={deck.id}
                button
                onClick={() => handleDeckSelected(deck)}
              >
                <ListItemText
                  primary={deck.name}
                  secondary={deck.created}
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
        {"\xa0\xa0—\xa0\xa0" + (deck ? deck.name : "No deck loaded")}
      </Typography>
    </div>
  );

  const content = (
    deck ?
      <DeckView
        deck={deck}
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
            onClick={handleAppMenuOpen}
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
          onClose={handleAppMenuClose}
          anchorEl={appMenuAnchor}
        >
          <MenuItem
            onClick={handleNewDeck}
          >
            <AddIcon className="GrayText" />
            Add Deck
          </MenuItem>
          <MenuItem
            disabled={!deck}
            onClick={handleDuplicateDeck}
          >
            <FilterNoneIcon className="GrayText" />
            Duplicate Deck
          </MenuItem>
          <MenuItem
            disabled={!deck}
            onClick={handleDeleteDeck}
          >
            <DeleteIcon className="GrayText" />
            Delete Deck
          </MenuItem>
        </Menu>
        <Drawer anchor="left" open={drawer} onClose={toggleDrawer(false)}>
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

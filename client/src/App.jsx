import './App.css';
import LogReg from './views/LogReg';
import { Router } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './views/Main';
import NewGame from './views/NewGame';
import Games from './views/Games'
import AddPlayers from './views/AddPlayers';
import User from './views/User';
import Players from './views/Players';
import EditUser from './views/EditUser';
import Game from './views/Game'
import Chat from './components/Chat'
import ChatNoSocket from './components/ChatNoSocket';
import MyMessages from './views/MyMessages.jsx';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

function App() {
  return (
  <div className="App">
      <Router>
        <LogReg path="/" />
        <Chat path='/chat/:id' />
        <Main path='/dashboard'/>
        <NewGame path='/newgame'/>
        <Games path='/games'/>
        <AddPlayers path='/addptog/:gameId'/>
        <User path='/user/:id' />
        <Players path='/users' />
        <EditUser path='/user/update/:id' />
        <Game path='/game/:gameId'/>
        <ChatNoSocket path='/message/:id' />
        <MyMessages path='/mymessages/:id' />
      </Router>
    </div>
      );
}

export default App;

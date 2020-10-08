import React from 'react';
import './App.css';
import Header from "./Components/Header"
import Sidebar from './Components/Sidebar'
import Feed from './Components/Feed'
import Widget from './Components/Widget'
import Login from './Components/Login'
import {userStateValue, useStateValue} from './StateProvider'

function App() {
  const [{ user }, dispatch] = useStateValue()
  
  return (
    <div className="App">
      {
        user ? (
          <>
            <Header />

            <div className="app__body">
              <Sidebar />
              <Feed />
              <Widget />
            </div>
          </>
        ) : (
            <Login />
          )
      }

    </div>
  );
}

export default App;
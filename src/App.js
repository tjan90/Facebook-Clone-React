import React from 'react';
import './App.css';
import Header from "./Components/Header"
import Sidebar from './Components/Sidebar'
import Feed from './Components/Feed'
import Widget from './Components/Widget'

function App() {
  return (
    <div className="App">
      
      <Header></Header>
      <div className='app__body'>
      <Sidebar/>
      <Feed />
      <Widget />
      </div>
    </div>
  );
}

export default App;

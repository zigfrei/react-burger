import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import { render } from '@testing-library/react';
import AppHeader from './components/AppHeader/appHeader.js'


class App extends React.Component {
  render(){
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="App">
  <AppHeader />
    </div>
  );
  }
}

export default App;

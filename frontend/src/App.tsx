import React from 'react';
import logo from './logo.svg';
import './App.scss';
import '@utils/i18n';
import Header from '@components/Header';
import Body from '@components/Body'
import { MyStocks } from '@pages/MyStocks';
import { Store } from "redux";
import { Provider } from "react-redux";
import { History } from "history";

function App() {

  return (
      <div className="App">
        <Header />
        <Body />
      </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.scss';
import '@utils/i18n';
import { useTranslation } from 'react-i18next';
import Header from '@components/Header';
import Body from '@components/Body'
import { MyStocks } from '@pages/MyStocks';
import { Store } from "redux";
import { Provider } from "react-redux";
import { History } from "history";

function App() {
  const [ t, i18n ] = useTranslation(['translation']);

  return (
      <div className="App">
        <Header />
        <Body />
      </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.scss';
import '@utils/i18n';
import { useTranslation } from 'react-i18next';
import Header from '@components/Header';
import { MyStocks } from '@pages/MyStocks';
import { Store } from "redux";
import { Provider } from "react-redux";
import { History } from "history";

function App() {
  const [ t, i18n ] = useTranslation(['translation']);

  return (
      <div className="App">
        <Header />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {t('title')}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}

export default App;

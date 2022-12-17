import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Messages from '@/locales/zh-CN.json';
import './app.less';

const App = () => {
  return (
    <IntlProvider messages={Messages} locale="zh-CN" defaultLocale="en-US">
      <h1>Webpack5 for React in Typescript</h1>
      <BrowserRouter>
        <nav>
          <Link to="/about">View About</Link>
        </nav>
        <Routes>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/" element={<Navigate replace to="/home" />}></Route>
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app-root'));

import React from 'react'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import { Layout,Typography,Space } from 'antd';
import Navbar from './components/Navbar';
import './App.css';
import Homepage from './components/Homepage';
import Exchanges from './components/Exchanges';
import Cryptocurrencies from './components/Cryptocurrencies';
import CryptoDetails from './components/CryptoDetails';
import News from './components/News';

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
         <Navbar />
      </div>
      <div className='main'>
      <BrowserRouter>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path='/'element={<Homepage />}>
              </Route>
              <Route path='/exchanges' element={<Exchanges />}> 
              </Route>
              <Route path='/cryptocurrencies' element={<Cryptocurrencies />}>
              </Route>
              <Route  path='/crypto/:coinId' element={<CryptoDetails />}>
              </Route>
              <Route  path='/news' element={<News />}>
              </Route>
            </Routes>
          </div>
        </Layout>
      </BrowserRouter>
      <div className="footer">
        <BrowserRouter>
      <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2021
          Cryptoverse Inc.
          <br />
          All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </Space>
        </BrowserRouter>
      </div>
      </div>
      </div>
  )
}

export default App

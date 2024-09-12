import React from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import { BrowserRouter } from 'react-router-dom';

const Navbar = () => {
  return (
    <BrowserRouter>
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src="https://th.bing.com/th/id/OIP.hmLglIuAaL31MXNFuTGBgAHaHa?w=179&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" size="large"/>
        <Typography.Title level={2} className='logo'>
            <Link to="/">Cryptoverse</Link>
        </Typography.Title>
      </div>
      <Menu theme="dark">
            <Menu.Item icon={<HomeOutlined />}>
               <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />}>
               <Link to="/cryptocurrencies">cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined />}>
               <Link to="/exchanges">Exchanges</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />}>
               <Link to="/news">News</Link>
            </Menu.Item>
      </Menu>
    </div>
    </BrowserRouter>
  )
}

export default Navbar

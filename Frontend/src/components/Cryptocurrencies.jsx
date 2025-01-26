import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Button } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
/* import Loader from './Loader'; */


const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  const handleAddToDB = async(currency) => {
    try {
      const response = await fetch('http://47.128.245.3:5000/api/currencies', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          uuid: currency.uuid,
          name: currency.name,
          price: currency.price,
          marketCap: currency.marketCap,
        }),
      });
      if(!response.ok) throw new Error('Failed to add cryptocurrency!');
      console.log('Adding to DB: ', currency.name);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteFromDB = async(currency) => {
    try {
      const response = await fetch(`http://47.128.245.3:5000/api/currencies/${currency.uuid}`, {
        method: 'DELETE',
      });
      if(!response.ok) throw new Error('Failed to delete cryptocurrency');
      console.log('Deleting from DB: ', currency.name);
    } catch (error) {
      console.error(error);
    }
  };

  if (isFetching) return 'Loading...';

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >

            {/* Note: Change currency.id to currency.uuid  */}
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToDB(currency);
                  }}
                >Add to DB</Button>
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteFromDB(currency);
                  }}
                  style={{marginLeft: '10px'}}
                >Delete from DB</Button>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;

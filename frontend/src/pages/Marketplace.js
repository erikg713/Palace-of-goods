import React from 'react';

const Marketplace = () => (
  <div>
    <h1>Marketplace</h1>
    <p>Browse and purchase exclusive Web3 items!</p>
  </div>
);

export default Marketplace;
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const products = [
  { id: 1, name: "Digital Artwork", description: "Exclusive Web3 Art", price: "0.5 ETH" },
  { id: 2, name: "NFT Collectible", description: "Limited Edition NFT", price: "1 ETH" },
  { id: 3, name: "Web3 Token", description: "Buy and sell tokens", price: "0.2 ETH" },
];

const Marketplace = () => (
  <div className="container mt-5">
    <div className="row">
      {products.map(product => (
        <div className="col-md-4 mb-4" key={product.id}>
          <Card>
            <Card.Img variant="top" src={`https://via.placeholder.com/300?text=${product.name}`} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text><strong>{product.price}</strong></Card.Text>
              <Button variant="primary">Buy Now</Button>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Available</small>
            </Card.Footer>
          </Card>
        </div>
      ))}
    </div>
  </div>
);

export default Marketplace;

import { useEffect, useState } from 'react';
import { PiNetwork } from 'pi-sdk';

const pi = new PiNetwork();

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handle


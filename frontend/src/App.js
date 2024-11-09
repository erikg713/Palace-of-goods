import React, { lazy, Suspense } from 'react';
import PaymentComponent from './components/PaymentComponent';

// Lazy load the ProductList component
const ProductList = lazy(() => import('./components/ProductList'));

function App() {
  return (
    <div className="App">
      <h1>Welcome to Palace of Goods</h1>

      {/* Payment Component */}
      <PaymentComponent />

      {/* Wrap the lazy-loaded component with Suspense */}
      <Suspense fallback={<div>Loading Products...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}

export default App;

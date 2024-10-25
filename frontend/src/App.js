import React, { lazy, Suspense } from 'react';

// Lazy load a component, like the product list
const ProductList = lazy(() => import('./components/ProductList'));

function App() {
  return (
    <div className="App">
      <h1>Welcome to Palace of Goods</h1>
      
      {/* Wrap the lazy-loaded component with Suspense */}
      <Suspense fallback={<div>Loading Products...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}

export default App;
Python
header = {
    'Authorization': "Key YOUR-API-KEY"
}

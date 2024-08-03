import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import routes from './routes';
import ProductList from './components/ProductList';

function App() {
  const isLoading = useSelector(state => state.auth.loading);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          {routes.map((route) => 
            route.private ? (
              <Route key={route.path} element={<PrivateRoute />}>
                <Route path={route.path} element={route.element} />
              </Route>
            ) : (
              <Route key={route.path} path={route.path} element={route.element} />
            )
          )}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

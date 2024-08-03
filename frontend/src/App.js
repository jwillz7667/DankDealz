import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import routes from './routes';
import HomeScreen from './components/HomeScreen';

function App() {
  const isLoading = useSelector(state => state.auth.loading);

  useEffect(() => {
    console.log('App component mounted');
  }, []);

  if (isLoading) {
    console.log('App is loading');
    return <Loading />;
  }

  console.log('Rendering App component');

  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          {routes.map((route) => {
            console.log('Rendering route:', route.path);
            return route.private ? (
              <Route key={route.path} element={<PrivateRoute />}>
                <Route path={route.path} element={route.element} />
              </Route>
            ) : (
              <Route key={route.path} path={route.path} element={route.element} />
            );
          })}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { useAuth } from './contexts/AuthContext';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';
import routes from './routes';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Navbar />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.private ? (
                    <PrivateRoute>{route.element}</PrivateRoute>
                  ) : (
                    route.element
                  )
                }
              />
            ))}
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;

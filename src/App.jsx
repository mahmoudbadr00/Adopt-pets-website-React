import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Search from './search';
import Details from './details';
import AdoptedPetContext from './AdoptedPetContext';
// import DetailsErrorBoundary from './details';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <header>
          <Link to="/">Adopt me!</Link>
        </header>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<Search />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

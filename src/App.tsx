import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { NewPaste } from './pages/NewPaste';
import { ViewPaste } from './pages/ViewPaste';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<NewPaste />} />
            <Route path="/new" element={<NewPaste />} />
            <Route path="/paste/:id" element={<ViewPaste />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
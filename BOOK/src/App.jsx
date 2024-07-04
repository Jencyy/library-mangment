import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/home/Home';
import EditBook from './components/editbook/EditBoook';
import CreateBoook from './components/createbook/CreateBoook';
import Header from './components/header/Heeader';
const App = () => (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateBoook />} />
            <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
    </>
);

export default App;

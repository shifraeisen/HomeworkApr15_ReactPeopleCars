import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import AddPerson from './Pages/AddPerson';
import AddCar from './Pages/AddCar';
import DeleteCars from './Pages/DeleteCars';

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/addperson' element={<AddPerson />} />
                <Route path='/addcar/:id' element={<AddCar />} />
                <Route path='/deletecars/:id' element={<DeleteCars />} />
            </Routes>
        </Layout>
    );
}

export default App;
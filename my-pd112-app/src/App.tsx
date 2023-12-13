import React from 'react';
import DefaultLayout from "./components/containers/default/DefaultLayout.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/home/HomePage.tsx";

const App: React.FC = () => {


    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<HomePage />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;

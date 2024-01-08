import React from 'react';
import DefaultLayout from "./components/containers/default/DefaultLayout.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/home/HomePage.tsx";
import CategoryCreatePage from "./components/categories/create/CategoryCreatePage.tsx";
import RegisterPage from "./components/auth/register/RegisterPage.tsx";

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path={"categories/create"} element={<CategoryCreatePage />} />
                    <Route path={"register"} element={<RegisterPage/>} />
                </Route>
            </Routes>
        </>
    );
};

export default App;

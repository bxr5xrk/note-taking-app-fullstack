import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { routes } from "./router";

function App() {
    return (
        <Layout>
            <Routes>
                {routes.map((i) => (
                    <Route key={i.path} path={i.path} element={i.element} />
                ))}
            </Routes>
        </Layout>
    );
}

export default App;

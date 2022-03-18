import React from "react";
import { BrowserRouter, Route, Routes as DomRoutes } from "react-router-dom";
import { Header } from "./components/header";

import { Schedule } from "./pages/schedule";
import { Home } from "./pages/home/";

export default function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <DomRoutes>
        <Route path="/" element={<Home />} exact />
        <Route path="/schedule" element={<Schedule />} />
      </DomRoutes>
    </BrowserRouter>
  );
}

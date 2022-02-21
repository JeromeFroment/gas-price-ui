import React from "react";
import { MapAccess } from "../../page/mapAccess/MapAccess";
import NotFound from "../notFound/NotFound";
import Navbar from "../navbar/Navbar";
import { StatisticsAccess } from "../../page/statisticsAccess/StatisticsAccess";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

export default function RouterFunction() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/map"/>} />
        <Route path="/map" element={<MapAccess />} />
        <Route path="/stateMap" element={<StatisticsAccess />} />
        <Route path="/regionMap" element={<StatisticsAccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

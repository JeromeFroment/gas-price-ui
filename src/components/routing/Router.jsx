import React from "react";
import { MapAccess } from "../../page/mapAccess/MapAccess";
import NotFound from "../notFound/NotFound";
import { StatisticsAccess } from "../../page/statisticsAccess/StatisticsAccess";
import { ListAccess } from "../../page/listAccess/ListAccess";
import { LoginAccess } from "../../page/loginAccess/LoginAccess";
import Navbar from "../navbar/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


export default function RouterFunction(props) {
 
  return (
    <BrowserRouter>
      <Navbar theme={props.theme} switchTheme={props.switchTheme}/>
      <Routes>
        <Route path="/" element={<Navigate to="/map"/>} />
        <Route path="/login" element={<LoginAccess />} />
        <Route path="/map" element={<MapAccess />} />
        <Route path="/stateMap" element={<StatisticsAccess />} />
        <Route path="/regionMap" element={<StatisticsAccess />} />
        <Route path="/listStations" element={<ListAccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

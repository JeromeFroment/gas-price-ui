import React, {useRef, useEffect, useState} from "react";
import {select, geoPath,geoConicConformal } from "d3";
import france from "../../d3js/region.json";
import {
   useLocation,
   useNavigate
 } from "react-router-dom";
import { Back } from "../back/Back";
import { DisplayName } from "../displayName/DisplayName";
import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import "./StateMap.css";
import { depStatisticsService } from "../../service/depStatistics.service";
import { regionStatisticsService } from "../../service/regionStatistics.service";
import Location from "../location/Location";
import { nationalStatisticsService } from "../../service/nationalStatistics.service";

function StateMap(){
   
   const svgRef = useRef();
   const wrapperRef = useRef();
   let navigate = useNavigate();
   let location = useLocation();   
   const regionFolder = require.context('../../d3js/RegionsMap',true); 
   let data = location.pathname === '/stateMap' ? france : regionFolder(`./${location.state.regionName}.json`);

   const [textNameTooltipDep, setTextNameTooltipDep] = useState("");   
   const [textNameTooltipReg, setTextNameTooltipReg] = useState("");   
   const [gasPricesDep, setGasPricesDep] = useState([]);
   const [gasPricesReg, setGasPricesReg] = useState([]);
   const [setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(true);
   const [localisation, setLocalisation] = useState([0,0]);
   const [nationalStat, setNationalStat] = useState([]);
    

   const changeLocation = (coordinates) => {
      setLocalisation(coordinates);
   }


   const callBack = (jsonResponse) => {
      jsonResponse.map((stats) => {
         setNationalStat(stats.prices.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        }));
      })
      
   }

   useEffect(() => {
      depStatisticsService.getAllDepartmentStats();
      regionStatisticsService.getAllRegionStats();
      nationalStatisticsService.getNationalStats(callBack);

      const svg = select(svgRef.current);

      if(location.pathname === '/stateMap'){
         svg.selectAll("g").remove()
      }

      const projection = geoConicConformal()
      .fitSize([400,400],data)

      const pathGenerator = geoPath().projection(projection);

      svg.selectAll("path")
         .data(data.features)
         .join("path")
         .attr("class", "region")
         .attr("d", feature => pathGenerator(feature))
         .on("click", function(d) {
            if(location.pathname === '/stateMap'){
               setTextNameTooltipDep("");
               svg.selectAll("g").remove();
               navigate('/regionMap', {
                  state: {regionName : d.target.__data__.properties.nom}
               });
            }
            else if(location.pathname === '/regionMap'){
               
             /*  navigate('/departement', {
                  state: {libelle : d.target.__data__.properties.nom}
               }); */
            }
            

            
         })
         .on("mouseover", function(d) {
            if( location.pathname === '/stateMap'){
               try {
                  setTextNameTooltipReg(`R??gion : ${d.target.__data__.properties.nom}`);
                  const regionStats = regionStatisticsService.regionLastDataLoader(d.target.__data__.properties.code);
                  setGasPricesReg(regionStats.prices.sort(function(a, b){
                     if(a.name < b.name) { return -1; }
                     if(a.name > b.name) { return 1; }
                     return 0;
                 }));
               } catch (e) {
                  console.log(e);
               }
            } else if ( location.pathname === '/regionMap') {
               try {
                  setTextNameTooltipDep(`D??partement : ${d.target.__data__.properties.nom} - ${d.target.__data__.properties.code}`);
                  const depStats = depStatisticsService.departLastDataLoader(d.target.__data__.properties.code);
                  setGasPricesDep(depStats.prices.sort(function(a, b){
                     if(a.name < b.name) { return -1; }
                     if(a.name > b.name) { return 1; }
                     return 0;
                 }));

               } catch(e) {
                  console.log(e);
               }
              
            }            
        })
        .on("mouseout", function(d) {
            setTextNameTooltipDep(""); 
            setGasPricesDep([]);
        });

        if(localisation !== undefined && localisation!== null){
            svg.selectAll("g")
            .data(data.features)
            .enter()
               .append("g")
               .style("fill","red")
               .attr("transform", function(d) { return "translate(" + projection([localisation[1],localisation[0]]) + ")"; })
               .append("circle") 
               .attr("r", 5)
        }
   } , [navigate,data,location,localisation]);


   if (isLoaded) {
      return (
         <div>
            <Row>
               <Col >
                  <DisplayName />
                  <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
                     <svg ref={svgRef}>
                        <g></g>
                     </svg>
                  </div>
               </Col>
               <Col xs={12} lg={5}>
                  {location.pathname ==='/stateMap' ?
                  <Row>
                     <h3 className ="text-center">Moyenne nationale</h3>
                     <Table striped bordered hover>
                        <thead>
                           <tr>
                              <th>Carburant</th>
                              <th>Prix moyen</th>
                           </tr>
                        </thead>                     
                        <tbody>
                           {nationalStat.map(price => (
                              <tr key={price.name}>
                                 <td>{price.name}</td> 
                                 <td>{Number((price.value).toFixed(3))} euros</td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </Row>
                  :
                  <></>
                  }
                  <Row>
                     <h3 className ="text-center">{textNameTooltipReg}</h3>
                     <Table striped bordered hover>
                        <thead>
                           <tr>
                              <th>Carburant</th>
                              <th>Prix moyen</th>
                           </tr>
                        </thead>                     
                        <tbody>
                           {gasPricesReg.map(price => (
                              <tr key={price.name}>
                                 <td>{price.name}</td> 
                                 <td>{Number((price.value).toFixed(3))} euros</td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </Row>
                  {location.pathname ==='/regionMap' ?
                  <>
                  <Row>
                     <h3 className ="text-center">{textNameTooltipDep}</h3>
                     <Table striped bordered hover>
                        <thead>
                           <tr>
                              <th>Carburant</th>
                              <th>Prix moyen</th>
                           </tr>
                        </thead>                     
                        <tbody>
                           {gasPricesDep.map(price => (
                              <tr key={price.name}>
                                 <td>{price.name}</td> 
                                 <td>{Number((price.value).toFixed(3))} euros</td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </Row>
                  </>
                  :
                  <></>
                  }
                  
               </Col>
            </Row>
            <Row>
               <Col xs lg={2}> {location.pathname ==='/regionMap' ? <></> : <Location onChange={changeLocation} />} </Col>
               <Col xs lg={1}>{location.pathname ==='/regionMap' ? <Back />  : <></>}</Col>
            </Row>
         </div>
      )
   } else {
      return null;
   }
}

export default StateMap;

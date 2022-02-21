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

function StateMap({localisation}){
   
   const svgRef = useRef();
   const wrapperRef = useRef();
   let navigate = useNavigate();

   const [opacity, setOpacity] = useState(0);
   const [top, setTop] = useState(-500);
   const [left, setLeft] = useState(-500);

   const [textNameTooltip, setTextNameTooltip] = useState("");   
   const [gasPrices, setGasPrices] = useState([]);
   const [setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(true);
    
    const callBack = (jsonResponse) => {
        setIsLoaded(true);
    }

    const errorCallBack = (error) => {
        setIsLoaded(true);
        setError(error);
    }


   let styleTooltip = {
        container: {
            opacity: opacity,
            top: top,
            left: left
        }
   }
   

   let location = useLocation();   
   const regionFolder = require.context('../../d3js/RegionsMap',true); 
   let data = location.pathname === '/stateMap' ? france : regionFolder(`./${location.state.regionName}.json`); 

   useEffect(() => {
      depStatisticsService.getAllDepartmentStats(callBack, errorCallBack)

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
         .attr("class","region")
         .attr("d", feature => pathGenerator(feature))
         .on("click", function(d) {
            if(location.pathname === '/stateMap'){
               setOpacity(0);
               setTextNameTooltip("");
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
               setTextNameTooltip(`Région : ${d.target.__data__.properties.nom}`);
            } else if ( location.pathname === '/regionMap') {
               setTextNameTooltip(`Département : ${d.target.__data__.properties.nom} - ${d.target.__data__.properties.code}`);
               const depStats = depStatisticsService.departLastDataLoader(d.target.__data__.properties.code);
               setGasPrices(depStats.prices);
            }
            setOpacity(0.9);
            var x = d.clientX;
            var y = d.clientY;
            setLeft(x+20);
            setTop(y+20);
            
        })
        .on("mouseout", function(d) {
            setOpacity(0); 
            setTextNameTooltip(""); 
            setGasPrices([]);
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
         <div className="regionMap">
            <Row>
               <Col>
                  <DisplayName />
                  <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
                     <svg ref={svgRef}>
                        <g></g>
                     </svg>
                  </div>
               </Col>
               <Col>
                  <Row>
                     <h3 className ="text-center">{textNameTooltip}</h3>
                     <Table striped bordered hover>
                        <thead>
                           <tr>
                              <th>Carburant</th>
                              <th>Prix moyen</th>
                           </tr>
                        </thead>                     
                        <tbody>
                           {gasPrices.map(price => (
                              <tr>
                                 <td>{price.name}</td> 
                                 <td>{price.value} euros</td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </Row>
               </Col>
            </Row>
            <Row>
               <div>{location.pathname ==='/regionMap' ? <Back />  : <></>}</div>
            </Row>
         </div>
      )
   } else {
      return null;
   }
}

export default StateMap;

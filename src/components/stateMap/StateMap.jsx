import React, {useRef, useEffect, useState} from "react";
import {select, geoPath,geoConicConformal } from "d3";
import france from "../../d3js/region.json";
import {
   useLocation,
   useNavigate
 } from "react-router-dom";
import { Back } from "../back/Back";
import { DisplayName } from "../displayName/DisplayName";
import { Row } from "react-bootstrap";
import "./StateMap.css";

function StateMap({localisation}){
   
   const svgRef = useRef();
   const wrapperRef = useRef();
   let navigate = useNavigate();

   const [opacity, setOpacity] = useState(0);
   const [top, setTop] = useState(-500);
   const [left, setLeft] = useState(-500);

   const [textNameTooltip, setTextNameTooltip] = useState("");   
   const [textDataTooltip, setTextDataTooltip] = useState("");



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
               setTextDataTooltip("");
               svg.selectAll("g").remove();
               navigate('/regionsMap', {
                  state: {regionName : d.target.__data__.properties.nom}
               });
            }
            else if(location.pathname === '/regionsMap'){
               navigate('/departements', {
                  state: {libelle : d.target.__data__.properties.nom}
               });
            }
            

            
         })
         .on("mouseover", function(d) {
            if( location.pathname === '/stateMap'){
               setTextNameTooltip(`Région : ${d.target.__data__.properties.nom}`);
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
            setTextDataTooltip("");
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
   } , [textDataTooltip, navigate,data,location,localisation]);


   return (
      <div className="displayName">
         <DisplayName />
         <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
            <svg ref={svgRef}>
               <g></g>
            </svg>
            <Row style={styleTooltip.container}>
               <h3>{textNameTooltip}</h3>
            </Row>
         </div>
         {location.pathname ==='/regionsMap' ? <Back />  : <></>}
      </div>
   )

}

export default StateMap;

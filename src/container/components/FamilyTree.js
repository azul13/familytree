import React, { Component } from 'react'
import * as d3 from 'd3'
import graph from './obamatree'
import './FamilyTree.css';

export default() =>  {

    var width = 1080,
        height = 720,
        ageScale = 3

    var t_text = "";

    //Define tooltip
    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height);

    //Define force that will act upon nodes on screen
    var force = d3.layout.force()
        .gravity(0.05)
        .distance(100)
        .charge(-220)
        .size([width, height]);

    const invoked3 = () => {
        const json = graph;

        force
            .nodes(json.nodes)
            .links(json.links)
            .start();

        //Create all the edges
        var link = svg.selectAll(".link")
            .data(json.links)
            .enter().append("line")
            .attr("stroke-width", function (d) { return d.value })
            .attr("stroke", function (d) { return d.color })
        
        //Create all the nodes
        var node = svg.selectAll(".node")
            .data(json.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag);

        node.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", function (d) { 
                if (d.gender === "male" || d.gender === "female") { return ((calcAge(d.birthyear, d.deathyear)/ageScale) + ageScale)}
                else { return 12}
            ;})
            .attr("stroke-width", 3)
            .attr("fill", function (d) { 
                if (d.gender === "male") { return d3.rgb(102, 153, 255)}
                else if (d.gender === "female") { return d3.rgb(255, 200, 255)}
                else { return "white"}
            ;})
            .attr("stroke", function (d) { 
                if (d.gender === "male") { return "blue"}
                else if (d.gender === "female") { return "pink"}
                else { return "black"}
            ;})
            .on("mouseover.tooltip", function(d){
                if (d.birthyear !== undefined) {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('opacity', '.75')
                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 9)
                        t_text = "<strong>" + titleCase(d.name);
                    if (d.deathyear !== undefined) {
                        t_text += "</strong><br> " + d.birthyear + " - " + d.deathyear
                    } else {
                        t_text += "</strong><br> Age: " + (calcAge(d.birthyear)) + "<br>Occupation: " + d.occupation;
                    }
                    tooltip.html(t_text)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY) + "px")
                        .style("text-align", "center");
                }
            })
            .on("mouseout.tooltip", function(d){
                if (d.birthyear !== undefined) {
                    d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1');
                    tooltip.style("opacity", 0);
                }
            })
            .on("mousemove.tooltip", function (d){
                
                if (d.birthyear !== undefined) {
                    
                    tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");

                }
            });

        //title case function used by tooltip
        function titleCase(str) {
            str = str.toLowerCase().split(' ');
            for (var i = 0; i < str.length; i++) {
                str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(' ');
        }

        //Calculate age using birthyear as parameter
        function calcAge(birthyear, deathyear) {
            var currYear = new Date().getFullYear();
            if(deathyear !== undefined){
                return (deathyear - birthyear);
            }
            return (currYear - birthyear);
        }

        node.append("text")
            .attr("dx", 0)
            .attr("dy", "2.4em")
            .attr("text-anchor","middle")
            .text(function (d) { 
                return d.name;
        });

        force.on("tick", function () {
            link.attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
        });
    };


return <div id='chart'>{invoked3()}</div>
}






path = [
    [1,1],
    [1,1],
    [1,1],
    [1,1],
    [1,1],
    [1,1],
    [1,1],
    [1,1],
    [1,1],
    [1,1],
    [1,1],
]

d3.select("#slideshow").selectAll(".action")
    .data(path)
    .enter()
    .append("div")
    .classed("action offset-2 col-8", true)
    .append("img")
    .attr("src", "images/boat.png")
    .style("animation-delay", function(d,i) {
        return i*10+2 + "s";
    })

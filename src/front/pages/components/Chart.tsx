import { Component, ReactElement } from "react"
import * as d3 from "d3"
import './../../AppStyle.css';

const margin = { top: 0, right: 0, bottom: 15, left: 40 }
const width = 815 - margin.left - margin.right
const height = 155 - margin.top - margin.bottom

interface ChartProps {
    data: [number, number][]
}

interface ChartState {}

export default class Chart extends Component<ChartProps, ChartState> {
    constructor(props: ChartProps) {
        super(props);
    }

    public drawChart(): void {       
        const data = this.props.data;

        const xScale = d3
            .scaleLinear()
            .domain(d3.extent(data, d => d[0]))
            .range([0, width]);
      
        const yScale = d3
            .scaleLinear()
            .domain([d3.min(data, co => co[1]), d3.max(data, co => co[1])])
            .range([height, 0]);
      
        const svg = d3
            .select("#elevationChart")
            .append("svg")
            .attr("width", 815)
            .attr("height", 155)
            .attr("viewBox", "0 0 " + width + " " + 160)
            .attr("preserveAspectRatio", "xMinYMid")
            .append("g")
            .attr("transform", `translate(${margin.left}, 2.5)`);
        
        svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));
        
        svg
            .append("g")
            .call(d3.axisLeft(yScale));

        const area = d3
            .area()
            .x(d => xScale(d[0]))
            .y0(yScale(yScale.domain()[0]))
            .y1(d => yScale(d[1]))
            .curve(d3.curveCatmullRom.alpha(0.005));

        svg
            .append("path")
            .attr("d", area(data))
            .attr("class", "chartLine")
            .style("stroke", "#787979")
            .style("stroke-opacity", 0.2)
            .style("stroke-width", 1)
            .style("fill", "#787979")
            .style("fill-opacity", 0.3);

        // const crossBar = svg
        //     .append("g")
        //     .attr("class", "crossBar")
        //     .style("display", "none");

        // crossBar
        //     .append("line")
        //     .attr("x1", 0)
        //     .attr("x2", 0)
        //     .attr("y1", height)
        //     .attr("y2", 0);

        // crossBar
        //     .append("text")
        //     .attr("x", 10)
        //     .attr("y", 17.5)
        //     .attr("class", "crossBarText");

        // const infoBox = svg
        //     .append("g")
        //     .attr("class", "infoBox")
        //     .style("display", "none");

        // infoBox
        //     .append("rect")
        //     .attr("x", 0)
        //     .attr("y", 10)
        //     .style("height", 45)
        //     .style("width", 125);

        // const infoBoxElevation = infoBox
        //     .append("text")
        //     .attr("x", 8)
        //     .attr("y", 30)
        //     .attr("class", "infoBoxElevation");

        // infoBoxElevation
        //     .append("tspan")
        //     .attr("class", "infoBoxElevationTitle")
        //     .text("Elev: ");

        // infoBoxElevation
        //     .append("tspan")
        //     .attr("class", "infoBoxElevationValue");

        // svg
        //     .append("rect")
        //     .attr("class", "chartOverlay")
        //     // .attr("width", width)
        //     // .attr("height", height)
        //     .on("mouseover", function() {
        //         crossBar.style("display", null)
        //         infoBox.style("display", null)
        //     })
        //     .on("mouseout", function() {
        //         crossBar.style("display", "none")
        //         infoBox.style("display", "none")
        //     })
        //     .on("mousemove", function() {
        //         const x0 = xScale.invert(d3.pointer(this)[0])
        //         const i = bisect(data, x0, 1)
        //         const d0 = data[i - 1]
        //         const d1 = data[i]
        //         const d = !d1 ? d0 : x0 - d0[0] > d1[0] - x0 ? d1 : d0
        //         crossBar.attr("transform", `translate(${xScale(d[0])}, 0)`)
        //         crossBar.select("text").text(d3.format(".1f")(d[0]) + " mi")
        //         infoBox.attr("transform", `translate(${xScale(d[0]) + 10}, 12.5)`)
        //         infoBox
        //             .select(".infoBoxElevationValue")
        //             .text(d3.format(",.0f")(d[1]) + " ft")
        //         infoBox.select(".infoBoxGradeValue").text(d3.format(".1%")(10))
        //         return null
        //     })

        //     const bisect = d3.bisector(function(d: any) {
        //         return d.x
        //     }).left
    }

    public mousemove(): any {
        return null;
    }

    public componentDidMount(): void {
        this.drawChart();
    }

    public render(): ReactElement {
        return (
            <div className="chart">
                <div id="elevationChart"></div>
            </div>
        );
    }
  }
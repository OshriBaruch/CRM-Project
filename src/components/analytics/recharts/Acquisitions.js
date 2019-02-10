import React, { Component } from 'react';
import { Pie, PieChart, Cell, Sector, ResponsiveContainer } from 'recharts';

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const option = ["Last Month", "6-12 Months", "12+ Months"]
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#82ca9d"}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={"#FFD447"}
                dataKey="value" nameKey="key"
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={"#423E37"}
                dataKey="value" nameKey="key"
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={"#82ca9d"} fill="#none" />
            <circle cx={ex} cy={ey} r={2} fill={"#82ca9d"} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${option[props.name]} ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`${(percent * 100).toFixed(2)}%`}
            </text>
        </g>
    );
};

class Acquisitions extends Component {
    constructor() {
        super();
        this.state = {}
    }
    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    }
    render() {
        let clientAcquisitions = this.props.clientAcquisitions
        let colors = ["#8884d8", "#82ca9d", "#FFD447"]
        return (
            <div className="Acquisitions">
                <div className="Acquisitions-title">Acquisitions</div>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape}
                            data={clientAcquisitions}
                            cx="50%" cy="50%"
                            dataKey={"value"}
                            outerRadius={"80%"}
                            onMouseEnter={this.onPieEnter}
                        />
                        {
                            clientAcquisitions.map((index) => <Cell dataKey="value" nameKey="key" key={index} fill={colors[index]} />)
                        }
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
export default Acquisitions
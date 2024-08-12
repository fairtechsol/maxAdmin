import { Chart } from "react-google-charts";

const PieChart = ({ data, options }: any) => {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"180px"}
      height={"120px"}
    />
  );
};
export default PieChart;

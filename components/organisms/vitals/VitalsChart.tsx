import React from "react";
import { Text, View } from "react-native";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from "victory-native";
import {
  ChartDataPoint,
  ChartPeriod,
  VitalMeasurement,
  VitalType,
} from "../../../types";

interface VitalsChartProps {
  data: ChartDataPoint[];
  period: ChartPeriod;
  type: VitalType;
}

export const VitalsChart: React.FC<VitalsChartProps> = ({
  data,
  period,
  type,
}) => {
  if (!data.length) {
    return (
      <View
        style={{ height: 200, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: "#999" }}>No data for chart</Text>
      </View>
    );
  }

  return (
    <VictoryChart
      height={200}
      theme={VictoryTheme}
      padding={{ top: 20, bottom: 40, left: 48, right: 16 }}
      domainPadding={{ x: 20, y: 20 }}
    >
      <VictoryAxis
        tickFormat={(t) => {
          if (period === "week") return t.slice(5);
          if (period === "month") return t.slice(5);
          return t.slice(0, 7);
        }}
        style={{
          tickLabels: { fontSize: 10, angle: -30, padding: 12 },
          axis: { stroke: "#e0e0e0" },
        }}
      />
      <VictoryAxis
        dependentAxis
        style={{
          tickLabels: { fontSize: 10 },
          axis: { stroke: "#e0e0e0" },
          grid: { stroke: "#e0e0e0", strokeDasharray: "4,4" },
        }}
      />
      <VictoryLine
        data={data}
        x="date"
        y="value"
        style={{
          data: { stroke: "#1976d2", strokeWidth: 2 },
        }}
        interpolation="monotoneX"
      />
      <VictoryScatter
        data={data}
        x="date"
        y="value"
        size={4}
        style={{ data: { fill: "#1976d2" } }}
      />
    </VictoryChart>
  );
};

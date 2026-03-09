import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const RatingBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <p className="text-zinc-600 text-sm">
        No rating data available
      </p>
    );
  }

  return (
    <ChartContainer
      config={{
        count: {
          label: "Problems Solved",
          color: "var(--chart-1)",
        },
      }}
      className="h-full w-full"
    >
      <BarChart data={data} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="rating"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="count"
          fill="var(--color-count)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default RatingBarChart;

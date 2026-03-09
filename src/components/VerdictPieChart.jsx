import {
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const COLORS = {
  OK: "hsl(142, 71%, 45%)",          
  WRONG_ANSWER: "hsl(0, 72%, 51%)",   
  TLE: "hsl(45, 93%, 47%)",         
  MLE: "hsl(24, 94%, 50%)",            
  OTHER: "hsl(215, 20%, 65%)",      
};


const VerdictPieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <p className="text-zinc-600 text-sm">
        No verdict data available
      </p>
    );
  }

  return (
    <ChartContainer
      config={{
        count: {
          label: "Submissions",
        },
      }}
      className="h-full w-full"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={data}
          dataKey="count"
          nameKey="verdict"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
        >
          {data.map((entry) => (
            <Cell
              key={entry.verdict}
              fill={COLORS[entry.verdict] ?? "gray"}
            />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default VerdictPieChart;

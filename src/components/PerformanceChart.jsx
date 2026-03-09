import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";

const RatingChart = ({ data }) => {
  const bands = [
    { y1: 0, y2: 1200, color: "#808080" },   // Newbie
    { y1: 1200, y2: 1400, color: "#008000" }, // Pupil
    { y1: 1400, y2: 1600, color: "#03a89e" }, // Specialist
    { y1: 1600, y2: 1900, color: "#0000ff" }, // Expert
    { y1: 1900, y2: 2100, color: "#aa00aa" }, // CM
  ];

  return (
    <div className="mt-8 p-6 bg-zinc-900/50 rounded-3xl border border-white/5 w-full h-[420px]">
      <h3 className="text-xl font-bold text-white mb-4">
        Rating Progression
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

          <XAxis
            dataKey="time"
            tickFormatter={(t) =>
              new Date(t * 1000).toLocaleDateString("en-GB", {
                month: "short",
                year: "2-digit",
              })
            }
            stroke="#52525b"
            fontSize={12}
          />

          <YAxis
            domain={["dataMin - 100", "dataMax + 100"]}
            stroke="#52525b"
            fontSize={12}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: "12px",
            }}
            formatter={(value, name, props) => {
              if (name === "rating") return [`${value}`, "Rating"];
              return value;
            }}
            labelFormatter={(_, payload) =>
              payload?.[0]?.payload?.contestName
            }
          />

          {bands.map((b, i) => (
            <ReferenceArea
              key={i}
              y1={b.y1}
              y2={b.y2}
              fill={b.color}
              fillOpacity={0.08}
            />
          ))}

          <Line
            type="monotone"
            dataKey="rating"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 4, fill: "#6366f1" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;
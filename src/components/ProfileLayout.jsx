import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Card1 from "./Card1";
import RatingBarChart from "./RatingBarChart";
import VerdictPieChart from "./VerdictPieChart";

const ProfileLayout = ({ userData, ratingChartData, verdictChartData }) => {
  return (
    <div className="h-[800px] w-full border border-zinc-800 rounded-lg overflow-hidden bg-black">
      <ResizablePanelGroup orientation="horizontal">
        
        <ResizablePanel defaultSize={40}>
          <div className="flex h-full flex-col p-6 bg-zinc-950/50">
            <h3 className="text-zinc-400 font-medium mb-1">
              Problems Solved by Rating
            </h3>
            <p className="text-xs text-zinc-600 mb-4">
              Distribution of solved problems
            </p>

            <div className="flex-1">
              <RatingBarChart data={ratingChartData} />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={20}>
          <ResizablePanelGroup orientation="vertical">
           
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-4 bg-black">
               
                <Card1 user={userData} />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={50}>
              <div className="flex h-full flex-col p-6 bg-zinc-950/50">
                <h3 className="text-zinc-400 font-medium mb-1">
                  Submission Verdicts
                </h3>
                <p className="text-xs text-zinc-600 mb-4">
                  AC vs WA vs TLE vs MLE
                </p>

                <div className="flex-1">
                  <VerdictPieChart data={verdictChartData} />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ProfileLayout;

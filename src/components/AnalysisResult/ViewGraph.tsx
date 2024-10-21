import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { ResponsiveLine } from "@nivo/line";
import { ReactComponent as PlayListIcon } from "../../assets/playlist-icon.svg";
function ViewGraph({ graphData }: { graphData: any }) {
  const Dummydata = [
    {
      id: "arousal",
      serieColor: "#FFF9C6",
      color: "#FFF9C6",
      pointColor: "#FFF9C6",
      data: [
        {
          x: "00:00",
          y: 0.2889,
        },
        {
          x: "00:36",
          y: 0.3258,
        },
        {
          x: "01:12",
          y: 0.375,
        },
        {
          x: "01:48",
          y: 0.4468,
        },
        {
          x: "02:24",
          y: 0.3865,
        },
        {
          x: "03:00",
          y: -0.6322,
        },
      ],
    },
    {
      id: "valence",
      serieColor: "#F4B5FA",
      color: "#F4B5FA",
      pointColor: "#F4B5FA",
      data: [
        {
          x: "00:00",
          y: -0.1757,
        },
        {
          x: "00:36",
          y: 0.425,
        },
        {
          x: "01:12",
          y: 0.3452,
        },
        {
          x: "01:48",
          y: 0.3693,
        },
        {
          x: "02:24",
          y: 0.4032,
        },
        {
          x: "03:00",
          y: -0.214,
        },
      ],
    },
  ];
  return (
    <Container>
      <div className="flex flex-row gap-2 ">
        <PlayListIcon />
        <span className="text-md">Insights of melody</span>
      </div>
      {/* <span className="title">Melody</span> */}
      <ResponsiveLine
        data={graphData}
        margin={{ top: 15, right: 50, bottom: 70, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: -1,
          max: 1,
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.4f"
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickPadding: 5,
        }}
        axisLeft={{
          tickPadding: 5,
          tickValues: [-1, -0.5, 0, 0.5, 1],
        }}
        theme={{
          text: { fill: "#BDC0C4" },
          grid: { line: { stroke: "#212329" } },
          axis: { ticks: { line: { strokeWidth: 0 } } },
        }}
        colors={{
          datum: "color",
        }}
        enableGridX={false}
        gridYValues={[-1, -0.5, 0, 0.5, 1]}
        pointSize={6}
        pointBorderWidth={3}
        pointBorderColor="#1E1F25"
        pointLabel="data.yFormatted"
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 50,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 75,
            itemHeight: 10,
            symbolSize: 9,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Container>
  );
}

export default ViewGraph;

const Container = styled.div`
  ${tw`w-3/5 max-w-[481px] h-[280px] flex flex-col items-start bg-black rounded-[16px] py-4  px-3 drop-shadow-[ 0px 4px 4px rgba(0, 0, 0, 0.4)]`}

  .text-md {
    ${tw`font-display font-medium text-mint text-base mb-1`}
  }
`;

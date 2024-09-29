import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { ResponsiveLine } from "@nivo/line";
function ViewGraph() {
  const Dummydata = [
    {
      id: "arousal",
      serieColor: "#A6EEF6",
      color: "#A6EEF6",
      pointColor: "#A6EEF6",
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
      <span className="title">Melody</span>
      <ResponsiveLine
        data={Dummydata}
        margin={{ top: 5, right: 50, bottom: 70, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: -1,
          max: 1,
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickPadding: 5,
        }}
        axisLeft={{
          tickPadding: 5,
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
        pointSize={6}
        pointBorderWidth={3}
        pointBorderColor="#1E1F25"
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
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
  ${tw`w-full h-[250px] flex flex-col items-center bg-black rounded-[16px]`}
  .title {
    ${tw`font-display font-normal text-base text-white my-1.5`}
  }
`;

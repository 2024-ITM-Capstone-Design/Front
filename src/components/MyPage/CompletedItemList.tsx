import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
function CompletedItemList() {
  return <Container></Container>;
}

export default CompletedItemList;

const Container = styled.div`
  ${tw`w-full grid`}

  grid-template-columns: (4, 1fr)
`;

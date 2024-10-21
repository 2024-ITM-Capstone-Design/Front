import tw from "twin.macro";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { viewOngoingMusics } from "../../api/my-page";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

function OngoingList() {
  const { userData } = useAuthStore();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: () => viewOngoingMusics(userData?.id!),
  });

  const getHashTag = (type: string) => {
    if (type === "ONE") {
      return "#cover #image";
    }
    if (type === "MANY") {
      return "#section #images";
    }
    if (type === "BOTH") {
      return "#cover #section #images";
    }
  };

  const goToContinue = (itemId: number, status: number) => {
    if (status === 0) {
      navigate(`/create/check-lyric/${itemId}`);
    } else if (status === 1) {
      navigate(`/create/analysis-result/${itemId}`);
    } else if (status === 2) {
      navigate(`/create/generate-prompt/${itemId}`);
    } else {
      navigate(`/create/view-result/${itemId}`);
    }
  };
  return (
    <OnGoingItemBox>
      {!isLoading &&
        data &&
        data.length > 0 &&
        data.map((item: any, index: number) => (
          <OngoingItem>
            <span className="title">{item.audioName}</span>
            <span className="hash-tag">{getHashTag(item.type)}</span>
            <hr className="w-full h-[0.5px] bg-[#A7AAB5] border-0 my-2" />
            <div className="flex flex-row mx-auto gap-2">
              <button
                className="continue"
                onClick={() => goToContinue(item.inputDataId, item.status)}
              >
                Continue
              </button>
              <button className="continue">Delete</button>
            </div>
          </OngoingItem>
        ))}
    </OnGoingItemBox>
  );
}

export default OngoingList;

const OnGoingItemBox = styled.div`
  ${tw`w-full grid justify-between [grid-template-columns: repeat(4, 1fr)] `}
`;
const OngoingItem = styled.div`
  ${tw`w-[250px] h-[120px] rounded-[12px] bg-[radial-gradient(241.86% 241.86% at 53.72% -58.25%, #404657 0%, rgba(64, 70, 87, 0) 100%) ] flex flex-col px-[18px] py-[10px] font-display my-[20px]`}
  backdrop-filter: blur(34px);

  .title {
    ${tw`font-medium text-[20px] text-white`}
  }
  .hash-tag {
    ${tw`font-light text-sm text-subGray`}
  }
  .continue {
    ${tw`w-[65px] font-normal text-[16px] text-subGray border-b-[1px] border-b-subGray `}

    &:hover {
      ${tw`text-white border-b-white`}
    }
  }
`;

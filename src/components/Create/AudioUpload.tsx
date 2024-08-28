import React, { useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import UploadIcon from "../../assets/icons/upload-icon";

type audioProps = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};
function AudioUpload({ file, setFile }: audioProps) {
  //파일 입력 요소에 대한 참조 관리, 파일 선택 버튼을 클릭했을 때 숨겨진 파일 입력 필드를 클릭할 수 있도록함
  const inputRef = useRef<HTMLInputElement | null>(null);

  //사용자가 파일을 선택하거나 드롭했을 때 호출
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected file:", selectedFile.name);
    }
  };
  //드래그된 파일이 드롭 영역 위에 있을 때 호출되며, 기본 이벤트를 막아줌
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  //파일이 드롭될 때 호출, 드롭된 파일을 상태에 저장
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      console.log("Dropped file:", droppedFile.name);
    }
  };
  //파일 선택 버튼을 클릭했을 때 파일 입력 필드를 활성화
  const handleClick = () => {
    inputRef.current?.click();
  };
  return (
    <AudioInput
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      // onClick={handleClick}
    >
      <UploadIcon height={35} width={35} />
      <label className="sub-text">Drag and Drop here</label>
      <button className="select-btn" onClick={handleClick}>
        Select file
      </button>

      <input
        type="file"
        accept="audio/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </AudioInput>
  );
}

export default AudioUpload;
const AudioInput = styled.div`
  ${tw`w-full h-[250px] border-[1px] border-dashed border-[#F7F7F7] rounded-[4px] flex flex-col items-center justify-center`}
  .sub-text {
    ${tw`font-fira font-light text-white my-1`}
  }
  .select-btn {
    ${tw`w-[135px] h-[39px] bg-subColor rounded font-fira font-light text-white`}
  }
`;

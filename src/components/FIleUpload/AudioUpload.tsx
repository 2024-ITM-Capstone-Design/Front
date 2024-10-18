import React, { useCallback, useRef } from "react";
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

  // useCallback으로 함수 메모이제이션
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
        console.log("Selected file:", selectedFile.name);
      }
    },
    [setFile]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile) {
        setFile(droppedFile);
        console.log("Dropped file:", droppedFile.name);
      }
    },
    [setFile]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

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

// React.memo 적용
export default React.memo(AudioUpload);
const AudioInput = styled.div`
  ${tw`w-full h-[250px] border-[1px] border-dashed border-[#F7F7F7] rounded-[4px] flex flex-col items-center justify-center`}
  .sub-text {
    ${tw`font-display font-light text-white my-1`}
  }
  .select-btn {
    ${tw`w-[135px] h-[39px] bg-subColor rounded font-display font-light text-white`}
  }
`;

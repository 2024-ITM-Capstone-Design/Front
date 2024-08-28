import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import * as C from "../../styles/create.style";
import AudioUpload from "./AudioUpload";
import { ReactComponent as FileIcon } from "../../assets/file.svg";
import DeleteIcon from "../../assets/icons/delete-icon";
function ManyForm() {
  //파일 상태관리를 위한 state, 파일이 선택되거나 드롭될때 setFile을 통해 상태 업데이트
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");

  const goToNextPage = () => {
    //단일+여러 이미지 생성 로직 api 호출
    // 가사 추출 조회&편집 페이지 이동
  };
  console.log(title);
  return (
    <>
      <C.ContentWrapper>
        <C.ColBox className="w-[730px] mx-auto">
          <InputBox>
            <label className="title-md">🎶 제목</label>
            <label className="text-sm">노래의 제목을 입력해주세요</label>
            <input
              className="text-input w-full h-10"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputBox>
          <InputBox>
            <label className="title-md">🎧 오디오 파일 업로드</label>
            <label className="text-sm">노래 파일을 업로드해주세요</label>
            <AudioUpload file={file} setFile={setFile} />
          </InputBox>
          {file && (
            <FileBox>
              <C.RowBox>
                <FileIcon />
                <span className="text-sm ml-2">{file.name}</span>
              </C.RowBox>
              <button onClick={() => setFile(null)}>
                <DeleteIcon />
              </button>
            </FileBox>
          )}
        </C.ColBox>
      </C.ContentWrapper>
      <C.NextButton
        onClick={goToNextPage}
        disabled={file === null || title === ""}
      >
        Next →
      </C.NextButton>
    </>
  );
}

export default ManyForm;

const InputBox = styled.div`
  ${tw`flex flex-col my-2.5`}

  .title-md {
    ${tw`font-semibold text-white text-md`}
  }
  .text-sm {
    ${tw`font-light text-subGray text-sm my-1`}
  }

  .text-input {
    ${tw` border-[1px] border-subGray rounded-[5px] bg-gray font-display font-light text-white pl-1`}

    &:focus {
      outline: none;
    }
    /* textarea 크기 고정 */
    &.text-input {
      resize: none; /* 크기 조정 비활성화 */
    }
  }
`;

const FileBox = styled.div`
  ${tw`w-full h-[65px] flex flex-row items-center justify-between`}
`;

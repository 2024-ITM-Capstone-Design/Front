import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import CreateLayout from "../components/Common/CreateLayout";
import Progress from "../components/Progress";
import * as C from "../styles/create.style";
import { useLocation, useNavigate } from "react-router-dom";
import SingleForm from "../components/FIleUpload/SingleForm";
import ManyForm from "../components/FIleUpload/ManyForm";
import AudioUpload from "../components/FIleUpload/AudioUpload";
import { ReactComponent as FileIcon } from "../assets/file.svg";
import DeleteIcon from "../assets/icons/delete-icon";
import { endUpload, sendUserInput } from "../api/create";
import { useAuthStore } from "../store/useAuthStore";
import getBlobDuration from "get-blob-duration";
import { getPresignedUrl, uploadAudioToS3 } from "../api/file";
function FileUpload() {
  const location = useLocation();

  const { menu } = location.state;
  console.log("state", location.state);

  const { userData } = useAuthStore();
  //파일 상태관리를 위한 state, 파일이 선택되거나 드롭될때 setFile을 통해 상태 업데이트
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [lyric, setLyric] = useState<string>("");

  const navigate = useNavigate();

  const goToNextPage = async () => {
    //오디오 파일 길이 계산 api 호출
    const duration = await getBlobDuration(file!);
    console.log(menu, title, lyric, userData.id!);

    // 유저 입력 데이터 등록 api 호출
    const itemId = await sendUserInput(
      menu,
      title,
      lyric,
      userData.id!,
      Math.floor(duration)
    );

    if (itemId) {
      //presigned URL 발급
      const url = await getPresignedUrl(file!.name, itemId);
      if (url) {
        //오디오 파일 S3 업로드 api 요청
        await uploadAudioToS3(file!, url);
        //파일 업로드 확인 및 오디오 분할 요청
        const res = await endUpload(itemId);

        if (res?.status === 200) {
          if (menu === "ONE") {
            //단일 이미지 생성 로직 api 호출
            //성공 시 분석결과 확인 페이지 이동
            navigate(`/create/analysis-result/${itemId}`);
          } else {
            //단일+여러 이미지 생성 로직 api 호출
            // 가사 추출 조회&편집 페이지 이동
            navigate(`/create/check-lyric/${itemId}`);
          }
        }
      }
    }
  };

  return (
    <CreateLayout>
      <Progress currentStep={1} />
      <div className="flex flex-col items-end">
        <C.ContentWrapper>
          <C.ColBox className="w-[730px] m-auto">
            <InputBox>
              <label className="title-md">🎶 Title</label>
              <label className="text-sm">Please enter the song title</label>
              <input
                className="text-input w-full h-10"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputBox>
            <C.RowBox className="justify-between">
              <C.ColBox>
                <InputBox className="w-[355px]">
                  <label className="title-md">🎧 Audio File</label>
                  <label className="text-sm">Please upload the song file</label>
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
              <InputBox>
                <label className="title-md">🎼 Lyrics</label>
                <label className="text-sm">Please enter the song lyrics</label>
                <textarea
                  className="text-input w-[350px] h-[346px] pt-1"
                  value={lyric}
                  onChange={(e) => setLyric(e.target.value)}
                />
              </InputBox>
            </C.RowBox>
          </C.ColBox>
        </C.ContentWrapper>
        <C.NextButton
          onClick={goToNextPage}
          disabled={!file || title === "" || lyric === ""}
        >
          Next →
        </C.NextButton>
      </div>
    </CreateLayout>
  );
}

export default FileUpload;
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

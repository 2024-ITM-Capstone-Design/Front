import { useCallback, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";

import { useLocation, useNavigate } from "react-router-dom";
import AudioUpload from "../../components/FIleUpload/AudioUpload";
import FileIcon from "../../assets/file.svg?react";
import DeleteIcon from "../../assets/icons/delete-icon";
import { endUpload, sendUserInput } from "../../api/create";
import { useAuthStore } from "../../store/useAuthStore";
import getBlobDuration from "get-blob-duration";
import { getPresignedUrl, uploadAudioToS3 } from "../../api/file";
import NextButton from "../../components/Common/NextButton";
import CreateLayout from "../../layout/CreateLayout";
function FileUpload() {
  const location = useLocation();
  const navigate = useNavigate();

  const { menu } = location.state;

  const { userData } = useAuthStore();
  //파일 상태관리를 위한 state, 파일이 선택되거나 드롭될때 setFile을 통해 상태 업데이트
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [lyric, setLyric] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //goToNextPage 함수는 여러 상태값에 의존하므로 useCallback을 사용해 불필요한 재생성을 방지
  const goToNextPage = useCallback(async () => {
    if (isLoading) return; // 이미 로딩 중이라면 중복 클릭 방지

    setIsLoading(true); // 로딩 시작

    try {
      //오디오 파일 길이 계산 api 호출
      const duration = await getBlobDuration(file!);

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
              navigate(`/create/analysis-result/${itemId}`);
            } else {
              navigate(`/create/check-lyric/${itemId}`);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  }, [file, title, lyric, menu, userData.id!, isLoading, navigate]);

  return (
    <CreateLayout currentStep={1}>
      <ContentWrapper>
        <ColBox className="w-[730px] m-auto">
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
          <RowBox className="justify-between">
            <ColBox>
              <InputBox className="w-[355px]">
                <label className="title-md">🎧 Audio File</label>
                <label className="text-sm">Please upload the song file</label>
                <AudioUpload file={file} setFile={setFile} />
              </InputBox>
              {file && (
                <FileBox>
                  <RowBox>
                    <FileIcon />
                    <span className="text-sm ml-2">{file.name}</span>
                  </RowBox>
                  <button onClick={() => setFile(null)}>
                    <DeleteIcon />
                  </button>
                </FileBox>
              )}
            </ColBox>
            <InputBox>
              <label className="title-md">🎼 Lyrics</label>
              <label className="text-sm">Please enter the song lyrics</label>
              <textarea
                className="text-input w-[350px] h-[346px] pt-1"
                value={lyric}
                onChange={(e) => setLyric(e.target.value)}
              />
            </InputBox>
          </RowBox>
        </ColBox>
      </ContentWrapper>
      <NextButton
        onClick={goToNextPage}
        disabled={!file || title === "" || lyric === "" || isLoading}
      >
        {isLoading ? (
          <div className="w-7 h-7 border-4 border-t-gray border-subGray rounded-full animate-spin"></div>
        ) : (
          "Next →"
        )}
      </NextButton>
    </CreateLayout>
  );
}

export default FileUpload;

const ContentWrapper = styled.div`
  ${tw`w-full h-[619px] bg-gray [border-radius: 15px] p-7 font-display flex flex-col`}
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .title-md {
    ${tw`font-semibold text-white text-md`}
  }
  .text-sm {
    ${tw`font-light text-subGray text-sm`}
  }
`;

const RowBox = styled.div`
  ${tw`flex flex-row`}
`;

const ColBox = styled.div`
  ${tw`flex flex-col`}
`;
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

import { axiosInstance } from ".";
import { ResultData } from "../type/result";
export const sendUserInput = async (
  type: string,
  audioName: string,
  audioLyrics: string,
  id: string,
  duration: number
) => {
  try {
    const res = await axiosInstance.post("/api/input/save", {
      type: type,
      audioName: audioName,
      audioLyrics: audioLyrics,
      duration: duration,
      user: {
        id: id,
      },
    });

    if (res) {
      return res.data.id;
    }
  } catch (error) {
    console.log(error);
  }
};

export const endUpload = async (itemId: string) => {
  try {
    const res = await axiosInstance.post("/api/audio/upload", {
      isUpload: true,
      inputDataId: itemId,
    });

    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLyrics = async (itemId: string) => {
  try {
    const res = await axiosInstance.get(`/api/audio/transcribe/${itemId}`);

    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const reviseLyric = async (
  itemId: string,
  segmentOrder: number,
  newLyric: string
) => {
  try {
    const res = await axiosInstance.put(
      `/api/lyrics/update/${itemId}/${segmentOrder}`,
      {
        newLyrics: newLyric,
      }
    );

    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAnalysisResult = async (itemId: string) => {
  try {
    const res = await axiosInstance.get(`/api/analysis/${itemId}`);

    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendImageOption = async (
  itemId: string,
  imageStyle: string,
  isAutomatic: boolean,
  characterStyle?: string
) => {
  try {
    const body = isAutomatic
      ? {
          imageStyle: imageStyle,
          isAutomatic: isAutomatic,
        }
      : {
          imageStyle: imageStyle,
          isAutomatic: isAutomatic,
          characterStyle: characterStyle,
        };
    const res = await axiosInstance.post<ResultData>(
      `/api/image/create/${itemId}`,
      body
    );
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getResultData = async (itemId: string) => {
  try {
    const res = await axiosInstance.get<ResultData>(
      `/api/image/output/${itemId}`
    );
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

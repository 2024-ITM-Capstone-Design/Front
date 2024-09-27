import { axiosInstance } from ".";
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

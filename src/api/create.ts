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

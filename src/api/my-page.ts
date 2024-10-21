import { axiosInstance } from ".";

export const viewOngoingMusics = async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/api/mypage/${userId}`);

    return res.data;
  } catch (error) {}
};

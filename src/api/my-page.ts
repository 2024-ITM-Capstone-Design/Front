import { axiosInstance } from ".";

export const viewOngoingMusics = async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/api/mypage/ongoing/${userId}`);

    return res.data;
  } catch (error) {}
};

export const viewCompletedMusics = async (userId: string) => {
  try {
    const res = await axiosInstance.get(`/api/mypage/completed/${userId}`);

    return res.data;
  } catch (error) {}
};

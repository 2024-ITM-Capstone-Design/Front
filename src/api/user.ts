import { axiosInstance } from ".";

type Response = {
  user: {
    id: string;
    kakaoAccessToken: string;
    kakaoId: string;
    nickName: string;
  };
};
export const login = async (accessToken: string) => {
  try {
    const res = await axiosInstance.post<Response>("/api/kakao/login", {
      accessToken: accessToken,
    });

    return res.data.user;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post("/api/kakao/logout");

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

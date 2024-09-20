import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../api/user";
import { useAuthStore } from "../store/useAuthStore";
function OAuth() {
  const navigate = useNavigate();
  const { setUserData } = useAuthStore();
  const getToken = async () => {
    const token = new URL(window.location.href).searchParams.get("code");
    const res = axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_REST_API_KEY,
        redirect_uri: "http://localhost:3000/redirect",
        code: token,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    return res;
  };

  useEffect(() => {
    const getTokenAndLogin = async () => {
      try {
        const res = await getToken(); // getToken() 함수 호출
        if (res) {
          const data = await login(res.data.access_token); // login 함수 호출 후 결과를 기다림
          if (data) {
            // login이 성공적으로 완료된 경우 데이터가 존재
            useAuthStore.setState({
              isLoggedIn: true,
              userData: {
                id: data.id,
                nickName: data.nickName,
              },
              accessToken: data.kakaoAccessToken,
            });
            navigate("/");
          }
        }
      } catch (err) {
        console.error(err); // 오류 처리
      }
    };

    getTokenAndLogin(); // 비동기 함수 실행
  }, []);

  return <></>;
}

export default OAuth;

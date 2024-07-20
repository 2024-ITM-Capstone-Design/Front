import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as PCIcon } from "../assets/login-bg.svg";
import * as L from "../styles/sign-in-up.style";
import ArrowIcon from "../assets/icons/right-arrow";
import { useForm, SubmitHandler } from "react-hook-form";
function Login() {
  type FormValue = {
    id: string;
    password: string;
  };

  //useForm 사용하기
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValue>({
    mode: "onSubmit",
    defaultValues: {
      id: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<FormValue> = async () => {
    const { id, password } = getValues();
  };
  return (
    <>
      <PCIcon className="absolute w-[480px] h-[500px] left-0 top-60 overflow-hidden " />
      <div className="flex flex-col h-screen overflow-hidden max-w-7xl mx-auto">
        <L.Logo onClick={() => navigate("/")}>SoundPalette</L.Logo>
        <L.LoginLayout>
          <span className="login-title">Log In to SoundPalette</span>
          <L.FormLayout onSubmit={handleSubmit(onSubmitHandler)}>
            <L.InputContainer isError={errors.id ? true : false}>
              <label>아이디</label>
              <input
                type="text"
                placeholder="아이디를 입력해주세요"
                {...register("id", {
                  required: true,
                })}
              />
              {errors.id && (
                <span className="error-message">{errors.id.message}</span>
              )}
            </L.InputContainer>
            <L.InputContainer isError={errors.password ? true : false}>
              <label>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </L.InputContainer>
            <L.Submitbtn isActivate={true}>Sign In</L.Submitbtn>
          </L.FormLayout>
          <button className="navigate-btn" onClick={() => navigate("/sign-up")}>
            <span className="text">Don’t have an account? Sign up</span>
            <ArrowIcon width={14} height={14} color="#FFFFFF" />
          </button>
        </L.LoginLayout>
      </div>
    </>
  );
}

export default Login;

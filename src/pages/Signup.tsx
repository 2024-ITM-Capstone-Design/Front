import React, { useRef, useState, useEffect } from "react";
import * as S from "../styles/sign-in-up.style";
import { useNavigate } from "react-router-dom";
import RightArrowIcon from "../assets/icons/right-arrow";
import { SubmitHandler, useForm } from "react-hook-form";
import { idRegex, passwordRegex } from "../util/regex";
function Signup() {
  const navigate = useNavigate();

  type FormValue = {
    id: string;
    password: string;
    nickname: string;
    password_confirm: string;
  };

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    mode: "onSubmit",
    defaultValues: {
      id: "",
      password: "",
      nickname: "",
      password_confirm: "",
    },
  });
  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password");

  const id_watch = watch("id");
  const nickname_watch = watch("nickname");
  const [isIdValid, setIsIdValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  useEffect(() => {
    setIsIdValid(false);
  }, [id_watch]);

  useEffect(() => {
    setIsNicknameValid(false);
  }, [nickname_watch]);

  const onSubmitHandler: SubmitHandler<FormValue> = async () => {
    const { id, password, password_confirm, nickname } = getValues();
  };

  const checkValues = () => {
    const { id, password, password_confirm, nickname } = getValues();
    return (
      id === "" || password === "" || password_confirm === "" || nickname === ""
    );
  };
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden max-w-7xl mx-auto">
        <S.Logo
          onClick={() => {
            navigate("/");
          }}
        >
          SoundPalette
        </S.Logo>

        <S.SignupLayout>
          <span className="sign-up-title">Create Account</span>
          <S.FormLayout onSubmit={handleSubmit(onSubmitHandler)}>
            <S.InputContainer isError={errors.nickname ? true : false}>
              <label>닉네임</label>
              <div className="inline-flex items-center">
                <input
                  placeholder="닉네임을 입력해주세요"
                  {...register("nickname", {
                    required: true,
                  })}
                />
                <S.Checkbtn
                  className="check-btn"
                  disabled={nickname_watch === ""}
                  isActivate={nickname_watch !== ""}
                >
                  중복확인
                </S.Checkbtn>
              </div>
              {errors.nickname && (
                <span className="error-message">{errors.nickname.message}</span>
              )}
            </S.InputContainer>
            <S.InputContainer isError={errors.id ? true : false}>
              <label>아이디</label>
              <div className="inline-flex items-center">
                <input
                  placeholder="아이디를 입력해주세요"
                  {...register("id", {
                    required: true,
                    minLength: {
                      value: 6,
                      message: "아이디는 6자 이상이어야 합니다.",
                    },
                    pattern: {
                      value: idRegex,
                      message: "아이디 형식을 확인해주세요",
                    },
                  })}
                />
                <S.Checkbtn
                  className="check-btn"
                  disabled={id_watch === ""}
                  isActivate={id_watch !== ""}
                >
                  중복확인
                </S.Checkbtn>
              </div>
              {errors.id && (
                <span className="error-message">{errors.id.message}</span>
              )}
            </S.InputContainer>
            <S.InputContainer isError={errors.password ? true : false}>
              <label>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8자리 이상이어야 합니다",
                  },
                  pattern: {
                    value: passwordRegex,
                    message: "비밀번호 형식을 확인해주세요",
                  },
                })}
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </S.InputContainer>
            <S.InputContainer isError={errors.password_confirm ? true : false}>
              <label>비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호 확인을 입력해주세요."
                {...register("password_confirm", {
                  required: true,
                  validate: (value) =>
                    value === passwordRef.current ||
                    "비밀번호가 일치하지 않습니다.",
                })}
              />
              {errors.password_confirm && (
                <span className="error-message">
                  {errors.password_confirm.message}
                </span>
              )}
            </S.InputContainer>
            <S.Submitbtn disabled={checkValues()} isActivate={!checkValues()}>
              Sign Up
            </S.Submitbtn>
          </S.FormLayout>
          <button className="navigate-btn" onClick={() => navigate("/login")}>
            <span className="text">Already have an Account? Login</span>
            <RightArrowIcon width={14} height={14} color="#FFFFFF" />
          </button>
        </S.SignupLayout>
      </div>
    </>
  );
}

export default Signup;

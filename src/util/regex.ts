//영문자로 시작하는 영문자 또는 숫자 6~20자
export const idRegex = /^[a-z]+[a-z0-9]{5,19}$/g;
//8~16자 영문, 숫자 조합
export const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

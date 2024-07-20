import { DefaultTheme } from "styled-components";

// 폰트 스타일과 컬러를 정의하는 함수들
const createFontStyle = (
  family: string,
  weight: number,
  size: number,
  lineHeight: number
) => `
  font-family: "${family}";
  font-weight: ${weight};
  font-size: ${size}px;
  line-height: ${lineHeight}%;
`;

const createColor = (color: string) => color;

// 폰트 정의
const fonts = {
  title_lg: createFontStyle("Pretendard", 600, 32, 120),
  title_md: createFontStyle("Pretendard", 600, 24, 120),
  title_sm: createFontStyle("Pretendard", 600, 20, 130),
  text_lg: createFontStyle("Pretendard", 600, 18, 140),
  text_md: createFontStyle("Pretendard", 400, 16, 140),
  text_sm: createFontStyle("Pretendard", 300, 14, 140),
  caption: createFontStyle("Pretendard", 300, 12, 140),
};

// 컬러 정의
const colors = {
  mainColor: createColor("#8D7EFD"),
  subColor: createColor("#7165CA"),
  black: createColor("#1E1E20"),
  white: createColor("#F7F7F7"),
  gray: createColor("#3D3C41"),
  pink: createColor("#F4B5FA"),
  mint: createColor("#A6EEF6"),
  yellow: createColor("#FFFFB2"),
  subGray: createColor("#BDC0C4"),
  error: createColor("#FF5F58"),
};

export type FontsTypes = typeof fonts;
export type ColorsTypes = typeof colors;

const theme: DefaultTheme = {
  colors,
  fonts,
};

export default theme;

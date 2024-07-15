// import original module declarations
import "styled-components";
import { FontsTypes, ColorsTypes } from "../styles/theme";
import "twin.macro";
import styledImport, { CSSProp, css as cssImport } from "styled-components";

type Theme = typeof theme;

declare module "twin.macro" {
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module "react" {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    tw?: string;
  }
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fonts: FontsTypes;
  }
  export interface CSSProp {
    [key: string]: any;
  }
}

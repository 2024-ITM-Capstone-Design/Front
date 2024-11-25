import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import theme from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);

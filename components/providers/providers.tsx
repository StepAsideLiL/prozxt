import ReactQueryProvider from "./react-query-provider";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </ThemeProvider>
    </>
  );
}

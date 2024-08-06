"use client";

import { useEffect, useState, createContext, useRef, useContext } from "react";
import { AuthContext, AuthProvider, useAuth } from "@/context/auth-context";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

const Providers = ({ children }: { children: React.ReactNode }) => {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return <>{children}</>;
  // }
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};
export default Providers;

export { AuthContext, useAuth };

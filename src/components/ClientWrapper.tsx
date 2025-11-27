"use client";

import { ThemeProvider, useTheme } from "@/hooks/ThemeContext";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <InnerWrapper>{children}</InnerWrapper>
    </ThemeProvider>
  );
};

const InnerWrapper = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
  const { ready } = useTheme();

  useEffect(() => {
    if(ready){
        setTimeout(() => setLoading(false), 2000);
    }
  }, [ready]);
  

  if (loading) return <Loader />;

  return <>{children}</>;
};

export default ClientWrapper;

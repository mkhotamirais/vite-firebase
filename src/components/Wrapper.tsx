import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-6xl mx-auto px-3 h-full">{children}</div>;
};

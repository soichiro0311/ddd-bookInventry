"use client";

import React, { useState, createContext, useContext, ReactNode } from "react";

export interface KeywordSearchContextType {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export const KeywordSearchContext = createContext<
  KeywordSearchContextType | undefined
>(undefined);

export interface KeywordSearchProviderProps {
  children: ReactNode;
}

export const KeywordSearchProvider: React.FC<KeywordSearchProviderProps> = ({
  children,
}) => {
  const [keyword, setKeyword] = useState("");

  return (
    <KeywordSearchContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </KeywordSearchContext.Provider>
  );
};

export function useKeywordSearchContext() {
  const context = useContext(KeywordSearchContext);
  if (!context) {
    throw new Error("Content must be used within a Provider");
  }
  const { keyword, setKeyword } = context;
  return {
    keyword,
    setKeyword,
  };
}

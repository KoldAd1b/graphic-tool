"use client";

import React from "react";
import Providers from "./query-provider";

type ProvidersProps = {
  children: React.ReactNode;
};

export const Provider = ({ children }: ProvidersProps) => {
  return <Providers>{children}</Providers>;
};

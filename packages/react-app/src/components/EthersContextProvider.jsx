import React, { useState } from "react";

import { EthersContext } from "../context";

export default function EthersContextProvider({ value, children }) {
  return <EthersContext.Provider value={value}>{children}</EthersContext.Provider>;
}

import React, { useState } from "react";

import { EthersContext } from "../context";

export default function EthersContextProvider({ children }) {
  return <EthersContext.Provider>{children}</EthersContext.Provider>;
}

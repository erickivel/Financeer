import React from 'react';

import { ExtractProvider } from './extract';

const AppProvider: React.FC = ({ children }) => {
  return <ExtractProvider>{children}</ExtractProvider>;
};

export default AppProvider;

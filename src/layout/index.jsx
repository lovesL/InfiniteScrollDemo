import React from 'react';
import { UseRequestProvider } from 'ahooks';

export default ({ children }) => {
  return (
    <UseRequestProvider
      value={{
        formatResult: (res) => res,
      }}
    >
      {children}
    </UseRequestProvider>
  );
};

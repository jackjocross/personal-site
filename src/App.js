import React from 'react';
import { Root, Routes } from 'react-static';
import { Global } from '@emotion/core';
import { theme } from './theme';

function App() {
  return (
    <>
      <Global
        styles={{
          'html, body': {
            margin: 0,
            fontFamily: theme.fontFamily,
            fontSize: theme.fontSize.root,
            lineHeight: theme.lineHeight,
          },
        }}
      />
      <Root>
        <Routes />
      </Root>
    </>
  );
}

export default App;

import React from 'react';
import { Root, Routes } from 'react-static';
import { Global } from '@emotion/core';
import Helmet from 'react-helmet';
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
      <Helmet>
        <link
          href="https://unpkg.com/firacode@1.205.0/distr/fira_code.css"
          rel="stylesheet"
        />
      </Helmet>
      <Root>
        <Routes />
      </Root>
    </>
  );
}

export default App;

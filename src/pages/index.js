import React from 'react';
import { RouteData, SiteData } from 'react-static';

const Index = () => (
  <SiteData>
    {site => (
      <RouteData>
        {route => {
          console.log({ site, route });
          return (
            <div style={{ textAlign: 'center' }}>
              <h1>Welcome to React-Static</h1>
            </div>
          );
        }}
      </RouteData>
    )}
  </SiteData>
);

export default Index;

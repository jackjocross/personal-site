import axios from 'axios';

export default {
  getSiteData: () => ({
    title: 'Jack Cross',
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        getData: () => ({
          hello: true,
        }),
      },
    ];
  },
};

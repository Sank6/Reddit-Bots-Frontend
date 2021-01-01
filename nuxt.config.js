export default {
  ssr: false,
  /*
   ** Headers of the page
   */
  head: {
    title: "Reddit Bots",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: "A collection of Reddit bots",
      },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ff5700' },
      { rel: 'msapplication-TileColor', color: '#da532c' },
      { rel: 'theme-color', color: '#7700ff' },
      { rel: 'stylesheet', href: 'loader.css' }
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    {
      src: '~assets/css/darkly.scss',
      lang: 'scss'
    },
    {
      src: '~assets/css/main.scss',
      lang: 'scss'
    }
  ],
  
  components: true,
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: "https://api.redditbots.ninja",
    credentials: true
  },
  /*
   ** Build configuration
   */
  buildModules: ['@nuxtjs/fontawesome'],
  fontawesome: {
    icons: {
      solid: true
    }
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};

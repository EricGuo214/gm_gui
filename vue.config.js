module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      "/api": {
        target: "https://gm-proxy-efpdqhls4a-uw.a.run.app",
        secure: false,
        // pathRewrite:{
        //   "/api": ""
        // }
      }
    }
  }
}
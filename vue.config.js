module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        secure: false,
        pathRewrite:{
          "/api": ""
        }
      }
    }
  }
}
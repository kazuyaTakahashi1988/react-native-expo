// ✅ OK（CommonJS形式）webpack.config.js
const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  if (config.devServer) {
    config.devServer.hot = true;
    config.devServer.liveReload = true;
    config.devServer.watchFiles = {
      paths: ["./**/*"],
      options: {
        usePolling: true,
        interval: 300,
      },
    };
  }

  return config;
};
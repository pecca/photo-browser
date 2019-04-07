const rewireCssModules = require("react-app-rewire-css-modules");
const rewireReactHotLoader = require("react-app-rewire-hot-loader");

module.exports = function override(config, env) {
    config = rewireCssModules(config, env);
    config = rewireReactHotLoader(config, env);
    return config;
}

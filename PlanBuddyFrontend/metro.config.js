const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
// Force disable new architecture
config.resolver.unstable_enablePackageExports = false;
module.exports = config;

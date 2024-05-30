export default ({ config }) => {
  return {
    ...config,
    android: {
      package: "io.expo.client",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    }
  };
};
module.exports = {
  extends: [
    "prettier",
    "airbnb-base"
  ],
  plugins: [
    "prettier"
  ],
  env: {
    jest: true,
    node: true,
    mongo: true,
  }
};

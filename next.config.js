module.exports = {
  future: {
    webpack5: true,
  },
  api: {
    bodyParser: {
      sizeLimit: "1mb",
      externalResolver: true,
    },
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "static.shuffle.dev",
      "localhost",
      "localhost:3000",
      "gateway.pinata.cloud",
    ],
  },
  env: {
    ERC2OAddress:process.env.ERC2OAddress,
    ERC721Address: process.env.ERC721Address,
    Baseurl: process.env.Baseurl,
    MONGO_URI: process.env.MONGO_URI,
    PINATA_BEARER_TOKEN: process.env.PINATA_BEARER_TOKEN,
  },

  webpack: (config, {
    buildId,
    dev,
    isServer,
    defaultLoaders,
    webpack
  }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    );
    // Important: return the modified config
    return config;
  },
};

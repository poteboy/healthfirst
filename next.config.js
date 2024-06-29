const { withKumaUI } = require("@kuma-ui/next-plugin");
const { withContentlayer } = require("next-contentlayer");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: false,
});

const nextConfig = {
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

module.exports = withBundleAnalyzer(withKumaUI(withContentlayer(nextConfig)));

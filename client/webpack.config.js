const path = require("path");
module.exports = env => {
    const isProduction = env === "production";
    return {
        entry: "./src/index.js",
        output: {
            path: path.join(__dirname, "public"),
            filename: "bundle.js"
        },
        module: {
            rules: [{
                    loader: "babel-loader",
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        "file-loader",
                        {
                            loader: "image-webpack-loader",
                            options: {
                                bypassOnDebug: true, // webpack@1.x
                                disable: true // webpack@2.x and newer
                            }
                        }
                    ]
                }
            ]
        },
        devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            watchContentBase: true,
            proxy: {
                "/backend/*": {
                    target: "http://localhost:5000/",
                    secure: false
                }
            }
        }
    };
};
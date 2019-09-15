const MiniCssExtractPlugin=require('mini-css-extract-plugin');

module.exports={
    mode:"development",
    entry:{
        index:"./index.jsx"
    },
    output:{
        path:`${__dirname}/build`,
        filename:"[name]-build.js"
    },

    module:{
        rules:[
            {
                test:/\.(jsx|js)$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/preset-react"]
                    }
                }
            },
            {
                test:/\.(less|css)$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {loader:"css-loader"},
                    {loader:"less-loader"}
                ]
            }
        ]
    },

    plugins:[
        new MiniCssExtractPlugin({
            filename:"[name]-build.css"
        })
    ],

    optimization:{
        splitChunks:{
            chunks:"all",
            automaticNameDelimiter:"-"
        }
    },

    watch:false
};
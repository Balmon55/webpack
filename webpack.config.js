const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin= require('mini-css-extract-plugin');
const CopyPlugin =require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv =require('dotenv-webpack');
const {CleanWebpackPlugin} =require('clean-webpack-plugin');

module.exports={
    entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'[name].[contenthash].js',
        assetModuleFilename:'assets/images/[hash][ext][query]'
    },
    resolve:{
        extensions: ['.js'],
        // colocamos el nombre del archivo al cual queremos llamar y lluego le agregamos la ruta en la cual se encuantra 
        alias:{ 
            '@utils': path.resolve(__dirname,'src/utils/'),
            '@templates': path.resolve(__dirname,'src/templates/'),
            '@styles': path.resolve(__dirname,'src/styles/'),
            '@images': path.resolve(__dirname,'src/assets/images/'),
        }
    },
    module:{
        rules:[
            //JAVASCRIPT
        {
         test:   /\.m?js$/,
         exclude: /node_modules/,
         use:{
             loader: 'babel-loader'
         }
        },
        //STYLES
        {
         test: /\.css|.styl$/i,
         use: [MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader'
        ],
        },
        //IMAGENES
        {
            test: /\.png/,
            type:'asset/resource'
        },
        //FUENTES
        {
            test: /\.(woff|woff2)$/,
            use:{
                loader:'url-loader',
                options:{
                    limit:10000,
                    mimetype:"application/font-woff",
                    name: "[name].[contenthash].[ext]",
                    outputPath:"./assets/fonts",
                    publicPath: "../assets/fonts",
                    esModule: false
                }
            }
        },
        // Imágenes            
        //  {  test: /.(png|svg|jpg|jpeg|gif)$/i,       
        //     type: 'asset/resource', // loader             
        //     generator: {     
        //     filename: 'assets/images/[hash][ext][query]'       
                  
        // }    },       
        //                 // Fuentes  
        //      { test: /.(woff|woff2|eot|ttf|otf)$/i, 
        //         type: "asset/resource",  
        //         generator: {                     
        //         filename: "assets/fonts/[name].[contenthash].[ext]" 
        //         }       
        //           },
    ]
},
    plugins:[
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html',
        }),  
        new MiniCssExtractPlugin({
            filename:'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns:[
                {
                    from:path.resolve(__dirname, "src", "assets/images"),
                    to:"assets/images"
                }
            ]
        }),
        // agregamos el Dotenv
        new Dotenv(),
        // agregamos el CleanWebpackPlugin
        new CleanWebpackPlugin(),
    ], 
    // agregamos css-minimizer y terser como parte de optimizacion
     
    optimization:{
        minimize: true,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
}
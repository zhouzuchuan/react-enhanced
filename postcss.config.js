module.exports = {
    // parser: 'sugarss',
    plugins: {
        'postcss-import': {},
        'postcss-url': {},
        'postcss-cssnext': {},
        // autoprefixer: {},
        // 'css-mqpacker': {}, // 多个媒体查询合并为一个 https://github.com/hail2u/node-css-mqpacker
        // 'postcss-scss': {},
        // 'postcss-less': {},
        cssnano: {
            //  "zindex": false   // cssnano默认优化z-index
        } // CSS优化的插件包
    }
}
// cssnano优化包括下面一些类型： http://cssnano.co/optimisations/
// 删除空格和最后一个分号
// 删除注释
// 优化字体权重
// 丢弃重复的样式规则
// 优化calc()
// 压缩选择器
// 减少手写属性
// 合并规则

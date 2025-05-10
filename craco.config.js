module.exports = {
  style: {
    postcss: {
      plugins: [
        require('@tailwindcss/postcss')({ content: ['./src/**/*.{js,jsx,ts,tsx}'] }),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      const cssRule = webpackConfig.module.rules.find((rule) =>
        rule.oneOf &&
        rule.oneOf.some(
          (r) => r.test && r.test.toString().includes('.css') && r.use && r.use.some((u) => u.loader && u.loader.includes('css-loader'))
        )
      );

      if (cssRule) {
        cssRule.oneOf = [
          // Process app CSS with PostCSS (Tailwind)
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      ['@tailwindcss/postcss', { content: ['./src/**/*.{js,jsx,ts,tsx}'] }],
                      'autoprefixer',
                    ],
                  },
                },
              },
            ],
          },
          // Process node_modules CSS (e.g., slick-carousel) without PostCSS
          {
            test: /\.css$/,
            include: /node_modules/,
            use: ['style-loader', 'css-loader'],
          },
          ...cssRule.oneOf.filter((r) => !r.test || !r.test.toString().includes('.css')),
        ];
      }

      return webpackConfig;
    },
  },
};
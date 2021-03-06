const { fs, path } = require('@vuepress/shared-utils')

module.exports = ctx => ({
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '算法手册-程序员黑叔',
      description: '愿意天下没有难学的大前端'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', }]
  ],
  themeConfig: {
    repo: 'BlackUncle666/BlackUncle_Blog',
    editLinks: true,
    // docsDir: 'packages/docs/docs',
    locales: {
      '/': {
        editLinkText: '在 GitHub 上编辑此页',
        nav: require('./nav/zh'),
        sidebar: {
          '/guide/': renderSiderBar()
        }
      }
    }
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/google-analytics', {
      ga: 'UA-145821923-1'
    }],
    ['vuepress-plugin-baidu-google-analytics', {
      hm: '009a2f9b8cfc23cb5722f109462e450f',
      ignore_hash: false
    }],
    ['container', {
      type: 'vue',
      before: '<pre class="vue-container"><code>',
      after: '</code></pre>',
    }],
    ['container', {
      type: 'upgrade',
      before: info => `<UpgradePath title="${info}">`,
      after: '</UpgradePath>',
    }],
  ],
  extraWatchFiles: [
    '.vuepress/nav/zh.js',
  ]
})

function renderSiderBar() {
  return ([{
    title: '前言',
    collapsable: true,
    children: [
      '',
    ]
  },
  {
    title: '算法1',
    collapsable: true,
    children: [
      'simpleAlgorithmOne',
    ]
  },
  {
    title: '算法2',
    collapsable: true,
    children: [
      'simpleAlgorithmTwo'
    ]
  },
  {
    title: '算法3',
    collapsable: true,
    children: [
      'simpleAlgorithmThree',
    ]
  },
  {
    title: '算法4',
    collapsable: true,
    children: [
      'simpleAlgorithmFour',
    ]
  },
  {
    title: '算法5',
    collapsable: true,
    children: [
      'simpleAlgorithmFive',
    ]
  },
  {
    title: '算法6',
    collapsable: true,
    children: [
      'simpleAlgorithmSix',
    ]
  },
  {
    title: '算法7',
    collapsable: true,
    children: [
      'simpleAlgorithmSeven',
    ]
  }
  ])
}

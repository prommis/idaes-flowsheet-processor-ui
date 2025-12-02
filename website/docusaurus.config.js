// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'IDAES Flowsheet Processor',
  tagline: 'Run and analyze IDAES flowsheets',
  favicon: 'img/idaes-logo.ico',

  // Set the production url of your site here
  url: 'https://prommis.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/idaes-flowsheet-processor-ui/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'prommis', // Usually your GitHub org/user name.
  projectName: 'idaes-flowsheet-processor', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'IDAES Flowsheet Processor',
        logo: {
          alt: 'IDAES Logo',
          src: 'img/idaes-logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'downloadSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/prommis/idaes-flowsheet-processor-ui',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'More',
            items: [
              {
                label: 'IDAES Project',
                to: 'https://idaes.org/',
              },
              {
                label: 'WaterTAP Project',
                to: 'https://watertap.readthedocs.io/en/stable/',
              },
              {
                label: 'PrOMMiS Project',
                to: 'https://github.com/prommis/prommis',
              },
              // {
              //   label: 'GitHub',
              //   href: 'https://github.com/prommis/idaes-flowsheet-processor-ui',
              // },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} by the software owners. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

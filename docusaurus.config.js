const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "My resume",
  tagline: "resume,front-end",
  url: "https://malaaa.mljlls.tech/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "malaaaa", // Usually your GitHub org/user name.
  projectName: "malaaaa.github.io", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/Malaaaa/blog-sample/tree/main",
        },

        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "My resume",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "My notes",
          },
          {
            href: "https://github.com/Malaaaa",
            position: "right",
            className: "header-github-link",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Malaaaa Site. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
      },
    }),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "zh-CN"],
    localeConfigs: {
      en: {
        htmlLang: "en-GB",
      },
    },
  },
};
module.exports = config;

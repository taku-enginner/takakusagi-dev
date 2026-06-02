export const siteConfig = {
  url: 'https://takakusagi.dev',
  title: 'takakusagi.dev',
  description:
    'takakusagi のポートフォリオ。Web アプリケーションを中心としたものづくりの記録と、関心領域についての発信をしています。',
  author: {
    name: 'takakusagi',
    email: 'taku.enginner@gmail.com',
  },
  links: {
    github: 'https://github.com/taku-enginner',
    email: 'mailto:taku.enginner@gmail.com',
    x: 'https://x.com/takakusagi_dev',
    note: '',
  },
} as const;

export type SiteConfig = typeof siteConfig;

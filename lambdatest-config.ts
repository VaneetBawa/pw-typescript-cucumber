export const config = {
    browserName: 'Chrome',
    browserVersion: 'latest',
    resolution: '1280x1024',
    platform: 'Windows 10',
    user: process.env.LT_USERNAME,
    accessKey: process.env.LT_ACCESS_KEY,
    build: 'Playwright Cucumber TypeScript Build',
    name: 'Sample Test',
    network: true,
    video: true,
    console: true
  };
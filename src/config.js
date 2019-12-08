export default {
  apiUrl: 'http://localhost:3022'
};

const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
const colStyle = {
  marginBottom: '16px',
};
const gutter = 16;
const basicStyle = {
  rowStyle,
  colStyle,
  gutter,
};

const year = (new Date()).getFullYear();

const siteConfig = {
  siteName: 'Digis',
  siteIcon: 'bulb',
  footerText: 'Nexys © ' + year
};

const colors = {
  danger: '#ff5500',
  default: '#d9d9d9',
  primary: '#4482FF',
  success: '#87d068',
  warning: '#faad14'
};

const themeConfig = {
  gutter: 16,
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault',
  theme: 'themedefault'
};

const language = 'english';

export {
  siteConfig,
  themeConfig,
  colors,
  language,
  basicStyle
};
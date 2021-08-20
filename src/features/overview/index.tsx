import lazyLoad from '@components/lazy_load';

const component = lazyLoad(() => import('./view'));

export const pageidentifier = 'overview';

export const route = {
  path: '/',
  component,
  exact: true,
};

export default component;

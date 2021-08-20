import lazyLoad from '@components/lazy_load';

const component = lazyLoad(() => import('./view'));

export const pageidentifier = 'index';

export const route = {
  path: '/',
  component,
};

export default component;

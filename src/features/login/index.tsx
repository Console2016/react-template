import lazyLoad from '@components/lazy_load';

const component = lazyLoad(() => import('./view'));

export const pageidentifier = 'login';

export const route = {
  path: '/login',
  component,
  auth: false,
};

export default component;

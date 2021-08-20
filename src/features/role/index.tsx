import lazyLoad from '@components/lazy_load';

const component = lazyLoad(() => import('./view'));

export const pageidentifier = 'role';

export const route = {
  path: '/role',
  component,
};

export default component;

import lazyLoad from '@components/lazy_load';

const component = lazyLoad(() => import('./view'));

export const pageidentifier = 'notFound';

export const route = {
  path: '/notFound',
  component,
};

export default component;

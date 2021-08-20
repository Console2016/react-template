import React from 'react';
import {useRouteMatch, Redirect, Route, RouteProps} from 'react-router-dom';
import {hasAuth} from '@utils/auth';

interface IAuthRouteProps extends RouteProps {
  auth?: boolean;
}

const Component = (props: IAuthRouteProps) => {
  const {auth = true, exact = false, path, children, render} = props;
  const match = useRouteMatch();

  const isLogin = hasAuth();

  // 不需要登录
  if (!auth) {
    return <Route exact={exact}>{children}</Route>;
  }

  if (isLogin) {
    //   已登录
    if (match.path === '/login') {
      return <Redirect to="/" />;
    }
    return (
      <Route path={path} exact={exact} render={render}>
        {children}
      </Route>
    );
  }
  return (
    <Redirect
      to={{
        pathname: '/login',
        state: {from: match.path},
      }}
    />
  );
};

export default Component;

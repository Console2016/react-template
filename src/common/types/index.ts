import {ReactElement} from 'react';
import {RouteComponentProps} from 'react-router-dom';
export interface IRouteComponentProps extends RouteComponentProps {
  [key: string]: any;
}

export interface IRouteConfig {
  path: string;
  component: (props: any) => ReactElement;
  exact: boolean;
}

import {RouteComponentProps} from 'react-router-dom';
import {IRouteConfig} from '@common/types';

export interface IComponentProps extends RouteComponentProps {
  featureRoutes: IRouteConfig[];
}

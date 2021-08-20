import React, {ComponentType, lazy, Suspense} from 'react';
import {IRouteComponentProps} from '@common/types';

export default function <TProps = IRouteComponentProps>(loadFun: () => Promise<{default: ComponentType<any>}>) {
  const LazyComponent = lazy(loadFun);

  const component = (props: TProps) => {
    return (
      <Suspense fallback={null}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  return component;
}

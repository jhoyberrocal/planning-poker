import { FunctionComponent } from 'react';

export type RouteMetaData = {
  path: string;
  component: FunctionComponent;
  auth?: boolean;
};

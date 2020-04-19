export type LocaleMessages = {
  [key: string]: {
    [prop: string]: string
  }
};

export type ObjectOfString = { [key: string]: [string] };

export type ApplicationError = {
  errorType: string,
  message: ObjectOfString | string,
};

export type RouteConfig = {
  path: string;
  exact: boolean;
  name: string;
  component: any;
};

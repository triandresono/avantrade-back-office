interface RouteParam {
  path: string;
  element: React.ComponentType<any>;
  isShow: boolean;
  isProtected: boolean;
}

export default class Route implements RouteParam {
  path: string;
  element: React.ComponentType<any>;
  isShow: boolean;
  isProtected: boolean;

  constructor({ path, element, isShow, isProtected }: RouteParam) {
    this.path = path;
    this.element = element;
    this.isShow = isShow;
    this.isProtected = isProtected;
  }
}
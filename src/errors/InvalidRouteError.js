import { getFullRoute } from "../utils/express/routePathHelper.js";

class InvalidRouteError extends Error {
  #_route;

  get route() {
    return this.#_route;
  }

  constructor(message, routeReq) {
    const route = getFullRoute(routeReq);
    const fullMessage = `The route ${route} triggered an error: ${message}`;

    super(fullMessage);
    this.#_route = route;
    this.name = "InvalidRouteError";
  }
}

export default InvalidRouteError;

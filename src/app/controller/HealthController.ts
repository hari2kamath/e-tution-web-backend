import { NextFunction, Response } from "express";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";

class HealthController extends AbstractController {

  constructor() {
    super("/health");
    this.initializeRoutes();
  }

  protected initializeRoutes = () => {
    this.router.get(`${this.path}`, this.asyncRouteHandler(this.healthResponse));
  }

  private healthResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {

    const data: any = { message: "Service Up" };
    response.status(200);
    response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));

  }
}

export default HealthController;

import { Request } from "express";
import URLParams from "./urlparams";

export default interface RequestWithUser extends Request {
  startTime?: number;
  userAgent?: {[key: string]: any};
  searchParams?: URLParams; // TODO: perhaps change to Dto and add validation
}

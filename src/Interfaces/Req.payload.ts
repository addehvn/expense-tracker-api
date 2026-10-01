import { Request } from "express";
import { JwtPayload } from "./payload-JWT.inerface";

export interface  AuthRequset extends Request{
  user:JwtPayload
} 
import { ResponseError } from "../error/response-error.js";

export const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }
  err instanceof ResponseError ? 
    res.status(err.status).json({
      errors: err.message
    }).end() :
    res.status(500).json({
      errors: err.message
    }).end();  
};
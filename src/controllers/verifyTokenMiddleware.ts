import express from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken =(req:express.Request, res:express.Response, next: express.NextFunction) => {
  const token = req.headers["authorization"] as string;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    jwt.verify(token, process.env.TOKEN_KEY as string);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};
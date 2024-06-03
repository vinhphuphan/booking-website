import { Response } from 'express';

export const responseData = (
  res: Response,
  message: string,
  code: number,
  data: any,
) => {
  res.status(code).json({
    message,
    code,
    data,
    date: new Date(),
  });
};

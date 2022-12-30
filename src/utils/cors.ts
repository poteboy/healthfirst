import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const cors = Cors();

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: typeof cors
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export function withCors(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("access-control-allow-origin", "*/*");
    res.setHeader(
      "access-control-allow-headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    res.setHeader("credentials", "include");

    if (req.method === "OPTIONS") {
      res.writeHead(200);
      return res.end();
    }
    await runMiddleware(req, res, cors);

    return await handler(req, res);
  };
}

import { createApp } from "../../server/index";
import serverless from "serverless-http";

let handler: any;

export default async (event: any, context: any) => {
  if (!handler) {
    const { app } = await createApp();
    handler = serverless(app);
  }

  return handler(event, context);
};

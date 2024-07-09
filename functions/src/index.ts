import { auth } from "./auth";
import { db } from "./db";
import { initUser as initUserApi, ResultInit } from "./initUser";
import { save as saveStats } from "./save";
import { onRequest } from "firebase-functions/v2/https";

export type InitUserRequest = {
  status: "initUser";
};
const adminUser = ["7034675815"];
export type InitUserResponse = ResultInit;
export const initUser = onRequest({ cors: true }, async (request, response) => {
  const data = request.body.data;
  const userId = auth(data.auth);

  if (userId === null) {
    response
      .status(403)
      .send({ data: { success: false, message: "Unauthorized" } });
    return;
  }
  const result = await initUserApi(userId);

  response.status(200).send({ data: { ...result, success: true } });
});

export const save = onRequest({ cors: true }, async (request, response) => {
  const data = request.body.data;
  const userId = auth(data.auth);
  const gameStats = data.gameStats;

  if (userId === null) {
    response
      .status(403)
      .send({ data: { success: false, message: "Unauthorized" } });
    return;
  }
  if (!gameStats) {
    response
      .status(400)
      .send({ data: { success: false, message: "Bad Request" } });
  }
  const result = await saveStats(userId, gameStats);

  response.status(200).send({ data: { ...result, success: true } });
});

export const uploadConfig = onRequest(
  { cors: true },
  async (request, response) => {
    const data = request.body.data;
    const userId = auth(data.auth);
    const config = data.config;

    if (userId === null || !adminUser.includes(userId)) {
      response
        .status(403)
        .send({ data: { success: false, message: "Unauthorized" } });
      return;
    }
    if (!config) {
      response.status(400).send({
        data: { success: false, message: "Bad Request: No config provided" },
      });
      return;
    }

    try {
      const configRef = db.collection("config").doc("electronic");
      await configRef.set({ config: JSON.parse(config), upload: new Date() });

      response.status(200).send({
        data: { success: true, message: "Config uploaded successfully" },
      });
    } catch (error) {
      response.status(500).send({
        data: {
          success: false,
          message: "Internal Server Error",
          error: error,
        },
      });
    }
  }
);

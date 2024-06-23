import {auth} from "./auth";
import {initUser as initUserApi, ResultInit} from "./initUser";
import {save as saveStats} from "./save";
import {onRequest} from "firebase-functions/v2/https";

export type InitUserRequest = {
  status: "initUser";
};
export type InitUserResponse = ResultInit;
export const initUser = onRequest({cors: true}, async (request, response) => {
  const data = request.body.data;
  const userId = auth(data.auth);

  if (userId === null) {
    response
      .status(403)
      .send({data: {success: false, message: "Unauthorized"}});
    return;
  }
  const result = await initUserApi(userId);

  response.status(200).send({data: {...result, success: true}});
});

export const save = onRequest({cors: true}, async (request, response) => {
  const data = request.body.data;
  const userId = auth(data.auth);
  const gameStats = data.gameStats;

  if (userId === null) {
    response
      .status(403)
      .send({data: {success: false, message: "Unauthorized"}});
    return;
  }
  if (!gameStats) {
    response
      .status(400)
      .send({data: {success: false, message: "Bad Request"}});
  }
  const result = await saveStats(userId, gameStats);

  response.status(200).send({data: {...result, success: true}});
});

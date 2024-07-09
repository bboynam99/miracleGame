import { db } from "./db";
import { User } from "./types";

export type ResultInit = {
  status: "created" | "updated" | "error";
  gameStats: string;
  config: string | null;
};
/**
 * Initialize a user, updating their login rewards and creating a new user if
 * not already existing.
 *
 * @async
 * @param {string} telegramID - The Telegram ID of the user.
 * defaults to null.
 * @return {Promise<ResultInit>} A promise that
 * resolves to an object indicating the status of user initialization.
 */
export async function initUser(telegramID: string): Promise<ResultInit> {
  const userRef = db.collection("users").doc(telegramID);
  const configRef = db.collection("config").doc("electronic");
  const userDoc = await userRef.get();
  const configDoc = await configRef.get();

  if (!configDoc.exists) {
    return {
      status: "error",
      gameStats: "",
      config: null,
    };
  }
  const electronicData = configDoc.data();
  const config = electronicData?.config;

  if (userDoc.exists) {
    const userData = userDoc.data() as User;

    return { status: "updated", gameStats: userData.gameStats, config };
  } else {
    const newUser: User = {
      telegramId: telegramID,
      coins: 0,
      gameStats: "",
    };

    await userRef.set(newUser);

    return {
      status: "created",
      gameStats: "",
      config,
    };
  }
}

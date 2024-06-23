import {db} from "./db";
import {User} from "./types";

export type ResultInit = {
  status: "created" | "updated";
  gameStats: string;
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
  const userDoc = await userRef.get();

  if (userDoc.exists) {
    const userData = userDoc.data() as User;

    return {status: "updated", gameStats: userData.gameStats};
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
    };
  }
}

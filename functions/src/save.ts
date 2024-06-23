import {db} from "./db";

export type ResultInit = {
  status: string;
};
/**
 * Initialize a user, updating their login rewards and creating a new user if
 * not already existing.
 *
 * @async
 * @param {string} telegramID - The Telegram ID of the user.
 * @param {string} gameStats - The game statistics of the user.
 * @return {Promise<{ status: string }>} A promise that
 * resolves to an object indicating the status of user initialization.
 */
export async function save(
  telegramID: string,
  gameStats: string,
): Promise<{ status: string }> {
  const userRef = db.collection("users").doc(telegramID);
  const userDoc = await userRef.get();

  if (userDoc.exists) {
    await userRef.update({gameStats});
    return {status: "updated"};
  } else {
    return {
      status: "user not found",
    };
  }
}

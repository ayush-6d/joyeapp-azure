import { post } from "src/HTTP";
import { UserModel } from "../Models/UserModel";

export async function getAllContacts(
  userId: string = UserModel.getCurrentUserUID()
) {
  try {
    const response = await post(`/contacts/user/${userId}`, {
      userId: "5c01b26df9fa20421fcebcf8",
    });
    response.data.forEach((items) => {});
  } catch (error) {
    throw new Error(error);
  }
}

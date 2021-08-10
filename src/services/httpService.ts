import { post, put } from "src/HTTP";

export async function LoginUser(email: string, pass: string) {
  try {
    const res = await post(`/auth/login`, {
      email: email,
      password: pass,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function CreateUser(
  fname: string,
  lname: string,
  email: string,
  phone: string,
  businessType: string,
  pass: string
) {
  try {
    const res = await post(`/auth/register`, {
      businessType: businessType,
      firstName: fname,
      lastName: lname,
      email: email,
      phone: phone,
      password: pass,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function ResetUserPassword(email: string) {
  try {
    const res = await post("/auth/passwordreset", {
      email: email,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function verifyEmail(email: string) {
  try {
    const res = await post("/auth/findUser", {
      email: email,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function ChangeUserPassword(
  token: string,
  password: string,
  confirmPassword: string
) {
  try {
    const res = await post(`/auth/changePassword/?token=${token}`, {
      password,
      confirmPassword,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function AccountVerify(token: string) {
  try {
    const res = await post(`/account/verify/?token=${token}`, {});
    return res;
  } catch (error) {
    throw error;
  }
}

export async function GenerateVerifytoken(token: string) {
  try {
    const res = await put(`/account/verify/?token=${token}`, {});
    return res;
  } catch (error) {
    throw error;
  }
}

export async function CheckUserExist(email: string) {
  try {
    const res = await post("/findUser", {
      email: email,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function SetTargetAmount(amount: string, userId: string) {
  try {
    const res = await post(`/saveTarget`, {
      amount: amount,
      userId: userId,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

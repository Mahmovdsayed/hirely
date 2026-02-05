"use server";

import { Context } from "hono";
import { cookies } from "next/headers";
import z from "zod";

const userTokenValidation = z.object({
  token: z.string(),
});

type UserTokenValidation = z.infer<typeof userTokenValidation>;

export const setUserTokenAction = async (c: Context) => {
  try {
    const body = (await c.req.json()) as UserTokenValidation;
    const { token } = body;

    if (!token)
      return c.json({
        success: false,
        message: "Token is required",
      });

    (await cookies()).set("token", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });

    return c.json({
      success: true,
      message: "Token set successfully",
    });
  } catch (error) {
    return c.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

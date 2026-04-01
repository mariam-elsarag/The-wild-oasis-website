"use server";

import { signIn, signOut } from "./auth";

export async function siginInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function siginOutAction() {
  await signOut({ redirectTo: "/" });
}

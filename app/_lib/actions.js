"use server";

import { prisma } from "@/lib/prisma";
import { auth, signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }
  const nationalId = formData.get("nationalId");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalId)) {
    throw new Error("Please provide a valid naitional ID");
  }
  const updateData = { nationality, countryFlag, nationalId };
  try {
    await prisma.User.update({
      where: {
        id: session?.user?.userId,
      },
      data: updateData,
    });
    revalidatePath("/account/profile");
  } catch (err) {
    throw new Error("Guest couldn't be updated");
  }
  console.log("update profile", updateData);
}

export async function siginInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function siginOutAction() {
  await signOut({ redirectTo: "/" });
}

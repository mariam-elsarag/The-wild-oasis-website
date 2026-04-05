"use server";

import { prisma } from "@/lib/prisma";
import { auth, signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  redirect("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }

  const booking = await prisma.Booking.findFirst({
    where: {
      id: bookingId,
      userId: session.user.userId,
    },
  });
  if (!booking) {
    throw new Error("You are not allowed to delete this booking");
  }
  try {
    await prisma.Booking.delete({
      where: {
        id: bookingId,
      },
    });
    revalidatePath("/account/reservations");
  } catch (err) {
    throw new Error("Booking could not be deleted");
  }
}
export async function updateReservation(bookingId, formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }
  const booking = await prisma.Booking.findFirst({
    where: {
      id: +bookingId,
      userId: session.user.userId,
    },
  });
  if (!booking) {
    throw new Error("You are not allowed to update this booking");
  }
  const updateData = {
    numGuests: +formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
  };
  try {
    await prisma.Booking.update({
      where: {
        id: +bookingId,
      },
      data: updateData,
    });
  } catch (err) {
    console.log(err, "error");
    throw new Error("Booking could not be updated");
  }

  redirect("/account/reservations");
}
export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be logged in");
  }
  const newBooking = {
    ...bookingData,
    userId: session.user.userId,
    numGuests: +formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "UNCONFIRMED",
    isPaid: false,
    hasBreakfast: false,
  };
  console.log(bookingData, formData, "booking");
  try {
    await prisma.booking.create({
      data: newBooking,
    });
    revalidatePath(`/cabins/${bookingData?.cabinId}`);
  } catch (err) {
    console.error(err);
    throw new Error("Booking could not be created");
  }
  redirect("/cabins/thank-you");
}
export async function siginInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function siginOutAction() {
  await signOut({ redirectTo: "/" });
}

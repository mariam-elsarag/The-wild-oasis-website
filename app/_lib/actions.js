"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { bookingSchema, profileSchema } from "../_utils/zodSchemas";
import { auth, signIn, signOut } from "./auth";

export async function updateProfile(data) {
  const session = await auth();
  if (!session) {
    return { status: "error", message: "You must be logged in" };
  }
  const result = profileSchema.safeParse(data);
  if (!result.success) {
    return {
      status: "error",
      message: result.error.message,
    };
  } else {
    try {
      await prisma.User.update({
        where: {
          id: session?.user?.userId,
        },
        data: data,
      });
      revalidatePath("/account/profile");
      return {
        status: "success",
        message: "Successfully update profile",
      };
    } catch (err) {
      return {
        status: "error",
        message: "Guest couldn't be updated",
      };
    }
    // redirect("/account/profile");
  }
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) {
    return {
      status: "error",
      message: "You must be logged in",
    };
  }

  const booking = await prisma.Booking.findFirst({
    where: {
      id: bookingId,
      userId: session.user.userId,
    },
  });
  if (!booking) {
    return {
      status: "error",
      message: "You are not allowed to delete this booking",
    };
  }
  try {
    await prisma.Booking.delete({
      where: {
        id: bookingId,
      },
    });
    revalidatePath("/account/reservations");
    return {
      status: "success",
      message: "Successfully delete reservation",
    };
  } catch (err) {
    return {
      status: "error",
      message: "Booking could not be deleted",
    };
  }
}
export async function updateReservation(data) {
  const { bookingId, numGuests, observations } = data;
  const result = bookingSchema.safeParse(data);
  if (!result.success) {
    return {
      status: "error",
      message: result.error.message,
    };
  } else {
    const session = await auth();
    if (!session) {
      return {
        status: "error",
        message: "You must be logged in",
      };
    }
    const booking = await prisma.Booking.findFirst({
      where: {
        id: +bookingId,
        userId: session.user.userId,
      },
    });
    if (!booking) {
      return {
        status: "error",
        message: "You are not allowed to update this booking",
      };
    }
    const updateData = {
      numGuests: +numGuests,
      observations: observations,
    };
    try {
      await prisma.Booking.update({
        where: {
          id: +bookingId,
        },
        data: updateData,
      });
    } catch (err) {
      return {
        status: "error",
        message: "Booking could not be updated",
      };
    }
    return {
      status: "success",
      message: "Successfully update reservation",
    };
    // redirect("/account/reservations");
  }
}
export async function createReservation(data) {
  const session = await auth();
  if (!session) {
    return {
      status: "error",
      message: "You are not allowed to update this booking",
    };
  }
  const newBooking = {
    ...data,
    userId: session.user.userId,
    extraPrice: 0,
    totalPrice: data.cabinPrice,
    status: "UNCONFIRMED",
    isPaid: false,
    hasBreakfast: false,
  };

  try {
    await prisma.booking.create({
      data: newBooking,
    });
    revalidatePath(`/cabins/${data?.cabinId}`);
  } catch (err) {
    console.error(err);
    return {
      error: "error",
      message: "Booking could not be created",
    };
  }

  return {
    error: "success",
    message: "Successfully create new reservation",
  };
}
export async function siginInAction() {
  await signIn("google", { redirectTo: "/account/profile" });
}
export async function siginOutAction() {
  await signOut({ redirectTo: "/" });
}

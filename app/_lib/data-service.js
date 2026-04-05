import { prisma } from "@/lib/prisma";
import { eachDayOfInterval } from "date-fns";

import { notFound } from "next/navigation";

/////////////
// GET

export async function getCabin(id) {
  const data = await prisma.cabin.findUnique({
    where: { id: +id },
  });
  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (data == null) {
    notFound();
  }
  return data;
}

export async function getCabinPrice(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export const getCabins = async function (filter) {
  let where = {};

  if (filter === "small") {
    where = {
      maxCapacity: {
        lte: 3,
      },
    };
  }

  if (filter === "medium") {
    where = {
      maxCapacity: {
        gt: 3,
        lt: 8,
      },
    };
  }

  if (filter === "large") {
    where = {
      maxCapacity: {
        gte: 8,
      },
    };
  }

  const data = await prisma.cabin.findMany({
    where,
    orderBy: {
      id: "asc",
    },
  });
  // await new Promise((res) => setTimeout(res, 1000));

  return data;
};

export async function getGuest(email) {
  const data = await prisma.user.findUnique({
    where: {
      email,
      role: "GUEST",
    },
  });
  return data;
}

export async function getBooking(id, userId) {
  try {
    const data = await prisma.booking.findFirst({
      where: {
        id: id,
        userId,
      },
      include: {
        cabin: {
          select: { maxCapacity: true },
        },
      },
    });
    return data;
  } catch (err) {
    console.log(err, "error");
    throw new Error("Booking could not get loaded");
  }
}

export async function getBookings(userId) {
  try {
    const data = await prisma.booking.findMany({
      where: { userId },
      orderBy: { startDate: "asc" },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        numNights: true,
        numGuests: true,
        totalPrice: true,
        status: true,
        createdAt: true,
        cabin: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return data;
  } catch (err) {
    throw new Error("Bookings could not get loaded");
  }
}

export async function getBookedDatesByCabinId(cabinId) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const data = await prisma.booking.findMany({
    where: {
      cabinId: Number(cabinId),
      status: "CHECKIN",
      endDate: {
        gte: today,
      },
    },
  });

  if (data === null) {
    throw new Error("Booking could not get loaded");
  }
  // Convert bookings into disabled dates for date picker
  const bookedDates = data
    .map((booking) =>
      eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      })
    )
    .flat();

  return bookedDates;
}
export async function getSettings() {
  try {
    const data = await prisma.settings.findFirst({
      orderBy: { createdAt: "asc" },
    });

    return data;
  } catch (err) {
    console.error("getSettings error:", err);
    return err;
  }
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest) {
  try {
    const user = await prisma.user.create({
      data: newGuest,
    });
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Guest could not be created");
  }
}

export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

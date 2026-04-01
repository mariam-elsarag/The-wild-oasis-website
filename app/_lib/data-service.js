import { prisma } from "@/lib/prisma";
import { eachDayOfInterval } from "date-fns";
import { da } from "date-fns/locale";
import { notFound } from "next/navigation";

/////////////
// GET

export async function getCabin(id) {
  console.log(id, "id");
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

export async function getBooking(id) {
  const { data, error, count } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookings(guestId) {
  const { data, error, count } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
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

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields) {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(id, updatedFields) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

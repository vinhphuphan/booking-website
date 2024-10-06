import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
      longitude,
      latitude
    } = body;

    // Basic validation
    if (!title || !description || !category || !price || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!longitude || !latitude) {
      return NextResponse.json(
        { error: "Missing longitude or latitude" },
        { status: 400 }
      );
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount: parseInt(roomCount, 10),
        bathroomCount: parseInt(bathroomCount, 10),
        guestCount: parseInt(guestCount, 10),
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
        longitude,
        latitude
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Error in POST request:", error);

    // More detailed error handling
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

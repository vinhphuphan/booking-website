import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"

interface IParams {
    reservationId? : string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
  ) {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      return NextResponse.error();
    }
  
    const { reservationId } = params;
  
    if (!reservationId || typeof reservationId !== "string") {
      return NextResponse.error();
    }
  
    try {
      // Delete a single reservation
      const reservation = await prisma.reservation.delete({
        where: {
          id: reservationId,
        },
        // Ensure only the reservation owned by the user or listing owner is deleted
        include: {
          listing: true,
        },
      });
  
      // Check ownership: Only delete if the user is either the reservation holder or the listing owner
      if (reservation.userId !== currentUser.id && reservation.listing.userId !== currentUser.id) {
        return NextResponse.error();
      }
  
      return NextResponse.json(reservation);
    } catch (error) {
      return NextResponse.error();
    }
  }
  
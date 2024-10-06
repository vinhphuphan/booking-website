import { Listing, Reservation, User } from "@prisma/client";
import { Omit } from "@prisma/client/runtime/library";

export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt : string;
}

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt : string;
    updatedAt : string;
    emailVerified : string | null;
}

export type SafeReservation = Omit<
    Reservation,
    'createAt' | 'startDate' | 'endDate' | 'listing'
> & {
    createAt : string,
    startDate : string,
    endDate : string,
    listing : SafeListing
}


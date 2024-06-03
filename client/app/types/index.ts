import { User } from "@prisma/client";
import { Omit } from "@prisma/client/runtime/library";


export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt : string;
    updatedAt : string;
    emailVerified : string | null;
}
import prisma from "@/app/libs/prismadb";

export interface IListingParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
    latitude? : number | null;
    longtitude? : number | null;
}

export default async function getListings(params: IListingParams) {
    try {
        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category,
            latitude,
            longtitude,
        } = params;

        let query: any = {};

        // Add userId to query if it exists
        if (userId) {
            query.userId = userId;
        }

        // Add category to query if it exists
        if (category) {
            query.category = category;
        }

        // Add roomCount to query if it exists
        if (roomCount) {
            query.roomCount = {
                gte: +roomCount, // greater than or equal to roomCount
            };
        }

        // Add guestCount to query if it exists
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount, // greater than or equal to guestCount
            };
        }

        // Add bathroomCount to query if it exists
        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount, // greater than or equal to bathroomCount
            };
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (latitude) {
            query.latitude = latitude;
        }

        if (longtitude) {
            query.longtitude = longtitude;
        }

        // Add date range filtering based on reservations
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                startDate: { gte: startDate },  
                                endDate: { lte: startDate },  
                            },
                            {
                                startDate: { lte: endDate },  
                                endDate: { gte: startDate },  
                            }
                        ],
                    },
                },
            };
        }

        // Fetch listings from the database
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc", // Sort listings by creation date in descending order
            },
        });

        // Convert `createdAt` to ISO string format for safe use
        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}

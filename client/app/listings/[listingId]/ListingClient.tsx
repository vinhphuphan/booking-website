"use client";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listing/ListingHead";
import ListingInfo from "@/app/components/listing/ListingInfo";
import ListingReservation from "@/app/components/listing/ListingReservation";
import MapBoxForListingPage from "@/app/components/listing/MapBoxForListingPage";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [address, setAddress] = useState<string>("");

  const latitude = listing.latitude;
  const longitude = listing.longitude;

  // Function to fetch address from latitude and longitude
  const fetchAddress = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
        {
          params: {
            access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN, // Replace with your Mapbox token
          },
        }
      );
      const place = response.data.features[0]?.place_name;
      if (place) {
        setAddress(place); // Set the fetched address
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      toast.error("Failed to fetch address");
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchAddress(); // Fetch the address when the component mounts
  }, [fetchAddress]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.refresh();
        router.push("/trips");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      let dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      // Add 1 to dayCount to account for the last night
      dayCount = dayCount > 0 ? dayCount + 1 : 1;

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <div className="pt-4">
      <Container>
        <div className="w-full xl:px-28 mx-auto">
          <div className="flex flex-col gap-4">
            <ListingHead
              title={listing.title}
              imageSrc={listing.imageSrc}
              locationValue={listing.locationValue}
              id={listing.id}
              currentUser={currentUser}
            />
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-7
                md:gap-10
                mt-6
                "
            >
              <div className="col-span-4 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <ListingInfo
                    user={listing.user}
                    category={category}
                    description={listing.description}
                    roomCount={listing.roomCount}
                    guestCount={listing.guestCount}
                    bathroomCount={listing.bathroomCount}
                    locationValue={listing.locationValue}
                  />
                </div>
              </div>

              <div className="order-first mb-10 md:order-last md:col-span-3">
                <ListingReservation
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-xl font-semibold">Where you'll be</div>
              <div className="text-base font-normal">
                {address || "Fetching location..."}
              </div>
              <div className="text-sm font-normal">
                ( Exact Location Provided After Booking )
              </div>
              <div className="w-full h-[60vh] rounded-lg overflow-hidden">
                <MapBoxForListingPage
                  latitude={latitude}
                  longitude={longitude}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ListingClient;

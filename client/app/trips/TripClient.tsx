'use client';

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listing/ListingCard";

interface TripsClientProps {
  reservations?: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    
    const onCancle = useCallback((id : string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation cancelled")
                router.refresh()
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            })
            .finally(()=> {
                setDeletingId('');
            })
    }, [router])

  return (
    <Container>
      <div 
      className="
      mt-44
      px-0
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
      gap-8">
        {reservations?.map((reservation) => (
            <ListingCard 
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancle}
                disabled={deletingId === reservation.id}
                actionLabel="Cancel reservation"
                currentUser={currentUser}

            />
        ))}
      </div>
    </Container>
  );
};

export default TripClient;

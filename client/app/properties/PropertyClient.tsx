'use client';

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listing/ListingCard";

interface TripsClientProps {
  listings?: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertyClient: React.FC<TripsClientProps> = ({
  listings,
  currentUser,
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    
    const onCancle = useCallback((id : string) => {
        setDeletingId(id);

        axios.delete(`/api/listing/${id}`)
            .then(() => {
                toast.success("Listing deleted")
                router.refresh()
            })
            .catch((error) => {
                toast.error(error);
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
        {listings?.map((listing) => (
            <ListingCard 
                key={listing.id}
                data={listing}
                actionId={listing.id}
                onAction={onCancle}
                disabled={deletingId === listing.id}
                actionLabel="Delete listing"
                currentUser={currentUser}

            />
        ))}
      </div>
    </Container>
  );
};

export default PropertyClient;

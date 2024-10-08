import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listing/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
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
      gap-8
    "
      >
        {listings.map((listing) => (
            <ListingCard 
                key={listing.id}
                currentUser={currentUser}
                data={listing}
            />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;

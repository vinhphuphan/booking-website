

import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListing";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import HomeLayout from "./components/HomeLayout";
import ListingCard from "./components/listing/ListingCard";
import { SafeListing } from "./types";

interface HomeProps {
  searchParams: IListingParams;
}

const Home = async ({ searchParams } : HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />
  }

  return (
    <Container>
    <HomeLayout>
    {listings.map((listing : SafeListing) => {
        return (
          <ListingCard 
          key={listing.id}
          data={listing}
          currentUser={currentUser}
          />
        )
      } )}
    </HomeLayout>
    </Container>
  );
}

export default Home;
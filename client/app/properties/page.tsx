import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getListing from "../actions/getListing";
import PropertyClient from "./PropertyClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState 
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    const listings = await getListing({
        userId: currentUser.id
    })

    if (listings.length === 0) {
        return (
            <EmptyState 
                title="No property found"
                subtitle="Looks like you have no property"
            />
        )
    }

    return (
        <PropertyClient 
            listings={listings}
            currentUser={currentUser}
        />
    )
}

export default PropertiesPage;
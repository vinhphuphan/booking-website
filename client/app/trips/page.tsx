import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservations";
import TripClient from "./TripClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState 
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    const reservations = await getReservation({
        userId: currentUser.id
    })

    if (reservations?.length === 0) {
        return (
            <EmptyState 
                title="No trips found"
                subtitle="Looks like you havent reserved any trips."
            />
        )
    }

    return (
        <TripClient 
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default TripsPage;
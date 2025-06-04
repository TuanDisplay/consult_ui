import Home from "~/pages/Home";
import Booking from "~/pages/Booking";
import Message from "~/pages/Message";
import EditProfile from "~/pages/EditProfile";

const priviteRoutes = [
  { path: "/", component: Home },
  { path: "/booking-consult", component: Booking },
  { path: "/message-consult", component: Message },
  { path: "/edit-profile/:expertId", component: EditProfile },
];

export { priviteRoutes };

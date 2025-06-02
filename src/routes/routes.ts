import Home from "~/pages/Home";
import Booking from "~/pages/Booking";
import Message from "~/pages/Message";

const priviteRoutes = [
  { path: "/", component: Home },
  { path: "/booking-consult", component: Booking },
  { path: "/message-consult", component: Message },
];

export { priviteRoutes };

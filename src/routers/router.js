// UserPanel.tsx
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import EmailSent from "../pages/Auth/EmailVerificationSent";
import EmailVerified from "../pages/Auth/EmailVerified";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import Login from "../pages/Auth/Login";
import Profile from "../pages/Auth/Profile";
import Register from "../pages/Auth/Register";
import ResetPassword from "../pages/Auth/ResetPassword";
import BookingConfirmation from "../pages/Bookings/BookingConfirmation";
import UserBookingsList from "../pages/Bookings/UsersBookings";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import AllStays from "../pages/Rooms/AllRooms";
import StayDetails from "../pages/Rooms/SpecificRoom";

function Routerss() {
  // const { currentUser } = useContext(AuthContext);
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register-success" element={<EmailSent />} />
        <Route path="/verify-email" element={<EmailVerified />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/stays" element={<AllStays />} />
        <Route path="/stay/:id" element={<StayDetails />} />
        <Route path="/bookings" element={<UserBookingsList />} />
        <Route
          path="/booking-confirm/:bookingId"
          element={<BookingConfirmation />}
        />
        {/* <Route
          path="/"
          element={
            <PrivateRoute>
              <ResponsiveDrawer />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              currentUser?.role?.displayName === "Super Admin" ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Home />
              )
            }
          />

          <Route path="profile" element={<Profile />} />

          <Route
            path="stays"
            element={
              // <PrivateRoute>
              <SpecificStays />
              // </PrivateRoute>
            }
          />

          {/* Super Admin Dashboard - Restricted to 'Super Admin' role only */}
        {/* <Route
            path="dashboard"
            element={
              <PrivateRoute allowedRoles={["Super Admin"]}>
                <Dashboard />
              </PrivateRoute>
            }
          /> */}
        {/* </Route> */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default Routerss;

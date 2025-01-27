import { People, Square } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Rating,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoginDialog from "../../components/Login Dialog/LoginDialog";
import { AuthContext } from "../../context/authComtext";

const StayDetails = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [loginRedirectState, setLoginRedirectState] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: "",
    checkOut: "",
    totalPrice: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5001/api/hotels/${id}`
        ); // Adjust the API endpoint if needed
        setHotelDetails(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch hotel details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  const handleRoomSelect = (room) => {
    if (!currentUser) {
      toast.info("Please log in to proceed with booking.");
      setLoginRedirectState({ from: location.pathname, room });
      setLoginDialogOpen(true);
      return;
    }
    setSelectedRoom(room);
    setBookingDialogOpen(true);
  };

  const handleBooking = async () => {
    if (!currentUser) {
      toast.info("Please log in to proceed with booking.");
      setLoginRedirectState({ from: location.pathname });
      setLoginDialogOpen(true);
      return;
    }
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `http://localhost:5001/api/bookings?roomId=${selectedRoom._id}&hotelId=${id}`,
        {
          checkIn: bookingDetails.checkIn,
          checkOut: bookingDetails.checkOut,
          totalPrice:
            selectedRoom.price *
            calculateStayDuration(
              bookingDetails.checkIn,
              bookingDetails.checkOut
            ),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );
      console.log(response);

      toast.success("Booking created successfully!");
      navigate(`/booking-confirm/${response.data.booking._id}`);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  // Helper function to calculate stay duration
  const calculateStayDuration = (checkIn, checkOut) => {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;
  };

  const handleLoginSuccess = () => {
    setLoginDialogOpen(false);
    navigate(`stay/${id}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!hotelDetails) {
    return null; // Avoid rendering until hotel details are loaded
  }

  const { name, address, description, rating, rooms, hotelImage } =
    hotelDetails;

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container>
        {/* Property Overview */}
        <Box sx={{ color: "white", mb: 4 }}>
          <Typography variant="h3">{name}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {address}
            </Typography>
            <Rating value={rating} precision={0.1} readOnly />
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {description}
          </Typography>
        </Box>

        {/* Property Amenities */}
        <Box
          sx={{
            background: "rgba(255,255,255,0.1)",
            p: 3,
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
            Property Amenities
          </Typography>
          <Grid container spacing={2}>
            {/* Static amenities */}
            {[
              "Free WiFi",
              "Swimming Pool",
              "Restaurant",
              "Spa",
              "Free Parking",
            ].map((amenity) => (
              <Grid item key={amenity}>
                <Chip
                  label={amenity}
                  color="primary"
                  variant="outlined"
                  sx={{ color: "white", borderColor: "white" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Room Types */}
        <Typography
          variant="h4"
          sx={{ color: "white", mb: 4, textAlign: "center" }}
        >
          Choose Your Stay
        </Typography>
        <Grid container spacing={3}>
          {rooms.map((room) => (
            <Grid item xs={12} md={4} key={room._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={room.roomImages[0] || hotelImage}
                  alt={room.type}
                />
                <CardContent>
                  <Typography variant="h6">{room.type}</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    ${room.price}/night
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">${room.price}/night</Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <People fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        Max {room.maxGuests} Guests
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <Chip
                      icon={<Square />}
                      label={`Size: ${room.size || "N/A"} m²`}
                      size="small"
                    />
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleRoomSelect(room)}
                    sx={{
                      background:
                        "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                    }}
                  >
                    Select Room
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Booking Dialog */}
        <Dialog
          open={bookingDialogOpen}
          onClose={() => setBookingDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Book {selectedRoom?.type}
            <Typography variant="body2" color="text.secondary">
              ${selectedRoom?.price}/night
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6">Select Stay Dates</Typography>
            <TextField
              fullWidth
              type="date"
              // label="Check-In"
              value={bookingDetails.checkIn}
              onChange={(e) =>
                setBookingDetails({
                  ...bookingDetails,
                  checkIn: e.target.value,
                })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              type="date"
              // label="Check-Out"
              value={bookingDetails.checkOut}
              onChange={(e) =>
                setBookingDetails({
                  ...bookingDetails,
                  checkOut: e.target.value,
                })
              }
              sx={{ mt: 2 }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total Price: $
              {selectedRoom &&
                selectedRoom.price *
                calculateStayDuration(
                  bookingDetails.checkIn,
                  bookingDetails.checkOut
                )}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setBookingDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleBooking}
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
              }}
              disabled={!bookingDetails.checkIn || !bookingDetails.checkOut}
            >
              Proceed to Booking
            </Button>
          </DialogActions>
        </Dialog>
        <LoginDialog
          open={loginDialogOpen}
          onClose={() => setLoginDialogOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </Container>
    </Box>
  );
};

export default StayDetails;

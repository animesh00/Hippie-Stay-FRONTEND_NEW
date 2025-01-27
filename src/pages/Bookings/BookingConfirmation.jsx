import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Divider,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import jsPDF from "jspdf";
import {
  CheckCircle as CheckCircleIcon,
  Hotel as HotelIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BookingConfirmation = () => {
  const { bookingId } = useParams(); // Get booking ID from URL
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem("accessToken");

        // Fetch booking details
        const response = await axios.get(
          `http://localhost:5001/api/bookings/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookingDetails(response.data);
      } catch (err) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const generateReceipt = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text("Booking Receipt", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Booking ID: ${bookingDetails._id}`, 105, 30, {
      align: "center",
    });

    // Customer Details
    doc.setFontSize(12);
    doc.text("Customer Details:", 20, 50);
    doc.setFontSize(10);
    doc.text(`Name: ${bookingDetails.userId.name}`, 20, 60); // Replace with user info if available
    doc.text(`Email: ${bookingDetails.userId.email}`, 20, 70); // Replace with user info if available

    // Booking Details
    doc.setFontSize(12);
    doc.text("Booking Information:", 20, 90);
    doc.setFontSize(10);
    doc.text(`Property: ${bookingDetails.hotelId.name}`, 20, 100);
    doc.text(`Location: ${bookingDetails.hotelId.address}`, 20, 110);
    doc.text(
      `Check-in: ${new Date(bookingDetails.checkIn).toLocaleDateString()}`,
      20,
      120
    );
    doc.text(
      `Check-out: ${new Date(bookingDetails.checkOut).toLocaleDateString()}`,
      20,
      130
    );
    doc.text(`Guests: N/A`, 20, 140); // Add guest info if available

    // Payment Details
    doc.setFontSize(12);
    doc.text("Payment Details:", 20, 160);
    doc.setFontSize(10);
    doc.text(`Total Price: $${bookingDetails.totalPrice}`, 20, 170);
    doc.text(`Payment Method: Credit Card`, 20, 180); // Add payment method info if available

    // Footer
    doc.setFontSize(8);
    doc.text("Thank you for your booking!", 105, 250, { align: "center" });

    // Save the PDF
    doc.save(`booking_receipt_${bookingDetails._id}.pdf`);
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <CheckCircleIcon
              sx={{
                color: "green",
                fontSize: 80,
                mb: 2,
              }}
            />
            <Typography variant="h4" sx={{ mb: 1 }}>
              Booking Confirmed
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Thank you for your reservation
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <HotelIcon sx={{ mr: 2, color: "text.secondary" }} />
              <Typography variant="body1">
                {bookingDetails.hotelId.name}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <LocationIcon sx={{ mr: 2, color: "text.secondary" }} />
              <Typography variant="body1">
                {bookingDetails.hotelId.address}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <CalendarIcon sx={{ mr: 2, color: "text.secondary" }} />
              <Typography variant="body1">
                {new Date(bookingDetails.checkIn).toLocaleDateString()} to{" "}
                {new Date(bookingDetails.checkOut).toLocaleDateString()}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <MoneyIcon sx={{ mr: 2, color: "text.secondary" }} />
              <Typography variant="body1">
                Total Price: ${bookingDetails.totalPrice}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Booking ID: {bookingDetails._id}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={generateReceipt}
            >
              Download Receipt
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default BookingConfirmation;

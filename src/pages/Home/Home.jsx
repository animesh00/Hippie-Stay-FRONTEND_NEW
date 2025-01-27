import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  TextField,
  InputAdornment,
  Paper,
  Chip,
} from "@mui/material";
import {
  Search,
  Person,
  CalendarMonth,
  LocationOn,
  CheckCircle,
  SupportAgent,
  CreditCard,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 520 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 520, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const popularDestinations = [
  {
    name: "Tarebhir, Kathmandu",
    image:
      "https://res.cloudinary.com/duaz5kg1m/image/upload/v1737820547/Tarebhir-Hike-Kathmandu-2_uyk1xq.jpg",
  },
  {
    name: "Tarebhir, Kathmandu",
    image:
      "https://res.cloudinary.com/duaz5kg1m/image/upload/v1737820547/Tarebhir-Hike-Kathmandu-2_uyk1xq.jpg",
  },
  {
    name: "Tarebhir, Kathmandu",
    image:
      "https://res.cloudinary.com/duaz5kg1m/image/upload/v1737820547/Tarebhir-Hike-Kathmandu-2_uyk1xq.jpg",
  },
  {
    name: "Tarebhir, Kathmandu",
    image:
      "https://res.cloudinary.com/duaz5kg1m/image/upload/v1737820547/Tarebhir-Hike-Kathmandu-2_uyk1xq.jpg",
  },
];

const specialOffers = [
  { title: "Summer Escape", discount: "20% OFF", code: "SUMMER2024" },
  { title: "Weekend Getaway", discount: "15% OFF", code: "WEEKEND15" },
];

const Home = () => {
  const [searchParams, setSearchParams] = useState({
    location: "",
    guests: "",
    checkIn: "",
    checkOut: "",
  });
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/hotels");
        setRooms(response.data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  console.log(rooms);

  return (
    <Box
      sx={{ background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)" }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            opacity: 0.5,
          }}
        >
          <source src="/api/placeholder/video/travel" type="video/mp4" />
        </video>

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              background: "linear-gradient(45deg, #fff 30%, #e0e0e0 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            HippieStay
          </Typography>

          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      location: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Guests"
                  type="number"
                  value={searchParams.guests}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, guests: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Check In"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={searchParams.checkIn}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      checkIn: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Check Out"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={searchParams.checkOut}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      checkOut: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    onClick={() => navigate("/stays")}
                    fullWidth
                    variant="contained"
                    startIcon={<Search />}
                    sx={{
                      py: 1.5,
                      background:
                        "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                    }}
                  >
                    Search Stays
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    onClick={() => navigate("/stays")}
                    variant="outlined"
                    // color="inherit"
                    sx={{
                      py: 1.5,
                      color: "black",
                      borderColor: "black",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.2)",
                      },
                    }}
                  >
                    Explore Destinations
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>

      {/* Special Offers */}
      <Container sx={{ py: 6, color: "white", textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Special Offers
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {specialOffers.map((offer) => (
            <Grid item xs={12} md={4} key={offer.title}>
              <Paper
                sx={{
                  p: 3,
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <Typography variant="h5">{offer.title}</Typography>
                <Typography variant="h4" color="warning.light">
                  {offer.discount}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Use code: {offer.code}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ py: 6, color: "white" }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Featured Stays
        </Typography>
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          keyBoardControl
          showDots={true}
          containerClass="carousel-container"
        >
          {rooms.map((room) => (
            <Card
              key={room._id}
              sx={{
                margin: "0 auto",
                maxWidth: 350,
                textAlign: "left",
                bgcolor: "rgba(255,255,255,0.9)",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={room.hotelImage}
                alt={room?.type || "Room Image"}
              />
              <CardContent>
                <Typography variant="h6">{room.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  <LocationOn fontSize="small" /> {room.address || "N/A"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Typography variant="h6">
                    Rs. {room.priceRange} / night
                  </Typography>
                  <Typography variant="body2">Available</Typography>
                </Box>
                <Button
                  onClick={() => navigate(`/stay/${room._id}`)}
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    background:
                      "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                  }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </Container>

      {/* Popular Destinations */}
      <Container sx={{ py: 6, color: "white" }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Popular Destinations
        </Typography>
        <Grid container spacing={3}>
          {popularDestinations.map((destination) => (
            <Grid item xs={12} md={3} key={destination.name}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={destination.image}
                  alt={destination.name}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {destination.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us */}
      <Container sx={{ py: 6, color: "white", textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Why Choose HippieStay?
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              icon: <CheckCircle fontSize="large" />,
              title: "Best Price Guarantee",
            },
            {
              icon: <SupportAgent fontSize="large" />,
              title: "24/7 Customer Support",
            },
            {
              icon: <CreditCard fontSize="large" />,
              title: "Flexible Cancellation",
            },
          ].map((feature) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Box>
                {feature.icon}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {feature.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Newsletter Signup */}
      <Container sx={{ py: 6, color: "white", textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Stay Updated
        </Typography>
        <Box sx={{ maxWidth: 600, margin: "auto", display: "flex" }}>
          <TextField
            fullWidth
            label="Enter your email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mr: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

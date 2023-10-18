import { useEffect } from "react";
import "./assets/css/style.css";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import backg from "./assets/images/about-fullscreen-1-1920x700.jpg";
import backg2 from "./assets/images/banner-image-1-1920x500.jpg";
import logo from "./assets/images/logo.png";
import { useState } from "react";
import Carousel from "react-elastic-carousel";
import Select from "react-select";
import Modal from "./Model";
import { DatePicker, Divider, Space } from "antd";
import { createFeedBack } from "./service";
import { toast } from "react-toastify";
const { RangePicker } = DatePicker;

const locations = [{ value: "Indore", label: "Indore" }];

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 850, itemsToShow: 3 },
  { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
  { width: 1450, itemsToShow: 5 },
];

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [isActive, setIsactive] = useState("");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModel, setIsOpenModel] = useState(false);

  // const [startTime, setStartTime] = useState('');
  // const [endTime, setEndTime] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function smoothScrollToSection(id) {
    setIsOpen(false);
    await setIsactive(id);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  // const handleStartTimeChange = (e) => {
  //     setStartTime(e.target.value);
  // };

  // const handleEndTimeChange = (e) => {
  //     setEndTime(e.target.value);
  // };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function handleRangeChange(dates, dateStrings) {
    console.log("dates, dateStrings", dates, dateStrings);

    setSelectedStartDate(dateformat(dateStrings[0]));
    setSelectedEndDate(dateformat(dateStrings[1]));
  }

  function dateformat(dateString) {
    // Extracting date components
    var dateComponents = dateString.split(/[-,:\s]+/);
    var day = parseInt(dateComponents[0], 10);
    var month = parseInt(dateComponents[1], 10) - 1; // Months are 0-based in JavaScript
    var year = parseInt(dateComponents[2], 10);
    var hours = parseInt(dateComponents[3], 10);
    var minutes = parseInt(dateComponents[4], 10);

    // Creating a new Date object
    var convertedDate = new Date(year, month, day, hours, minutes);

    return convertedDate;
  }

  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
      width: "auto",
    }),
  };

  const sendFeedBack = async () => {
    if (!name) toast.error("Please type Name");
    else if (!feedback) toast.error("Please type feedback");
    else {
      var res = await createFeedBack({ name, mobile, feedback });
      setName("");
      setMobile("");
      setFeedback("");
      setIsOpenModel(true);
    }
  };

  return (
    <>
      <header
        className={`header-area header-sticky ${isScrolled ? "scrolled" : ""}`}
      >
        <div class="container">
          <div class="row">
            <div className="col-12 p-0">
              <nav className="navbar navbar-expand-lg navbar-light ">
                <div className="container-fluid">
                  <img
                    className="logo"
                    style={{ width: 200, paddingTop: 0, margin: 0 }}
                    src={logo}
                    alt=""
                  />
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                    style={{ backgroundColor: "#DEE2E4" }}
                  >
                    <span className="test-light navbar-toggler-icon"></span>
                  </button>
                  <div
                    className={`collapse navbar-collapse ${
                      isOpen ? "show" : ""
                    }`}
                    id="navbarSupportedContent"
                  >
                    <ul
                      style={{ color: "black" }}
                      className="navbar-nav me-auto mb-2 mb-lg-0 nav-white"
                    >
                      <li className="nav-item">
                        <a
                          href="index.html"
                          className="nav-link activeLinkHome"
                        >
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#trainers"
                          className={`nav-link ${
                            isActive == "trainers" ? "activeLink" : ""
                          }`}
                          onClick={() => smoothScrollToSection("trainers")}
                        >
                          Cars
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#about"
                          className={`nav-link ${
                            isActive == "schedule" ? "activeLink" : ""
                          }`}
                          onClick={() => smoothScrollToSection("schedule")}
                        >
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#services"
                          className={`nav-link ${
                            isActive == "services" ? "activeLink" : ""
                          }`}
                          onClick={() => smoothScrollToSection("services")}
                        >
                          Services
                        </a>
                      </li>
                      <li className="nav-item" style={{ borderRadius: 5 }}>
                        <a
                          href="#contact"
                          className={`nav-link ${
                            isActive == "contact" ? "activeLink" : ""
                          }`}
                          onClick={() => smoothScrollToSection("contact")}
                        >
                          Contact
                        </a>
                      </li>
                      <li className="nav-item d-flex justify-content-center  align-items-center m-2">
                        <a
                          href="https://www.facebook.com/drive.for.fun.2023?mibextid=ZbWKwL"
                          target="_blank"
                        >
                          <i
                            style={{ fontSize: 20 }}
                            class="fa-brands fa-facebook"
                          ></i>
                        </a>
                      </li>
                      <li className="nav-item d-flex justify-content-center  align-items-center m-2">
                        <a
                          href="https://instagram.com/ddrives4fun?igshid=MzRlODBiNWFlZA=="
                          target="_blank"
                        >
                          <i
                            style={{ fontSize: 20 }}
                            class="fa-brands fa-instagram"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div class="main-banner" id="top">
        <div style={{ position: "relative" }}>
          <div>
            <video autoPlay={true} muted loop id="bg-video">
              <source
                src={require("./assets/images/video.mp4")}
                type="video/mp4"
              />
            </video>
            <div className="calendarBanner">
              <div
                style={{
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 40,
                  height: 60,
                }}
              >
                <div
                  className="date-pic"
                  style={{ padding: "0px 0px 0px 20px" }}
                >
                  <Select
                    options={locations}
                    value={selectedLocation}
                    onChange={handleLocationChange}
                    placeholder="Select City"
                    styles={style}
                  />
                </div>
                <Divider style={{ height: 45 }} type="vertical" />
               
                  <Space direction="vertical" size={5}>
                    <RangePicker
                      format="DD-MM-YYYY , HH:mm"
                      placeholder={["Start", "End"]}
                      style={{ marginLeft: "5px" }}
                      showTime
                      className="date"
                      onChange={handleRangeChange}
                    />
                  </Space>
              
                {/* <input className='timeInput' type="time" value={startTime} onChange={handleStartTimeChange} />
                                <input className='timeInput' type="time" value={endTime} onChange={handleEndTimeChange} /> */}
                <button
                  className="carsBtn car-btn"
                  onClick={() => {
                    if (!selectedLocation)
                      toast.error("Please select Location.");
                    else if (!selectedStartDate)
                      toast.error("Please select start & end date.");
                    else openModal();
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedLocation={selectedLocation}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
        />

        <div class="video-overlay header-text">
          <div class="caption">
            <h6 style={{ fontSize: 30 }}>Journey to Joy!</h6>
            <h2>
              RENT{" "}
              <em style={{ textDecoration: "underline" }}>Self Drive Car</em> in
              Indore!
            </h2>
            <h6 className="discount-blink" style={{ marginBottom: "20px" }}>
              Get 20% OFF on your first rental car.
            </h6>
            <div class="main-button">
              <a href="#contact" style={{ borderRadius: 5 }}>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <section class="section" id="trainers">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 offset-lg-3">
              <div class="section-heading">
                <h2 style={{ color: "#FFD936" }}>
                  Featured <em>Cars</em>
                </h2>
                <p className="yellow-uline"></p>
                <p>Discover Our Diverse Range of Vehicles</p>
              </div>
            </div>
          </div>
          <Carousel
            breakPoints={breakPoints}
            enableAutoPlay={true}
            showArrows={true}
          >
            <div class="trainer-item" style={{ margin: "5px 10px" }}>
              <div class="image-thumb">
                <img src={require("./assets/images/Baleno.jpeg")} alt="" />
              </div>
              <div class="down-content">
                {/* <span>
                                    <del><sup>$</sup>11999 </del> &nbsp; <sup>$</sup>11779
                                </span> */}

                <h4>Baleno</h4>
                <p>
                  {/* <i class="fa fa-dashboard"></i>&nbsp; 130 000km &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                  {/* <i class="fa fa-cube"></i> 1800 cc &nbsp;&nbsp;&nbsp; */}
                  <i class="fa-solid fa-gas-pump"></i>&nbsp;&nbsp;Petrol
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <i class="fa fa-cog"></i>&nbsp; Manual &nbsp;&nbsp;&nbsp;
                </p>

                <ul class="social-icons">
                  <li>
                    <a href="#contact">Book Now</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="trainer-item" style={{ margin: "5px 10px" }}>
              <div class="image-thumb">
                <img src={require("./assets/images/Elitei20.jpeg")} alt="" />
              </div>
              <div class="down-content">
                <h4>Elite i20</h4>

                <p>
                  <i class="fa-solid fa-gas-pump"></i>&nbsp;&nbsp;Petrol
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <i class="fa fa-cog"></i>&nbsp; Manual &nbsp;&nbsp;&nbsp;
                </p>

                <ul class="social-icons">
                  <li>
                    <a href="#contact">Book Now</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="trainer-item" style={{ margin: "5px 10px" }}>
              <div class="image-thumb">
                <img src={require("./assets/images/brezza.jpeg")} alt="" />
              </div>
              <div class="down-content">
                <h4>Brezza</h4>

                <p>
                  <i class="fa-solid fa-gas-pump"></i>&nbsp;&nbsp;Petrol
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <i class="fa fa-cog"></i>&nbsp; Manual &nbsp;&nbsp;&nbsp;
                </p>

                <ul class="social-icons">
                  <li>
                    <a href="#contact">Book Now</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="trainer-item" style={{ margin: "5px 10px" }}>
              <div class="image-thumb">
                <img src={require("./assets/images/creta.jpeg")} alt="" />
              </div>
              <div class="down-content">
                <h4>creta</h4>

                <p>
                  <i class="fa-solid fa-gas-pump"></i>&nbsp;&nbsp;Petrol
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <i class="fa fa-cog"></i>&nbsp; Manual &nbsp;&nbsp;&nbsp;
                </p>

                <ul class="social-icons">
                  <li>
                    <a href="#contact">Book Now</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="trainer-item" style={{ margin: "5px 10px" }}>
              <div class="image-thumb">
                <img src={require("./assets/images/exter.jpeg")} alt="" />
              </div>
              <div class="down-content">
                <h4>Exter</h4>

                <p>
                  <i class="fa-solid fa-gas-pump"></i>&nbsp;&nbsp;Petrol
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <i class="fa fa-cog"></i>&nbsp; Manual &nbsp;&nbsp;&nbsp;
                </p>

                <ul class="social-icons">
                  <li>
                    <a href="#contact">Book Now</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="trainer-item" style={{ margin: "5px 10px" }}>
              <div class="image-thumb">
                <img src={require("./assets/images/fronx.jpeg")} alt="" />
              </div>
              <div class="down-content">
                <h4>Fronx</h4>

                <p>
                  <i class="fa-solid fa-gas-pump"></i>&nbsp;&nbsp;Petrol
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <i class="fa fa-cog"></i>&nbsp; Manual &nbsp;&nbsp;&nbsp;
                </p>

                <ul class="social-icons">
                  <li>
                    <a href="#contact">Book Now</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="trainer-item" style={{ margin: "5px 10px" }}>
              <div class="image-thumb">
                <img
                  src={require("./assets/images/grandi10nios.jpeg")}
                  alt=""
                />
              </div>
              <div class="down-content">
                <h4>Grandi 10 NIOS</h4>

                <p>
                  <i class="fa-solid fa-gas-pump"></i>&nbsp;&nbsp;Petrol
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <i class="fa fa-cog"></i>&nbsp; Manual &nbsp;&nbsp;&nbsp;
                </p>

                <ul class="social-icons">
                  <li>
                    <a href="#contact">Book Now</a>
                  </li>
                </ul>
              </div>
            </div>
          </Carousel>
          <br />
        </div>
      </section>

      <section
        class="section section-bg pb-5"
        id="schedule"
        style={{ backgroundImage: `url(${backg})` }}
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-heading dark-bg">
                <h2 className="mb-2">
                  Read <em>About Us</em>
                </h2>
                <p className="yellow-uline w-25"></p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 contact-img">
              <img
                class="contact"
                src={require("./assets/images/aboutus.jpg")}
                alt="second one"
              />
            </div>
            <div class="col-lg-6">
              <div class="col-lg-12">
                <div class="cta-content text-center">
                  <p>
                    At Drives4Fun, we invite you to embark on an unforgettable
                    journey where the open road becomes your playground. Our
                    newly launched self-drive car rental website grants you the
                    keys to boundless exploration on your terms. From stylish
                    urban rides to rugged off-road escapades, we entrust you
                    with the wheel and the thrill of adventure. Experience a
                    seamless booking process, a diverse fleet of premium
                    vehicles, and the excitement of charting your course.
                  </p>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="cta-content text-center">
                  <p>
                    We believe that every road trip should be a story waiting to
                    be told. Our passion lies in making your travel dreams a
                    reality. With Drives4Fun, the road is your canvas, and the
                    possibilities are endless. Start your road trip adventure
                    today and make memories that will last a lifetime. Are you
                    ready to seize the wheel and write your tale of adventure?
                    Join us at Drives4Fun, where the journey is yours to
                    conquer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section pb-5" id="services">
        <div class="container py-5 ">
          <div class="row">
            <div class="col-lg-6 offset-lg-3">
              <div class="section-heading">
                <h2 className="mb-2" style={{ color: "#FFD936" }}>
                  Our Services
                </h2>
                <p className="yellow-uline w-75"></p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="cta-content text-center">
                <h6
                  className="pb-2"
                  style={{ color: "#FFD936", textDecoration: "underline" }}
                >
                  Self-drive car rental{" "}
                </h6>
                <p style={{ color: "#232d39" }}>
                  {" "}
                  Discover the freedom of the open road with our self-drive car
                  rental service. Choose from a diverse fleet of vehicles, from
                  compact to luxury, and embark on your personalized adventure.
                  With easy booking, competitive rates, and flexible options,
                  explore the world on your terms. Your journey, your way.
                </p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="cta-content text-center">
                <h6
                  className="pb-2"
                  style={{ color: "#FFD936", textDecoration: "underline" }}
                >
                  Car rental with driver{" "}
                </h6>
                <p style={{ color: "#232d39" }}>
                  {" "}
                  Experience carefree travel with our driver-included car rental
                  service. Sit back and enjoy the ride as our skilled drivers
                  take you where you need to go in comfort and style. Whether
                  it's airport pickups or special events, we ensure a
                  stress-free journey tailored to your needs. Your travel, our
                  service.
                </p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="cta-content text-center">
                <h6
                  className="pb-2"
                  style={{ color: "#FFD936", textDecoration: "underline" }}
                >
                  Special car for marriage{" "}
                </h6>
                <p style={{ color: "#232d39" }}>
                  Elevate your special day with our exquisite wedding car
                  service. Make a grand entrance and exit in style with our
                  fleet of elegant vehicles, meticulously adorned for your
                  wedding. Trust us to add a touch of luxury and romance to your
                  unforgettable celebration. Your dream wedding, our iconic
                  ride.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        class="section section-bg m-0 pb-4"
        style={{ backgroundImage: `url(${backg})` }}
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-6 offset-lg-3">
              <div class="section-heading">
                <h2 className="mb-2">
                  Read our <em>Testimonials</em>
                </h2>
                <p className="yellow-uline w-75"></p>
                <p style={{ color: "#fff" }}>
                  "Hear From Our Satisfied Customers"
                </p>
              </div>
            </div>
            <div class="col-lg-6">
              <ul class="features-items">
                <li class="feature-item">
                  <div class="left-icon">
                    <img
                      class="contact"
                      src={require("./assets/images/contact.png")}
                      height="110"
                      alt="second one"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                  <div class="right-content">
                    <h4 style={{ color: "#fff" }}>Harsh Gupta</h4>
                    <p style={{ color: "#fff" }}>
                      <em>
                        "I Booked a car for my family trip which was very
                        comfortable and in great condition."
                      </em>
                    </p>
                  </div>
                </li>
                <li class="feature-item">
                  <div class="left-icon">
                    <img
                      class="contact"
                      src={require("./assets/images/contact.png")}
                      height="110"
                      alt="second one"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                  <div class="right-content">
                    <h4 style={{ color: "#fff" }}>Rishabh Mishra</h4>
                    <p style={{ color: "#fff" }}>
                      <em>
                        "Most trustable car rental. Looking forward to using
                        Drives4Fun again."
                      </em>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="col-lg-6">
              <ul class="features-items">
                <li class="feature-item">
                  <div class="left-icon">
                    <img
                      class="contact"
                      src={require("./assets/images/contact.png")}
                      height="110"
                      alt="training fifth"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                  <div class="right-content">
                    <h4 style={{ color: "#fff" }}>Shubham Shukla</h4>
                    <p style={{ color: "#fff" }}>
                      <em>
                        "Drives4Fun provided best car rental service in Indore."
                      </em>
                    </p>
                  </div>
                </li>
                <li class="feature-item">
                  <div class="left-icon">
                    <img
                      class="contact"
                      src={require("./assets/images/contact.png")}
                      height="110"
                      alt="training fifth"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                  <div class="right-content">
                    <h4 style={{ color: "#fff" }}>Deeksha Soni</h4>
                    <p style={{ color: "#fff" }}>
                      <em>
                        " Clean and comfortable car with affodable price, best
                        in car rental service in indore."
                      </em>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="section pb-5" id="contact">
        <div class="container">
          <div class="row text-center" style={{ paddingBottom: 30 }}>
            <div class="col-lg-6 offset-lg-3">
              <div class="section-heading">
                <h2>
                  {" "}
                  <em>contact info</em>
                </h2>
                <p className="yellow-uline w-50"></p>
              </div>
            </div>

            <div class="row">
              <div class="yello-sub col-lg-4 col-md-6 col-sm-6">
                <div class="icon">
                  <i class="fa fa-phone"></i>
                </div>
                <span style={{ color: "#000" }}>
                  Ritik Sahu :{" "}
                  <a href="tel:+7000856963" style={{ color: "#000" }}>
                    7000856963
                  </a>
                </span>
                <br />
                <span style={{ color: "#000" }}>
                  Mukesh Agnihotri :{" "}
                  <a href="tel:+8319538210" style={{ color: "#000" }}>
                    8319538210
                  </a>
                </span>
                <br />
              </div>

              <div class="yello-sub contact-align col-lg-4 col-md-6 col-sm-6 pb-5">
                <div class="icon">
                  <i class="fa fa-envelope"></i>
                </div>
                <a
                  href="mailto:hrithiksahu555.rs@gmail.com"
                  style={{ color: "#000" }}
                >
                  mailto: drive4funind@gmail.com
                </a>

                <br />
              </div>

              <div class="yello-sub col-lg-4 col-md-6 col-sm-6 pb-5">
                <div class="icon">
                  <i class="fa fa-map-marker"></i>
                </div>
                <span style={{ color: "#000" }}>
                  {" "}
                  Sector R,Ho.no 94 mahalakshmi nagar near Dr.Garg bone and
                  joint clinic
                </span>

                <br />
              </div>
            </div>
          </div>
          <div class="row text-center" style={{ paddingBottom: 30 }}>
            {/* <div class="col-lg-6 offset-lg-3">
                            <div class="section-heading">
                                <h2 > <em>Location</em></h2>
                                <p className='yellow-uline w-50'></p>
                            </div>
                        </div> */}
            <div class="row text-center">
              <div class="col-lg-12 ">
                <iframe
                  src="https://www.google.com/maps/embed/v1/search?q=Drives4fun&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                  title="Location"
                  width="95%"
                  height="400"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        class="section section-bg pb-5"
        id="schedule"
        style={{ backgroundImage: `url(${backg})` }}
      >
        <div class="container">
          <div class="row">
            {/* <div class="col-lg-6 offset-lg-3"> */}
            <div class="col-lg-12">
              <div class="section-heading dark-bg">
                <h2 className="mb-2">
                  FEED<em>Back</em>
                </h2>
                <p className="yellow-uline w-25"></p>
              </div>
              <div>
                <div style={{ marginLeft: "15%", marginRight: "15%" }}>
                  <div>
                    <form>
                      <div className={`form-group mb-3`}>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Enter name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                      <div className={`form-group mb-3`}>
                        <input
                          type="number"
                          className="form-control"
                          id="mobile"
                          value={mobile}
                          placeholder="Enter Mobile"
                          onChange={(e) => {
                            setMobile(e.target.value);
                          }}
                        />
                      </div>
                      <div className={`form-group mb-3`}>
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Your Feedback"
                          value={feedback}
                          onChange={(e) => {
                            setFeedback(e.target.value);
                          }}
                          rows="4"
                        />
                      </div>
                    </form>
                  </div>
                  <div
                    className="modal-footer "
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        sendFeedBack();
                      }}
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="m-0" />
      <footer>
        <div className="container">
          <div class="row">
            <div class="col-lg-6">
              <p>
                © Copyrights 2023 Drives4fun | All rights reserved.
                {/* Copyright © 2023 <a href='http://sanswebsolutions.com' target="_blank">Sans Web Solutions Pvt. ltd.</a> */}
              </p>
            </div>
            <div class="col-lg-6">
              <p>
                Design & Development by{" "}
                <a href="http://sanswebsolutions.com" target="_blank">
                  Sans Web Solutions Pvt. ltd.
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div
        style={{ margin: "auto", background: "rgb(0,0,0,.6)" }}
        className={`modal ${isOpenModel ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content p-2">
            <div className="modal-body py-0 text-center pt-4">
              <CheckCircleIcon
                style={{ fontSize: 50, color: "green" }}
                className="mb-3"
              />
              <h5 className="mb-4">Thank you for Feedback.</h5>
            </div>
            <div
              className="modal-footer "
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button
                onClick={() => setIsOpenModel(false)}
                type="button"
                className="btn btn-primary"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

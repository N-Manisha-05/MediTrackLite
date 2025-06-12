import React from "react";
import { BsGeoAltFill, BsTelephoneFill, BsEnvelopeFill, BsClockFill } from 'react-icons/bs';
import { Container, Row, Col, Card, Button, Navbar, Nav,NavDropdown,Carousel } from "react-bootstrap";
const HomePage = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top" className="shadow-sm p-2">
        <Container>
          <Navbar.Brand href="#">🩺 MediTrack Lite</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link href="/" className="text-white">Home</Nav.Link>
              <Nav.Link href="#about" className="text-white">About Us</Nav.Link>
              <Nav.Link href="#services" className="text-white">Services</Nav.Link>
              <Nav.Link href="#gallery" className="text-white">Gallery</Nav.Link>
              <Nav.Link href="#contact" className="text-white">Contact</Nav.Link>
              <NavDropdown title={<span className="text-white"> Login</span>} id="login-dropdown" menuVariant="dark" className="custom-dropdown">
          <NavDropdown.Item href="/admin/login" >Admin Login</NavDropdown.Item>
          <NavDropdown.Item href="/login">Doctor/Patient Login</NavDropdown.Item>
          
        </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

        {/*carousel*/}

        <Carousel fade interval={3000} className = "mb-5 mt-3">
      <Carousel.Item>
        <img
          loading="eager"
          decoding="async"
          className=" w-100"
          src="/images/carousel(4).jpeg"
          alt="First slide"
          style={{ maxHeight: '550px', objectFit: 'cover' }}
        />
        
      </Carousel.Item>

      <Carousel.Item>
        <img
          loading="eager"
          decoding="async"
          className=" w-100"
          src="/images/carousel(1).jpeg"
          alt="Second slide"
          style={{ maxHeight: '550px', objectFit: 'cover' }}
        />
        
      </Carousel.Item>

      <Carousel.Item>
        <img
          loading="eager"
          decoding="async"
          className=" w-100"
          src="/images/carousel(3).jpeg"
          alt="Third slide"
          style={{ maxHeight: '550px', objectFit: 'cover' }}
        />
        
      </Carousel.Item>
    </Carousel>

      {/* Login Section */}
      <div id = "Login">
      <section className="py-5 text-center">
        <h2 className="mb-4">Logins</h2>
        <Container>
          <Row className="justify-content-center">
            <Col md={3}>
            <Card>
                <Card.Body>
                  <Card.Img variant="top" src="images/admin.jpg" height="170"/>
                  <Card.Title className="mt-3">Admin Login</Card.Title>
                  <a href="/admin/login"> <Button variant="primary" className="mt-2">Login</Button></a>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <Card.Img variant="top" src="images/login.jpeg" height="170" />
                  <Card.Title className="mt-3">Doctor/Patient Login</Card.Title>
                 <a href="/login"> <Button variant="success" className="mt-2">Login</Button></a>
                </Card.Body>
              </Card>
            </Col>
            
          </Row>
        </Container>
      </section>
        </div>

    {/* About Us */}
    <div id="about">
    <section className="py-5 bg-light text-center">
        <Container>
          <h2 className="mb-4">About Us</h2>
          <Row className="align-items-center">
            <Col md={6}>
            <h2 className="text-primary mb-3">About MediTrack Lite</h2>
            <p className="text-muted">
              MediTrack Lite is a modern web platform designed to connect doctors and patients. It offers:
            </p>
            <ul className="text-muted">
              <li>Easy online appointment booking</li>
              <li>Role-based login for Admin, Doctors, and Patients</li>
              <li>Real-time schedule tracking</li>
              <li>Secure and responsive user interface</li>
            </ul>
            
            </Col>
            <Col md={6}>
              <img
                src="/images/gallery(3).jpeg"
                className="img-fluid rounded"
                alt="About"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <p className="text-muted">
              Welcome to Meditrack Lite , a modern solution designed to streamline 
              hospital operations and improve patient care through technology. Our system serves
               as a centralized platform for hospitals, clinics, doctors, administrative staff, 
               and patients to manage appointments, medical records, prescriptions, billing, and 
               more—all in a secure and user-friendly environment. We are committed to empowering
                healthcare providers with tools that reduce manual tasks, improve accuracy, 
                and ensure seamless coordination between departments. With a mission to make 
                healthcare more efficient, accessible, and transparent, we continue to innovate 
                and support hospitals of all sizes in delivering high-quality, organized, and compassionate 
                care.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>

      {/* Services Section */}
      <div id = "services">
      <section className="py-5 bg-light text-center">
        <h2 className="mb-4">Our Services</h2>
        <Container>
        <Row className="justify-content-center">
          
        <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <Card.Img variant="top" src="/images/images.png" height="100" className="rounded w-75"/>
                  <Card.Title className="mt-2">Cardiology</Card.Title>
                  <p className="text-black">Heart care and treatment of cardiovascular diseases</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <Card.Img variant="top" src="/images/orthopedic.jpg" height="100" className="rounded w-75"/>
                  <Card.Title className="mt-2">Orthopedic</Card.Title>
                  <p className="text-black">Bone, joint, and muscle treatment</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <Card.Img variant="top" src="/images/neurology.jpeg" height="100" className="rounded w-75"/>
                  <Card.Title className="mt-2">Neurologist</Card.Title>
                  <p className="text-black"> Brain, spine, and nervous system care</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <Card.Img variant="top" src="/images/pediatrics.jpeg" height="125" className="rounded w-75"/>
                  <Card.Title className="mt-2">Pediatrics</Card.Title>
                  <p className="text-black"> Child health and medical care</p>
                </Card.Body>
              </Card>
            </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          
        <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <Card.Img variant="top" src="/images/ophthamalogy.jpeg" height="130" className="rounded w-75"/>
                  <Card.Title className="mt-2">Ophthalmology</Card.Title>
                  <p className="text-black">Eye care and vision treatments</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <Card.Img variant="top" src="/images/dentistry.jpeg" height="110" className="rounded w-75"/>
                  <Card.Title className="mt-2">Dentistry</Card.Title>
                  <p className="text-black">Dental checkups, surgeries, and oral hygiene</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <Card.Img variant="top" src="/images/ent.jpeg" height="110" className="rounded w-75"/>
                  <Card.Title className="mt-2">ENT (Ear, Nose, Throat)</Card.Title>
                  <p className="text-black">Treatments for sinus, hearing, and throat disorders</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <Card.Img variant="top" src="/images/dermatalogy.png" height="125" className="rounded w-75"/>
                  <Card.Title className="mt-2">Dermatology </Card.Title>
                  <p className="text-black"> Skin, hair, and nail treatments</p>
                </Card.Body>
              </Card>
            </Col>
        </Row>
        </Container>
      </section>
        </div>

      {/* Gallery */}
      <div id = "gallery">
      <section className="py-5 text-center mb-5">
        <h2 className="mb-4">Gallery</h2>
        <Container>
        <Row className="justify-content-center">
        <Col md={3}>
          <img src="/images/gallery(1).jpeg" height="120" className="rounded w-75" alt = ""/>
        </Col>
        <Col md={3}>
          <img src="/images/gallery(2).jpeg" height="120" className="rounded w-75" alt = ""/>
        </Col>
        <Col md={3}>
          <img src="/images/gallery(3).jpeg" height="120" className="rounded w-75" alt = ""/>
        </Col>
        <Col md={3}>
          <img src="/images/gallery(4).jpeg" height="120" className="rounded w-75" alt = ""/>
        </Col>
        </Row>
        <Row className="justify-content-center mt-3">
        <Col md={3}>
          <img src="/images/gallery(5).jpeg" height="120" className="rounded w-75" alt = ""/>
        </Col>
        <Col md={3}>
          <img src="/images/gallery(6).jpeg" height="120" className="rounded w-75" alt = ""/>
        </Col>
        <Col md={3}>
          <img src="/images/gallery(7).jpeg" height="120" className="rounded w-75" alt = ""/>
        </Col>
        <Col md={3}>
          <img src="/images/gallery(8).jpeg" height="120" className="rounded w-75" alt = ""/>
        </Col>
        </Row>
        </Container>
      </section>
        </div>
      

      {/* Contact Us */}
      <h2 className="text-center mb-3">Contact Us</h2>
      <div id="contact" className="bg-dark py-4">
  <Container>
    <Row className="text-center text-white">
      <Col md={4} className="mb-4">
        <h5 className="fw-bold">Meditrack Lite</h5>
        <p className="text-white">Providing quality healthcare services with a personal touch since 2005.</p>
      </Col>
      <Col md={4} className="mb-4">
        <h5 className="fw-bold">Contact Us</h5>
        <p className="text-white"><BsGeoAltFill className="me-2" />123 Medical Center Dr, Healthcare City</p>
        <p className="text-white"><BsTelephoneFill className="me-2" />9876543210</p>
        <p className="text-white"><BsEnvelopeFill className="me-2" />info@meditrack.local</p>
        <p className="text-white"><BsClockFill className="me-2" />Mon-Fri: 8am-7pm, Sat: 9am-5pm</p>
      </Col>
      <Col md={4} className="mb-4">
        <h5 className="fw-bold">Quick Links</h5>
        <ul className="list-unstyled">
          <li><a href="/" className="text-decoration-none text-white">Home</a></li>
          <li><a href="#about" className="text-decoration-none text-white">About</a></li>
          <li><a href="/login" className="text-decoration-none text-white">Our Doctors</a></li>
          <li><a href="/login" className="text-decoration-none text-white">Book Appointment</a></li>
        </ul>
      </Col>
    </Row>
    <hr className="text-white" />
    <p className="text-center text-white mb-0">
      © 2025 Meditrack Lite. All rights reserved.
    </p>
  </Container>
</div>


    </>
  );
};

export default HomePage;
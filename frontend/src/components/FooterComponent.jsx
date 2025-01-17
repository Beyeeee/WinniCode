import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import logoKampusMerdeka from "../assets/img/kampus_merdeka_logo.png"
import logoWinnicode from "../assets/img/WinniCode.png"
import "../dist/css/footer.css"

const FooterComponent = () => {
  return (
    <footer className="auto-width footer-bg border-top border-2">
      <Container>
        <Row className="align-items-center">
          {/* Left Section with Logo */}
          <Col md="4" className="text-center text-md-start mb-4 mb-md-0">
            <div className="container-footer">
              <img
                src={logoWinnicode} // Replace with the actual path to your logo
                alt="Winni Code Logo"
                className="footer-logo mb-3"
              />
              <div className="social-icons">
                <Link to="https://winnicode.com/" style={{ marginRight:'10px'}}>
                  <FontAwesomeIcon icon={faLink} style={{ fontSize: '24px' }}/>
                </Link>
                <Link to="https://www.instagram.com/winnicodeofficial/" style={{marginLeft: '10px'}}>
                  <FontAwesomeIcon icon={faInstagram} style={{fontSize: '24px'}}/>
                </Link>
              </div>
            </div>
          </Col>

          {/* Middle Section with Contact Info */}
          <Col md="4" className="text-center text-md-start mb-4 mb-md-0 mt-4">
            <h5 className="fw-bold">KONTAK KAMI</h5>
            <p className="m-0">Bagian Kominfo</p>
            <p className="m-0">Divisi Development</p>
            <p className="m-0">
              E-Mail: <a href="mailto:winnicodegarudatechofficial@gmail.com">winnicodegarudatechofficial@gmail.com</a>
            </p>
            <p className="m-0">Alamat: Bantul, Yogyakarta</p>
            <p className="m-0">Call Center: +6285159832501 (24 Jam)</p>
          </Col>

          {/* Right Section with Logo and Icons */}
          <Col md="4" className="text-center text-md-end">
            <img
              src={logoKampusMerdeka} // Replace with the actual path to the Kampus Merdeka logo
              alt="Kampus Merdeka Logo"
              className="footer-logo-merdeka mb-3"
            />
            
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;

import { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Nav } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { getTrendingBerita, getBeritaTerkini } from "../api/Pembaca/BeritaApi";
import { getRandomIklan } from "../api/Admin/IklanApi";
import tulisanWinniCode from "../assets/img/TulisanWinnicode.png";

const HomePageGuest = () => {
  const [trendingBerita, setTrendingBerita] = useState([]);
  const [terkiniBerita, setTerkiniBerita] = useState([]);
  const [iklanData, setIklanData] = useState(null); // State untuk data iklan
  const navigate = useNavigate();

  // Mengambil berita trending
  useEffect(() => {
    const fetchTrendingBerita = async () => {
      try {
        const response = await getTrendingBerita();
        if (response.data) {
          setTrendingBerita(response.data);
        } else {
          setTrendingBerita([]);
        }
      } catch (error) {
        console.error("Error fetching trending berita:", error);
      }
    };

    fetchTrendingBerita();
  }, []);

  // Mengambil berita terkini
  useEffect(() => {
    const fetchTerkiniBerita = async () => {
      try {
        const response = await getBeritaTerkini();
        if (response.data) {
          setTerkiniBerita(response.data);
        } else {
          setTerkiniBerita([]);
        }
      } catch (error) {
        console.error("Error fetching terkini berita:", error);
      }
    };

    fetchTerkiniBerita();
  }, []);

  // Mengambil iklan
  useEffect(() => {
    const fetchIklan = async () => {
      try {
        const response = await getRandomIklan();
        if (response.data) {
          setIklanData(response.data);
        } else {
          setIklanData(null);
        }
      } catch (error) {
        console.error("Error fetching iklan:", error);
      }
    };

    fetchIklan();
  }, []);

  // Navigasi ke halaman detail berita
  const handleBeritaClick = (id_berita) => {
    navigate(`/h/berita/${id_berita}`);
  };

  return (
    <div>
      {/* Logo and Navigation Bar */}
      <header className="header">
        <Container>
          <Col md="3" className="align-items-center">
            <img
              src={tulisanWinniCode}
              alt="WinniCode"
              className="max-w-[200px]"
            />
          </Col>
          <Col md="9" className="w-[100%]">
            <div className="bg-pink-400 py-3">
              <Nav className="justify-center">
                <NavLink
                  to="/h/berita/kategori/Technology"
                  className="text-white font-bold text-sm uppercase px-4 no-underline hover:text-pink-100 hover:underline"
                >
                  TECHNOLOGY
                </NavLink>
                <NavLink
                  to="/h/berita/kategori/Movie"
                  className="text-white font-bold text-sm uppercase px-4 no-underline hover:text-pink-100 hover:underline"
                >
                  MOVIE
                </NavLink>
                <NavLink
                  to="/h/berita/kategori/Politics"
                  className="text-white font-bold text-sm uppercase px-4 no-underline hover:text-pink-100 hover:underline"
                >
                  POLITICS
                </NavLink>
                <NavLink
                  to="/h/berita/kategori/Business"
                  className="text-white font-bold text-sm uppercase px-4 no-underline hover:text-pink-100 hover:underline"
                >
                  BUSINESS
                </NavLink>
                <NavLink
                  to="/h/berita/kategori/National"
                  className="text-white font-bold text-sm uppercase px-4 no-underline hover:text-pink-100 hover:underline"
                >
                  NATIONAL
                </NavLink>
                <NavLink
                  to="/h/berita/kategori/Culture"
                  className="text-white font-bold text-sm uppercase px-4 no-underline hover:text-pink-100 hover:underline"
                >
                  CULTURE
                </NavLink>
                <NavLink
                  to="/h/berita/kategori/Beauty"
                  className="text-white font-bold text-sm uppercase px-4 no-underline hover:text-pink-100 hover:underline"
                >
                  BEAUTY
                </NavLink>
                <NavLink
                  to="/h/berita/kategori/Lifestyle"
                  className="text-white font-bold text-sm uppercase px-4 no-underline hover:text-pink-100 hover:underline"
                >
                  LIFESTYLE
                </NavLink>
                <NavLink
                  to="/h/berita/kategori/Sports"
                  className="text-white font-bold text-sm uppercase px-4 no-underline hover:text-pink-100 hover:underline"
                >
                  SPORTS
                </NavLink>
                {/* Tambahkan Link lainnya */}
              </Nav>
            </div>
          </Col>
        </Container>
      </header>

      {/* Main Content */}
      <Container className="mt-5">
        <Row>
          {/* Main News Section */}
          <Col md="8">
            <Carousel>
              {trendingBerita.slice(0, 2).map((berita, index) => (
                <Carousel.Item
                  key={index}
                  onClick={() => handleBeritaClick(berita.id_berita)}
                  className="cursor-pointer"
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/gambar/${berita.gambar_berita}`}
                    className="w-full h-[400px] object-cover"
                    alt={berita.judul_berita}
                  />
                  <Carousel.Caption className="bg-gray-500 bg-opacity-50 p-4">
                    <h4>{berita.judul_berita}</h4>
                    <p>
                      {new Date(berita.tanggal_berita).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
            <h4 className="mt-4 mb-2">Rekomendasi Untuk Anda</h4>
            <Row>
              {trendingBerita.length === 0 ? (
                "Loading Trending Berita..."
              ) : (
                trendingBerita.map((berita, index) => (
                  <Col md="4" className="mb-3" key={index}>
                    <div
                      onClick={() => handleBeritaClick(berita.id_berita)}
                      className="cursor-pointer border border-gray-300 p-2 rounded-lg h-[310px] flex flex-col hover:shadow-md transition"
                    >
                      {berita.gambar_berita ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/gambar/${berita.gambar_berita}`}
                          alt={berita.judul_berita}
                          className="w-full h-[200px] object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center rounded">
                          No Image
                        </div>
                      )}
                      <div className="mt-2 flex-grow">
                        <h5 className="text-lg font-bold">{berita.judul_berita}</h5>
                        <span className="text-xs text-gray-500">
                          {new Date(berita.tanggal_berita).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </Col>
                ))
              )}
            </Row>
          </Col>
          {/* Sidebar */}
          <Col md="4">
            <h4>Berita Terkini</h4>
            {terkiniBerita.length === 0 ? (
              "Loading Terkini Berita..."
            ) : (
              terkiniBerita.map((berita, index) => (
                <div
                  className="flex items-center mb-4 border-b border-gray-300 pb-2 cursor-pointer"
                  key={index}
                  onClick={() => handleBeritaClick(berita.id_berita)}
                >
                  {berita.gambar_berita ? (
                    <img
                      src={`http://127.0.0.1:8000/storage/gambar/${berita.gambar_berita}`}
                      alt={berita.judul_berita}
                      className="mr-2 w-[100px] h-[70px] object-cover"
                    />
                  ) : (
                    <div className="mr-2 w-[100px] h-[70px] bg-gray-200 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                  <div>
                    <h6>{berita.judul_berita}</h6>
                    <span className="text-xs text-gray-500">
                      {new Date(berita.tanggal_berita).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}

            <div className="mt-4 text-center font-bold text-2xl">
              <p>IKLAN</p>
              {iklanData ? (
                <a href={iklanData.link_iklan} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`http://127.0.0.1:8000/storage/gambar/${iklanData.gambar_iklan}`}
                    alt={iklanData.nama_iklan}
                    className="w-full h-full"
                  />
                </a>
              ) : (
                <p>Loading Iklan...</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePageGuest;

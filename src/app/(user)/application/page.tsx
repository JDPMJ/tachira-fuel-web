"use client";
import { Col, Row } from "react-bootstrap";
import googlePlayImage from "@/assets/images/disponible-en-google-play-badge.png";

export default function ApplicationPage() {
  return (
    <div className="container mt-5 col-md-5">
      <Row className="mb-5">
        <div className="text-center" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "200%" }}>
          <span style={{ fontWeight: "bold" }}>¿</span>Qué estás <span className="text-success" style={{ fontWeight: "bold" }}>esperando</span> para <span className="text-success" style={{ fontWeight: "bold" }}>descargarla</span><span  style={{ fontWeight: "bold" }}>?</span>
        </div>
      </Row>
      <Row className="text-center mb-5">
        <Col>
          <div className="ratio ratio-16x9">
            <iframe src="https://www.youtube.com/embed/njUsZYmI_is?si=pgtR_7_3G2SCkGjJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <a href="https://play.google.com/store/apps/details?id=com.jdtech.tachira_fuel">
            <img src={googlePlayImage.src} alt="" className="img-fluid" width="500rem" />
          </a>
        </Col>
      </Row>
    </div>
  );
}

import { Col, Row } from "react-bootstrap";
import logo from "@/assets/images/logo.png";

export default function AboutPage() {
  return (
    <div className="container col-md-5">
      <br />
      <Row className="text-center mt-5">
        <Col>
          <a href="https://play.google.com/store/apps/details?id=com.jdtech.tachira_fuel">
            <img src={logo.src} alt="" className="img-fluid" width="300rem" />
          </a>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <p className="text-justify" style={{ textAlign: "justify" }}>
            Estimado usuario, le notificamos que los datos dados por esta aplicación poseen una orientación únicamente informativa. Combustible Táchira no se hace responsable por las acciones que los usuarios tomen con dicha información.
            Los reportes manejados por la aplicación son extraídos de la cuenta de instagram @combustibletachira. Por lo cual, Combustible Táchira no establece ninguna de los reportes que maneja la aplicación.
          </p>
          <p className="text-justify" style={{ textAlign: "justify" }}>
            Cabe mencionar que, la aplicación no pertenece a ningún ente gubernamental ni posee relaciones con estos. Principalmente se busca ofrecer información de manera más rápida y sencilla.
          </p>
        </Col>
      </Row>
    </div>
  );
}

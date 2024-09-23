"use client";
import { useReportGroup } from "@/contexts/ReportGroupContext";
import { useReport } from "@/contexts/ReportContext";
import { useEffect } from "react";
import { Card, Carousel, Col, Row } from "react-bootstrap";

export default function ReportList() {
  const {reportGroups, loadReportGroups, deleteReportGroup} = useReportGroup();
  const {reports, loadReports, deleteReport} = useReport();

  useEffect(() => {
    loadReportGroups("");
    loadReports("");
  }, []);

  return (
    <div className="container col-md-4">
      <div className="mt-4">
        {reportGroups.map((reportGroup) => (
          <div>
            <Row className="justify-content-md-center">
              <Col className="col-md-auto">
                <Card className="mb-4 bg-light">
                  <Card.Body>
                    <div className="text-center" style={{ fontSize: "120%" }}>{reportGroup.name}</div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col key={reportGroup.id_report_group}>
                {reports.filter(reportFilter => new RegExp(`${reportGroup!.id_report_group}`).test(reportFilter.id_report_group)).map((report) => (
                  <Col key={report.id_report}>
                    <Card className="text-center mb-4">
                      <Card.Header>{report.name}</Card.Header>
                      <Card.Body>
                        <Carousel controls={true} indicators={true} interval={null}>
                          {report.image.map((image) => (
                            <Carousel.Item>
                              <img className="d-block w-100" src={image} />
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </div>
  );
}

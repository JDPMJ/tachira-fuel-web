"use client";
import { useReportGroup } from "@/contexts/ReportGroupContext";
import { useReport } from "@/contexts/ReportContext";
import { useEffect, useState } from "react";
import { Card, Carousel, Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import AddEditReportGroupDialog from "./AddEditReportGroupDialog";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/config/firebase";

export default function ReportTable() {
  const {reportGroups, loadReportGroups, deleteReportGroup} = useReportGroup();
  const {reports, loadReports, loadReportsId, deleteReport} = useReport();

  const [reportGroupsWithReports, setReportGroupsWithReports] = useState<ReportGroup[]>([]);

  /*const loadReportGroupsWithReports = async () => {
    await loadReportGroups("");
    await loadReports("");
    const data = reportGroups.map((reportGroup) => ({
      id_report_group: reportGroup.id_report_group,
      name: reportGroup.name,
      date: reportGroup.date,
      reports: reports.filter(report => new RegExp(`/${reportGroup.id_report_group}/`).test(report.id_report_group))
    }));
    setReportGroupsWithReports(data);
    console.log("Data: ", reportGroupsWithReports);
  };*/

  const handleDelete = async (id: string) => {
    try {
      deleteReportGroup(id);
      const reportsId = await loadReportsId(id);
      reportsId.map(async report => {
        await deleteReport(report.id_report!);
        report.image.map(async image => {
          const storageRef = ref(storage, image);
          deleteObject(storageRef);
        })
      });
      toast.success("Reportes eliminado exitosamente");
    } catch (error) {
      console.log(error);
      toast.error("Problema al intertar eliminar los reportes: " + error);
    }
  };

  useEffect(() => {
    loadReportGroups("");
  }, []);

  return (
    <div className="container">
      <div className="mt-5">
        <div className="mb-3">
          <Row>
            <Col><Form.Control type="text" placeholder="Buscar reporte por fecha" onChange={() => {}} /></Col>
            <Col><AddEditReportGroupDialog variant="add" /></Col>
          </Row>
        </div>
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Nombre</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reportGroups.map((reportGroup) => (
              <tr key={reportGroup.id_report_group} className="">
                <td>{reportGroup.date}</td>
                <td>{reportGroup.name}</td>
                <td className="text-center">
                  <button className="btn btn-danger mx-2" onClick={() => handleDelete(reportGroup.id_report_group!)}>Eliminar</button>
                  <AddEditReportGroupDialog variant="edit" reportGroup={reportGroup} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3}>{reportGroups.length} grupos de reportes</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

/*
        <Row md={4}>
          {reportGroups.map((reportGroup) => (
            <Col key={reportGroup.id_report_group}>
              <Card className="text-center mb-4">
                <Card.Header>{reportGroup.name}</Card.Header>
                <Card.Body>
                  <Carousel controls={true} indicators={true} interval={null}>
                    {reports.filter(report => new RegExp(`${reportGroup.id_report_group}`).test(report.id_report_group)).map((report) => report.image.map((reportImage) => (
                      <Carousel.Item>
                        <img className="d-block w-100" src={reportImage} />
                      </Carousel.Item>
                    )))}
                  </Carousel>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
*/

"use client";
import { useReportGroup } from "@/contexts/ReportGroupContext";
import { useReport } from "@/contexts/ReportsContext";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import ImageUploader from "./ImageUploader";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";
import toast from "react-hot-toast";

export default function AddEditReportGroupDialog({ variant, reportGroup }: { variant: string, reportGroup?: ReportGroup }) {
  const {reportGroups, addReportGroup, loadReportGroups, editReportGroup} = useReportGroup();
  const {reports, addReport, loadReports, deleteReport} = useReport();

  const [reportGroupForm, setReportGroupForm] = useState<ReportGroup>({
    date: "",
    name: ""
  });
  const [renderReportGroupModal, setRenderReportGroupModal] = useState(false);
  const [showReportGroupModal, setShowReportGroupModal] = useState(false);
  const handleShowReportGroupModal = () => {
    setRenderReportGroupModal(true);
    setShowReportGroupModal(true);
  };
  const handleCloseReportGroupModal = () => {
    setRenderReportGroupModal(false);
    setTimeout(() => setShowReportGroupModal(false), 300);
  };
  const [modalTitle, setModalTitle] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [buttonStyle, setButtonStyle] = useState("");
  const [dieselFiles, setDieselFiles] = useState<File[]>([]);
  const [gasolineFiles, setGasolineFiles] = useState<File[]>([]);
  const [informationFiles, setInformationFiles] = useState<File[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReportGroupForm({ ...reportGroupForm, [e.target.name]: e.target.value });
  };

  const initState = () => {
    if (variant == "add") {
      setModalTitle("Agregar Grupo de Reportes");
      setButtonName("Agregar");
      setButtonStyle("primary");
      setReportGroupForm({
        date: getCurrentDate("1"),
        name: getCurrentDate("2")
      });
    } else {
      setModalTitle("Editar Grupo de Reportes");
      setButtonName("Editar");
      setButtonStyle("warning");
      setReportGroupForm({
        date: reportGroup!.date,
        name: reportGroup!.name
      });
    }
  };

  const getCurrentDate = (dateVariant: string): string => {
    if (dateVariant == "1") {
      const fecha = new Date();
      const dia = String(fecha.getDate()).padStart(2, "0");
      const mes = String(fecha.getMonth() + 1).padStart(2, "0");
      const anio = fecha.getFullYear();
      const horas = String(fecha.getHours()).padStart(2, "0");
      const minutos = String(fecha.getMinutes()).padStart(2, "0");
      const segundos = String(fecha.getSeconds()).padStart(2, "0");
      const milisegundos = String(fecha.getMilliseconds()).padStart(2, "0");
      return `${dia}-${mes}-${anio}-${horas}-${minutos}-${segundos}-${milisegundos}`;
    } else if (dateVariant == "2") {
      const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const fecha = new Date();
      const dia = fecha.getDate();
      const mes = meses[fecha.getMonth()];
      const anio = fecha.getFullYear();
      return `${dia} de ${mes} del ${anio}`;
    } else if (dateVariant == "3") {
      const fecha = new Date();
      const horas = String(fecha.getHours()).padStart(2, "0");
      const minutos = String(fecha.getMinutes()).padStart(2, "0");
      const segundos = String(fecha.getSeconds()).padStart(2, "0");
      return `${horas}-${minutos}-${segundos}`;
    } else {
      return "";
    }
  };

  const handleAdd = async () => {
    try {
      const dieselUrls = await Promise.all(
        dieselFiles.map(async (dieselFile) => {
          const storageRef = ref(storage, `Post Images/${getCurrentDate("1")}`);
          await uploadBytes(storageRef, dieselFile);
          return await getDownloadURL(storageRef);
        })
      );
      const gasolineUrls = await Promise.all(
        gasolineFiles.map(async (gasolineFile) => {
          const storageRef = ref(storage, `Post Images/${getCurrentDate("1")}`);
          await uploadBytes(storageRef, gasolineFile);
          return await getDownloadURL(storageRef);
        })
      );
      const informationUrls = informationFiles.length > 0 ? await Promise.all(
        informationFiles.map(async (informationFile) => {
          const storageRef = ref(storage, `Post Images/${getCurrentDate("1")}`);
          await uploadBytes(storageRef, informationFile);
          return await getDownloadURL(storageRef);
        })
      ) : [];
      const res = await addReportGroup({
        date: reportGroupForm.date,
        name: reportGroupForm.name
      });
      await addReport({
        id_report_group: res,
        date: getCurrentDate("1"),
        time: getCurrentDate("3"),
        name: "Diésel",
        image: dieselUrls
      });
      await addReport({
        id_report_group: res,
        date: getCurrentDate("1"),
        time: getCurrentDate("3"),
        name: "Gasolina",
        image: gasolineUrls
      });
      informationFiles.length > 0 && await addReport({
        id_report_group: res,
        date: getCurrentDate("1"),
        time: getCurrentDate("3"),
        name: "Información",
        image: informationUrls
      });
      toast.success("Reportes agregados exitosamente");
      handleCloseReportGroupModal();
    } catch (error) {
      console.log(error);
      toast.error("Problema al intertar agregar los reportes: " + error);
    }
  };

  useEffect(() => {
    loadReportGroups("");
    loadReports("");
    initState();
    console.log(getCurrentDate("2"));
  }, [renderReportGroupModal]);

  return (
    <>
      <Button variant={buttonStyle} onClick={handleShowReportGroupModal}>{buttonName}</Button>
      {renderReportGroupModal &&
        <Modal show={showReportGroupModal} onHide={handleCloseReportGroupModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row md={2} xs={1}>
              <Col>
                <InputGroup className="mb-3 mb-md-0">
                  <InputGroup.Text>Fecha</InputGroup.Text>
                  <Form.Control aria-label="date" id="date" name="date" placeholder="dd-mm-yyyy-hh-mm-ss" value={reportGroupForm.date} onChange={handleChange} />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup className="mb-3 mb-md-3">
                  <InputGroup.Text>Nombre</InputGroup.Text>
                  <Form.Control aria-label="name" id="name" name="name" placeholder="Nombre del reporte..." value={reportGroupForm.name} onChange={handleChange} />
                </InputGroup>
              </Col>
            </Row>
            {variant == "add" ? (
              <Row md={2} xs={1}>
                <Col>
                  <Card className="text-center mb-3">
                    <Card.Header>Información</Card.Header>
                    <Card.Body>
                      <ImageUploader setFiles={setInformationFiles} />
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="text-center mb-3">
                    <Card.Header>Diésel</Card.Header>
                    <Card.Body>
                      <ImageUploader setFiles={setDieselFiles} />
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="text-center">
                    <Card.Header>Gasolina</Card.Header>
                    <Card.Body>
                      <ImageUploader setFiles={setGasolineFiles} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ) : (
              <Row md={2} xs={1}>
                {reports.filter(reportFilter => new RegExp(`${reportGroup!.id_report_group}`).test(reportFilter.id_report_group)).map((report) => (
                  <Col key={report.id_report}>
                    <Card className="text-center mb-3">
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
              </Row>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseReportGroupModal}>Cerrar</Button>
            <Button variant={buttonStyle} onClick={handleAdd}>{buttonName}</Button>
          </Modal.Footer>
        </Modal>
      }
    </>
  );
}

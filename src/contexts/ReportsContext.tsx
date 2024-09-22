"use client";
import { createContext, useContext, useState } from "react";
import { db } from "@/config/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";

export const ReportContext = createContext<{
  reports: FuelReport[];
  addReport: (report: FuelReport) => Promise<void>;
  loadReports: (query: string, id_report_group?: string) => Promise<void>;
  editReport: (report: FuelReport) => Promise<void>;
  deleteReport: (id: string) => Promise<void>;
}>({
  reports: [],
  addReport: async (report: FuelReport) => {},
  loadReports: async (query: string, id_report_group?: string) => {},
  editReport: async (report: FuelReport) => {},
  deleteReport: async (id: string) => {}
});

export const ReportProvider = ({ children }: { children: React.ReactNode }) => {
  const [reports, setReports] = useState<FuelReport[]>([]);
  
  async function addReport(report: FuelReport) {
    console.log("Agregando reporte");
    const newIdReport = doc(collection(db, "reports"));
    await setDoc(newIdReport, {
      date: report.date,
      id_report_group: report.id_report_group,
      image: report.image,
      name: report.name,
      time: report.time
    });
    loadReports("");
  }

  async function loadReports(querySearch: string, id_report_group?: string) {
    if (querySearch == "") {
      const res = await getDocs(query(collection(db, "reports"), orderBy("date", "desc")));
      const data = res.docs.map((report) => Object({id_report: report.id, ...report.data()}));
      setReports(data);
      console.log("Reportes: ", data);
    } else if (querySearch == "id_report_groups") {
      const res = await getDocs(query(collection(db, "reports"), orderBy("date", "desc"), where("id_report_group", "==", id_report_group)));
      const data = res.docs.map((report) => Object({id_report: report.id, ...report.data()}));
      setReports(data);
    } else {
      const res = await getDocs(query(collection(db, "reports"), orderBy("date", "desc")));
      const data = res.docs.map((report) => Object({id_report: report.id, ...report.data()}));
      const exp = new RegExp(`${querySearch}.*`, "i");
      const filteredData = data.filter(report => exp.test(report.date));
      setReports(filteredData);
    }
  }

  async function editReport(report: FuelReport) {
    const res = await setDoc(doc(db, "reports", report.id_report!), {
      date: report.date,
      id_report_group: report.id_report_group,
      image: report.image,
      name: report.name,
      time: report.time
    });
    console.log(res);
    loadReports("");
  }

  async function deleteReport(id: string) {
    const res = await deleteDoc(doc(db, "reports", id));
    console.log(res);
    loadReports("");
  }

  return <ReportContext.Provider value={{ reports, addReport, loadReports, editReport, deleteReport }}>
    {children}
  </ReportContext.Provider>
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReport must be used within a ReportProvider");
  }
  return context;
};
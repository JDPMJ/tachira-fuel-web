"use client";
import { createContext, useContext, useState } from "react";
import { db } from "@/config/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore";

export const ReportGroupContext = createContext<{
  reportGroups: ReportGroup[];
  addReportGroup: (reportGroup: ReportGroup) => Promise<string>;
  loadReportGroups: (query: string) => Promise<void>;
  editReportGroup: (reportGroup: ReportGroup) => Promise<void>;
  deleteReportGroup: (id: string) => Promise<void>;
}>({
  reportGroups: [],
  addReportGroup: async (reportGroup: ReportGroup) => "",
  loadReportGroups: async (query: string) => {},
  editReportGroup: async (reportGroup: ReportGroup) => {},
  deleteReportGroup: async (id: string) => {}
});

export const ReportGroupProvider = ({ children }: { children: React.ReactNode }) => {
  const [reportGroups, setReportGroups] = useState<ReportGroup[]>([]);
  
  async function addReportGroup(reportGroup: ReportGroup) {
    console.log("Agregando grupo de reportes");
    const newIdReportGroup = doc(collection(db, "report_groups"));
    await setDoc(newIdReportGroup, {
      date: reportGroup.date,
      name: reportGroup.name
    });
    loadReportGroups("");
    return newIdReportGroup.id;
  }

  async function loadReportGroups(querySearch: string) {
    const res = await getDocs(query(collection(db, "report_groups"), orderBy("date", "desc")));
    const data = res.docs.map((reportGroup) => Object({id_report_group: reportGroup.id, ...reportGroup.data()}));
    if (querySearch == "") {
      setReportGroups(data);
      console.log("Grupos de reportes: ", data);
    } else {
      const exp = new RegExp(`${querySearch}.*`, "i");
      const filteredData = data.filter(reportGroup => exp.test(reportGroup.date));
      setReportGroups(filteredData);
    }
  }

  async function editReportGroup(reportGroup: ReportGroup) {
    const res = await setDoc(doc(db, "report_groups", reportGroup.id_report_group!), {
      date: reportGroup.date,
      name: reportGroup.name
    });
    console.log(res);
    loadReportGroups("");
  }

  async function deleteReportGroup(id: string) {
    const res = await deleteDoc(doc(db, "report_groups", id));
    console.log(res);
    loadReportGroups("");
  }

  return <ReportGroupContext.Provider value={{ reportGroups, addReportGroup, loadReportGroups, editReportGroup, deleteReportGroup }}>
    {children}
  </ReportGroupContext.Provider>
};

export const useReportGroup = () => {
  const context = useContext(ReportGroupContext);
  if (!context) {
    throw new Error("useReportGroup must be used within a ReportGroupProvider");
  }
  return context;
};
class ReportGroup {
  id_report_group?: string;
  name: string;
  date: string;
  reports?: FuelReport[];

  constructor(
    id_report_group: string,
    name: string,
    date: string,
    reports: FuelReport[]
  ) {
    this.id_report_group = id_report_group;
    this.name = name;
    this.date = date;
    this.reports = reports;
  }
}
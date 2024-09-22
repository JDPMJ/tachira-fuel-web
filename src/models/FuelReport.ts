class FuelReport {
  id_report?: string;
  id_report_group: string;
  image: string[];
  name: string;
  date: string;
  time: string;

  constructor(
    id_report: string,
    id_report_group: string,
    image: string[],
    name: string,
    date: string,
    time: string
  ) {
    this.id_report = id_report;
    this.id_report_group = id_report_group;
    this.image = image;
    this.name = name;
    this.date = date;
    this.time = time;
  }
}
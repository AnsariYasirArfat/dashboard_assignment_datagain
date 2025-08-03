export interface ColumnConfig {
  key: string;
  label: string;
  className: string;
}

export interface AppealData {
  id: string;
  taxYear: string;
  company: string;
  state: string;
  assessor: string;
  accountNumber: string;
  appealedDate: string;
  status: "Not Sent" | "Sent";
  appealedBy: string;
}

export const appealDataColumns: ColumnConfig[] = [
  { key: "taxYear", label: "TAX YEAR", className: "min-w-36" },
  { key: "company", label: "COMPANY", className: "min-w-56" },
  { key: "state", label: "STATE", className: "min-w-32" },
  { key: "assessor", label: "ASSESSOR", className: "min-w-52" },
  { key: "accountNumber", label: "ACCOUNT NUMBER", className: "min-w-52" },
  { key: "appealedDate", label: "APPEALED", className: "min-w-48" },
  { key: "status", label: "STATUS", className: "min-w-36" },
  { key: "appealedBy", label: "APPEALED BY", className: "min-w-36" },
];

export const appealData: AppealData[] = [
  {
    id: "1",
    taxYear: "2017",
    company: "Alabama and Gulf Coast Railway LLC",
    state: "AL",
    assessor: "Wilcox County Tax Collector",
    accountNumber: "1_87060",
    appealedDate: "June 25, 2017",
    status: "Not Sent",
    appealedBy: "Jack Ryan",
  },
  {
    id: "2",
    taxYear: "2018",
    company: "First Coast Railroad Inc.",
    state: "GA",
    assessor: "Camden County Tax",
    accountNumber: "UTIL150_Camden County",
    appealedDate: "June 25, 2018",
    status: "Not Sent",
    appealedBy: "Jack Ryan",
  },
  {
    id: "3",
    taxYear: "2019",
    company: "Buffalo and Pittsburgh Railroad, Inc.",
    state: "NY",
    assessor: "City Of Buffalo Assessor",
    accountNumber: "10782900",
    appealedDate: "June 25, 2019",
    status: "Sent",
    appealedBy: "Jack Ryan",
  },
  {
    id: "4",
    taxYear: "2020",
    company: "Conecuh Valley Railway, LLC",
    state: "OH",
    assessor: "Ellicottville Tax Collector",
    accountNumber: "043689 38.004-1-31",
    appealedDate: "June 25, 2020",
    status: "Not Sent",
    appealedBy: "Jack Ryan",
  },
  {
    id: "5",
    taxYear: "2021",
    company: "Georgia Central Railway LP",
    state: "KY",
    assessor: "Pike County Revenue Commissioner",
    accountNumber: "PUBUT-000780 (TROY)-50054",
    appealedDate: "June 25, 2021",
    status: "Not Sent",
    appealedBy: "Jack Ryan",
  },
  {
    id: "6",
    taxYear: "2022",
    company: "KWT Railway Inc.",
    state: "UT",
    assessor: "City Of Dublin",
    accountNumber: "400 294_400 294",
    appealedDate: "June 25, 2022",
    status: "Sent",
    appealedBy: "Jack Ryan",
  },
];

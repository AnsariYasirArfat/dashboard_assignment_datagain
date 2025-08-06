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

export interface ColumnConfig {
  key: string;
  label: string;
  className: string;
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

const stateCodes = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const newEntries: AppealData[] = Array.from({ length: 94 }, (_, i) => {
  const id = (i + 1).toString();
  const taxYear = (1922 + i).toString(); 
  const company = `New Railway Company ${id}`;
  const state = stateCodes[i % 50];
  const assessor = `New Assessor ${id}`;
  const accountNumber = `NEW_ACCT${String(i + 1).padStart(3, '0')}`; 
  const appealedDate = `June 25, ${taxYear}`;
  const status = i % 2 === 0 ? "Not Sent" : "Sent"; 
  const appealedBy = "Jack Ryan";
  return { id, taxYear, company, state, assessor, accountNumber, appealedDate, status, appealedBy };
});

const originalEntries: AppealData[] = [
  {
    id: "95", 
    taxYear: "2022",
    company: "KWT Railway Inc.",
    state: "UT",
    assessor: "City Of Dublin",
    accountNumber: "400 294_400 294",
    appealedDate: "June 25, 2022",
    status: "Sent",
    appealedBy: "Jack Ryan",
  },
  {
    id: "96",
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
    id: "97",
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
    id: "98", 
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
    id: "99", 
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
    id: "100",
    taxYear: "2017",
    company: "Alabama and Gulf Coast Railway LLC",
    state: "AL",
    assessor: "Wilcox County Tax Collector",
    accountNumber: "1_87060",
    appealedDate: "June 25, 2017",
    status: "Not Sent",
    appealedBy: "Jack Ryan",
  },
];

// Combine new and original entries
export const initialAppealData: AppealData[] = [...newEntries, ...originalEntries].reverse();
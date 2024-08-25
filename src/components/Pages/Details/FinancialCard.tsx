import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Details.css";

interface HistoryData {
  key: string;
  date: string;
  type: string;
  number: string;
  warehouse: string;
  value: string;
}

interface FinancialData {
  key: string;
  index: string;
  documentName: string;
  relatedDocument: string;
  approved?: string;
  forApproval?: string;
  note?: string;
}

const columnsHistory = [
  {
    title: "Datum",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Tip",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Broj",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Magacin",
    dataIndex: "warehouse",
    key: "warehouse",
  },
  {
    title: "Vrednost",
    dataIndex: "value",
    key: "value",
  },
];

const dataHistory: HistoryData[] = [
  {
    key: "1",
    date: "22.10.2023",
    type: "Račun",
    number: "2843/23/NI",
    warehouse: "Magacin Niš",
    value: "112,754.00",
  },
  {
    key: "2",
    date: "12.09.2023",
    type: "Račun",
    number: "2714/23/NI",
    warehouse: "Magacin Niš",
    value: "65,989.21",
  },
  {
    key: "3",
    date: "05.07.2023",
    type: "Račun",
    number: "2699/23/BG",
    warehouse: "Magacin Beograd",
    value: "5,335.07",
  },
];

const columnsFinancial = [
  {
    title: "Redni broj",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Naziv dokumenta",
    dataIndex: "documentName",
    key: "documentName",
  },
  {
    title: "Povezani dokument",
    dataIndex: "relatedDocument",
    key: "relatedDocument",
  },
  {
    title: "Odobreno",
    dataIndex: "approved",
    key: "approved",
  },
  {
    title: "Za odobrenje",
    dataIndex: "forApproval",
    key: "forApproval",
  },
  {
    title: "Napomena",
    dataIndex: "note",
    key: "note",
  },
];

const dataFinancial: FinancialData[] = [];

const FinancialCard: React.FC = () => {
  return (
    <Tabs focusTabOnClick={false}>
      <TabList style={{ display: "flex", justifyContent: "space-between" }}>
        <Tab
          style={{
            flex: "1",
          }}
        >
          Kompenzacije
        </Tab>
        <Tab style={{ flex: "1", textAlign: "center" }}>Knjižna odobrenja</Tab>
        <Tab style={{ flex: "1", textAlign: "center" }}>Knjižna zaduženja</Tab>
      </TabList>

      {/* Repeat similar structure for other TabPanels if needed */}

      <TabPanel>
        <div className="users">
          <table>
            <thead>
              <tr>
                <th>Redni broj</th>
                <th>Naziv dokumenta</th>
                <th>Povezani dokument </th>
                <th>Kompenzovano</th>
                <th>Za kompenzaciju </th>
                <th>Napomena</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              <tr></tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </TabPanel>

      <TabPanel>
        <div className="users">
          <table>
            <thead>
              <tr>
                <th>Redni broj</th>
                <th>Naziv dokumenta</th>
                <th>Povezani dokument </th>
                <th>Kompenzovano</th>
                <th>Za kompenzaciju </th>
                <th>Napomena</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              <tr></tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="users">
          <table>
            <thead>
              <tr>
                <th>Redni broj</th>
                <th>Naziv dokumenta</th>
                <th>Povezani dokument </th>
                <th>Kompenzovano</th>
                <th>Za kompenzaciju </th>
                <th>Napomena</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              <tr></tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default FinancialCard;

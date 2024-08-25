import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Details.css";

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

const dataHistory = [
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
    title: "Datum",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Šifra",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Ime",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Količina",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Ukupna vrednost",
    dataIndex: "totalValue",
    key: "totalValue",
  },
];

const dataFinancial = [
  {
    key: "1",
    date: "28.07.2023",
    code: "FM165",
    name: "Fasadna mrežica 165g, 4x4mm",
    quantity: "2500m²",
    totalValue: "875,000.00 RSD",
  },
];

const History: React.FC = () => {
  return (
    <Tabs focusTabOnClick={false}>
      <TabList style={{ display: "flex", justifyContent: "space-between" }}>
        <Tab
          style={{
            flex: "1",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          Fakture
        </Tab>
        <Tab style={{ flex: "1", textAlign: "center" }}>
          Šta sam kupio u Grometu
        </Tab>
      </TabList>

      {/* Repeat similar structure for other TabPanels if needed */}

      <TabPanel>
        <div className="users">
          <table>
            <thead>
              <tr>
                <th>Datum</th>
                <th>Tip</th>
                <th>Broj</th>
                <th>Magacin</th>
                <th>Vrednost</th>
                <th>Komentar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>22.10.2023.</td>
                <td>Račun</td>
                <td>2843/23/NI</td>
                <td>Magacin Niš</td>
                <td>112,754.00</td>
                <td></td>
              </tr>
              <tr>
                <td>12.09.2023.</td>
                <td>Račun</td>
                <td>2714/23/NI</td>
                <td>Magacin Niš</td>
                <td>65,989.21</td>
                <td></td>
              </tr>
              <tr>
                <td>05.07.2023.</td>
                <td>Račun</td>
                <td>2699/23/BG</td>
                <td>Magacin Beograd</td>
                <td>5,335.07</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </TabPanel>

      <TabPanel>
        <div className="users">
          <table>
            <thead>
              <tr>
                <th>Datum</th>
                <th>Šifra</th>
                <th>Ime</th>
                <th>Količina</th>
                <th>Ukupna vrednost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>28.07.2023.</td>
                <td>FM165</td>
                <td>Fasadna mrežica 165g 4x4mm</td>
                <td>
                  2500m²
                  <button className="dodaj">DODAJ</button>
                </td>
                <td>875.000,00 RSD</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default History;

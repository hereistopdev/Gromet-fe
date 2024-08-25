import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Details.css";

const categories = ["FARBARE", "GVOŽĐARE", "STOVARIŠTA", "SALONI KERAMIKE"];
const articles = [
  "Artikl 1",
  "Artikl 2",
  "Artikl 3",
  "Artikl 4",
  "Artikl 5",
  "Artikl 6",
  "Artikl 7",
];

const renderArticles = () => (
  <table className="users" style={{ width: "100%" }}>
    <thead></thead>
    <tbody>
      {articles.map((article, index) => (
        <tr>
          <td key={index}>{`${index + 1}. ${article}`}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const RecommendedPurchase: React.FC = () => {
  return (
    <Tabs focusTabOnClick={false}>
      <TabList style={{ display: "flex", justifyContent: "space-between" }}>
        <Tab
          style={{
            flex: "1",
          }}
        >
          Moji favoriti
        </Tab>
        <Tab style={{ flex: "1", textAlign: "center" }}>Mapa kupovine</Tab>
      </TabList>

      <TabPanel>
        <div className="users">
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>1. Artikl 1</td>
              </tr>
              <tr>
                <td>2. Artikl 2</td>
              </tr>
              <tr>
                <td>2. Artikl 2</td>
              </tr>
              <tr>
                <td>3. Artikl 3</td>
              </tr>
              <tr>
                <td>4. Artikl 4</td>
              </tr>
              <tr>
                <td>5. Artikl 5</td>
              </tr>
              <tr>
                <td>6. Artikl 6</td>
              </tr>
              <tr>
                <td>7. Artikl 7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TabPanel>

      <TabPanel>
        <div
          style={{ display: "flex", width: "100%" }}
          className="purchase-tabs"
        >
          <Tabs
            focusTabOnClick={false}
            selectedTabClassName="selectedTab"
            style={{ display: "flex", width: "100%" }}
          >
            <TabList style={{ minWidth: "200px", marginRight: "20px" }}>
              {categories.map((category, index) => (
                <Tab key={index}>{category}</Tab>
              ))}
            </TabList>

            {categories.map((_, index) => (
              <TabPanel key={index} style={{ width: "100%" }}>
                {renderArticles()}
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default RecommendedPurchase;

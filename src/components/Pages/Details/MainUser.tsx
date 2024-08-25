import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Details.css";
import prize from "../../../assets/prize.png";

import Services from "../Services";

export interface UserInfo {
  username: string;
  companyName: String;
  pib: string;
  _id: string;
  officialEmail: string;
  email: string;
  phone: string;
  grad: string;
  commercial: string;
  rebate: [
    {
      category: String;
      value: String;
      limit: String;
    }
  ];
}

interface MainUserProps {
  userInfo: UserInfo | null | undefined;
}

let services = [
  "Osnovni podaci",
  "Komercijalni uslovi",
  "Ugovori",
  "Adrese isporuke",
  "Korisnici",
];

const MainUser: React.FC<MainUserProps> = ({ userInfo }) => {
  console.log("useInfo: ", userInfo);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddClick = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = () => {
    // Here you would handle the form submission, e.g., send data to an API
    console.log("Name:", name);
    console.log("Email:", email);
    // Reset form and close modal
    setName("");
    setEmail("");
    setShowModal(false);
  };
  return (
    <div>
      <div className="mainBox">
        <Tabs focusTabOnClick={false}>
          <TabList style={{ display: "flex", justifyContent: "space-between" }}>
            <Tab
              style={{
                flex: "1",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              Osnovni podaci
            </Tab>
            <Tab style={{ flex: "1", textAlign: "center" }}>
              Komercijalni uslovi
            </Tab>
            <Tab style={{ flex: "1", textAlign: "center" }}>Ugovori</Tab>
            <Tab style={{ flex: "1", textAlign: "center" }}>
              Adrese isporuke
            </Tab>
            <Tab style={{ flex: "1", textAlign: "center" }}>Korisnici</Tab>
          </TabList>

          {/* Repeat similar structure for other TabPanels if needed */}
          <TabPanel>
            <div>
              <div className="itemRow">
                <div className="itemName">Naziv firme:&nbsp;</div>
                <div>{userInfo?.companyName}</div>
              </div>
              <div className="itemRow">
                <div className="itemName">Skraćeni naziv:&nbsp;</div>
                <div>{userInfo?.username}</div>
              </div>
              <div className="itemRow">
                <div className="itemName">PIB:&nbsp;</div>
                <div>{userInfo?.pib}</div>
              </div>
              <div className="itemRow">
                <div className="itemName">Matični broj:&nbsp;</div>
                <div>{userInfo?._id}</div>
              </div>
              <div className="itemRow">
                <div className="itemName">Zvanični E-mail:&nbsp;</div>
                <div>{userInfo?.email}</div>
              </div>
              <div className="itemRow">
                <div className="itemName">E-mail:&nbsp;</div>
                <div>{userInfo?.email}</div>
              </div>
              <div className="itemRow">
                <div className="itemName">Broj telefona:&nbsp;</div>
                <div>{userInfo?.phone}</div>
              </div>
              <div className="itemRow">
                <div className="itemName">Grad:&nbsp;</div>
                <div>{userInfo?.grad}</div>
              </div>
              <div className="itemRow">
                <div className="itemName">Moj komercijalsita:&nbsp;</div>
                <div>{userInfo?.commercial}</div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <div className="itemRow">
                <div className="itemName">Rabat:&nbsp;</div>
                <div>{userInfo?.rebate[0].category}</div>
              </div>
              <div className="itemRow">
                <div className="itemName">Valuta:&nbsp;</div>
                <div>{userInfo?.rebate[0].value}</div>
              </div>
              <div className="itemRow">
                <div className="itemName">Kreditni limit:&nbsp;</div>
                <div>{userInfo?.rebate[0].limit}</div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <img
              src={prize}
              alt="prize img"
              width="660px"
              className="prize-img"
            />
          </TabPanel>

          <TabPanel>
            <div className="address-tab">
              <table className="table">
                <thead>
                  <tr>
                    <th>ADRESA</th>
                    <th>KONTAKT</th>
                    <th>RADNO VREME</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dobri Španca BB, 16000, Leskovac</td>
                    <td>062797590</td>
                    <td>
                      <ul>
                        <li>Pon - Pet: 8 do 16h</li>
                        <li>Sub: 8-14h, Nedelja neradna</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Adresa 2</td>
                    <td>018/228 898</td>
                    <td>
                      <ul>
                        <li>Pon - Pet: 8 do 16h</li>
                        <li>Sub: 8-14h, Nedelja neradna</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Adresa 3</td>
                    <td>018/228 899</td>
                    <td>
                      <ul>
                        <li>Pon - Pet: 8 do 16h</li>
                        <li>Sub: 8-14h, Nedelja neradna</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>

              <p className="paragraph">
                *Ukoliko želite da izmenite postojeće ili dodate nove adrese,
                pošaljite nam zahtev sa detaljima na e-mail:{" "}
                <strong>podrska@gromet.rs</strong>
              </p>
              <button className="button">
                Pošalji zahtev za dodavanje adrese
              </button>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="users">
              <table>
                <thead>
                  <tr>
                    <th>Redni broj</th>
                    <th>Korisničko ime</th>
                    <th>Status</th>
                    <th>E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Tamara Stošić</td>
                    <td>Administrator</td>
                    <td>tamara.stosic@gromet.rs</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Emilija Živković</td>
                    <td>Korisnik</td>
                    <td>emilija.zivkovic@gromet.rs</td>
                  </tr>
                </tbody>
              </table>

              <div className="modal-container">
                <button className="add-button" onClick={handleAddClick}>
                  Dodaj +
                </button>

                {showModal && (
                  <div className="modal">
                    <input
                      type="text"
                      placeholder="Ime i prezime"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <small>
                      *Na navedeni e-mail će biti poslat link za kreiranje
                      lozinke novog korisnika
                    </small>
                    <button onClick={handleSubmit}>
                      Pošalji zahtev za dodavanje korisnika
                    </button>
                  </div>
                )}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MainUser;

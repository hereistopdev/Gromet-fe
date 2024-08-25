import React from 'react';
import './Footer.css';
import logo from '../../assets/LogoOrg.webp';

function Footer() {
  return (
    <footer className="site__footer">
      <div className="site-footer">
        <div className="container">
          <div className=" container footer-elements-container">
            <Info />
            <HelpAndSupport />
            <MeetUs />
            <ContactUs />
          </div>
        </div>
        <p style={{ marginBottom: '0', paddingBottom: '10px' }}>
          Copyright © Gromet doo 2023. Sva prava zadržana.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

function ContactUs() {
  const accessToken = localStorage.getItem('accessToken');
  const onLogout = () => {
    localStorage.setItem('accessToken', '');
    localStorage.setItem('currentUser', '');
    window.location.href = '/account/login';
  }
  return (
    <div className="">
      <img src={logo} alt="Gromet logo" className="footer-logo"></img>
      <ul className="footer-contacts__contacts">
        <li>
          <a href="mailto:info@gromet.rs">info@gromet.rs</a>
        </li>
        <li>
          <span>018/260 063, 011/ 411-2335</span>
        </li>
        <li>
          <span>Ponedeljak - Petak: 08h-16h</span>
        </li>
        {!accessToken && <li><a href='/account/login'>Login</a></li>}
        {!!accessToken && <li onClick={onLogout} style={{ cursor: 'pointer' }}><span>Logout</span></li>}
      </ul>
    </div>
  );
}

const footerLinks = {
  info: [
    { text: 'Politika privatnosti', href: '/pomocipodrska?q=ostalo&p=0' },
    { text: 'Politika kolačića', href: '/pomocipodrska?q=ostalo&p=1' },
    { text: 'Opšti uslovi prodaje', href: '/pomocipodrska?q=ostalo&p=2' },
    { text: 'Autorska prava', href: '/pomocipodrska?q=ostalo&p=3' },
  ],
  helpAndSupport: [
    { text: 'Poručivanje', href: '/pomocipodrska?q=porucivanje' },
    { text: 'Način i rok isporuke', href: '/pomocipodrska?q=isporuka' },
    { text: 'Reklamacija i povrat', href: '/pomocipodrska?q=reklamacije' },
  ],
  meetUs: [
    { text: 'O nama', href: '/onama' },
    { text: 'Blog', href: '/blog' },
    { text: 'Odredbe i uvjeti', href: '/pravila' },
    { text: 'Kontakt', href: '/kontakt' },
  ],
};

function Info() {
  return (
    <div className="">
      <div className="site-footer__widget footer-contacts">
        <h5 className="footer-contacts__title">Informacije</h5>

        <ul className="footer-contacts__contacts">
          {footerLinks.info.map(({ href, text }) => (
            <li key={text}>
              <a href={href}>{text}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HelpAndSupport() {
  return (
    <div className="">
      <div className="site-footer__widget footer-links">
        <h5 className="footer-links__title">Pomoć i podrška</h5>
        <ul className="footer-links__list">
          {footerLinks.helpAndSupport.map(({ href, text }) => (
            <li key={text}>
              <a href={href}>{text}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MeetUs() {
  return (
    <div className="" style={{ flex: '0 0 14.66667%' }}>
      <div className="site-footer__widget footer-links">
        <h5 className="footer-links__title">Upoznaj nas</h5>
        <ul className="footer-links__list">
          {footerLinks.meetUs.map(({ href, text }) => (
            <li key={text}>
              <a href={href}>{text}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

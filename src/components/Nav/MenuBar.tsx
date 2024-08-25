import { useMemo } from "react";

type Props = {
  navLinks: { text: string; href: string }[];
  isOpen: boolean;
  onClick: () => void;
};

const MenuBar = ({ navLinks, isOpen, onClick }: Props) => {
  const path = useMemo(() => window.location.href, []);

  return (
    <>
      <div
        className="menubar-container"
        style={
          isOpen
            ? { transform: "translateX(0)" }
            : { transform: "translateX(-100%)" }
        }
      >
        <div className="close-btn-container">
          <b>MENI</b>
          <div className="close-menubar-btn" onClick={onClick}>
            <span style={{ transform: "translateY(1px) rotate(45deg)" }}></span>
            <span
              style={{ transform: "translateY(-1px) rotate(-45deg)" }}
            ></span>
          </div>
        </div>
        <ul className="menubar-links-container">
          {navLinks.map(({ text, href }) => (
            <li key={href}>
              <a
                href={href}
                style={path.includes(href) ? { color: "#00AEEF" } : {}}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`menubar-overlay ${
          isOpen ? "mobile-fade-in" : "mobile-fade-out"
        }`}
        onClick={onClick}
        // style={isOpen ? { display: 'block' } : { display: 'none' }}
      ></div>
    </>
  );
};

export default MenuBar;

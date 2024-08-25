import React, { useEffect, useState } from "react";
import MenuBar from "./MenuBar";

type Props = {
  navLinks: { text: string; href: string }[];
};

const MenuBtn = ({ navLinks }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.querySelector("html")?.classList.toggle("scroll-none");
  }, [isOpen]);

  return (
    <>
      <div className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        <span className="menu-btn-line"></span>
        <span className="menu-btn-line"></span>
        <span className="menu-btn-line"></span>
      </div>
      <MenuBar
        onClick={() => setIsOpen(!isOpen)}
        navLinks={navLinks}
        isOpen={isOpen}
      />
    </>
  );
};

export default MenuBtn;

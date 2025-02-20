import React from "react";

const Footer = () => {
  return (
    <footer className="footer mt-16 shadow-2xl py-8 sm:footer-horizontal footer-center  text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by
          Rakibur Rahman Ratul
        </p>
      </aside>
    </footer>
  );
};

export default Footer;

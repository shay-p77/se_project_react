import React from "react";
import "../blocks/footer.css";

function Footer () {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
          <p> &copy; Developed by Shay Paley</p>
          <p className="footer__year">{currentYear}</p>
        </footer>
      );
}

export default Footer;

 
 import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} My App - Frontend Assignment
    </footer>
  );
}

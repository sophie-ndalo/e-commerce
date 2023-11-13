import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-col">
          <h4>company</h4>
          <ul>
            <li>
            <a href="/aboutus">about us</a>

            </li>
            <li>
              <a href="#">our services</a>
            </li>
            <li>
              <a href="#">privacy policy</a>
            </li>
            <li>
              <a href="#">affiliate program</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>get help</h4>
          <ul>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">shipping</a>
            </li>
            <li>
              <a href="#">returns</a>
            </li>
            <li>
              <a href="#">order status</a>
            </li>
            <li>
              <a href="#">payment options</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>follow us</h4>
          <div className="social-links">
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
            <a href="#">
              <FaInstagramSquare />
            </a>
            <a href="#">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React from "react";

function Footer() {
  return (
    <footer>
      <div>
        <strong>Little Lemon</strong>
        <address>
          123 Lemon St, Chicago, IL<br/>
          <a href="tel:+11234567890">(123) 456-7890</a><br/>
          <a href="mailto:hello@littlelemon.com">hello@littlelemon.com</a>
        </address>
      </div>
      <nav aria-label="Footer">
        <ul>
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/terms">Terms</a></li>
          <li><a href="/accessibility">Accessibility</a></li>
        </ul>
      </nav>
      <div>
        <ul aria-label="Social links">
          <li><a href="https://instagram.com" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://facebook.com" rel="noopener noreferrer">Facebook</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

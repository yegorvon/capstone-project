// src/components/Nav.jsx
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav aria-label="Primary">
      <ul>
        <li>
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/menu" 
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/booking" 
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Reservations
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/order-online" 
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Order Online
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/login" 
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

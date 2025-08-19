import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav aria-label="Primary">
      <ul>
        <li><NavLink to="/" end className={({isActive}) => isActive ? "active" : undefined}>Home</NavLink></li>
        <li><a href="/about">About</a></li>{/* stub until you add route */}
        <li><a href="/menu">Menu</a></li>{/* stub */}
        <li><NavLink to="/booking" className={({isActive}) => isActive ? "active" : undefined}>Reservations</NavLink></li>
        <li><a href="/order-online">Order Online</a></li>{/* stub */}
        <li><a href="/login">Login</a></li>{/* stub */}
      </ul>
    </nav>
  );
}

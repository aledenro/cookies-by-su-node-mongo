
import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 px-4 py-1 rounded-md">
    {children}
  </Link>
);

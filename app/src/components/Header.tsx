import { Link } from "react-router-dom";
import "../styles/header.css";

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="logo">Home Flow</div>

      <nav className="app-nav">
        <Link to="/list">一覧</Link>
      </nav>
    </header>
  );
};

export default Header;

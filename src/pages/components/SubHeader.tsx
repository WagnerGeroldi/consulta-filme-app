import { Link } from "react-router-dom";

export function SubHeader() {
  return (
    <>
      <div className="d-flex gap-3 h-25 bg-dark p-3 justify-content-center">
        <Link to="/">
          <button className="btn btn-primary">Início</button>
        </Link>
        <Link to="/favorites">
        <button className="btn btn-success">Favoritos</button>
        </Link>
      </div>
    </>
  );
}

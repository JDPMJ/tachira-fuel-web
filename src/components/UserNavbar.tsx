export default function UserNavbar() {
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Combustible Táchira</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/application">Aplicación</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">Acerca de</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

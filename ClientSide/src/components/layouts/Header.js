const Header = () => {
  return (
    <div className="header">
  
     <nav class="navbar navbar-expand-lg bg-dark ">
  <div class="container-fluid">
    <a class="navbar-brand text-light" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse container " id="navbarTogglerDemo02">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 " id="navList">
        <li class="nav-item ">
          <a class="nav-link text-light" aria-current="page" href="/stock">Stock</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light" aria-current="page" href="#">Facture</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light" aria-current="page" href="#">Client</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light" aria-current="page" href="#">Archive</a>
        </li>
       
      </ul>
    </div>
  </div>
</nav>

    </div>
  );
};

export default Header;

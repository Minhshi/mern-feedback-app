import React from "react";

class Header extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">Feedbacking</a>
          <ul className="right">
            <li>
              <a>Login</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;

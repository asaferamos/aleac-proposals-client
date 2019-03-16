import React, { Component } from 'react';

class Logout extends Component {
  render() {
    return (
      <div className="Logout">
        <header className="Logout-header">
          <p>
            Logout
          </p>
          <a
            className="Logout-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Reacta
          </a>
        </header>
      </div>
    );
  }
}

export default Logout;

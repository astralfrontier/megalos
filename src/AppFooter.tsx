import React from "react";

function AppFooter() {
  return (
    <div className="box block">
      <div className="columns">
        <div className="column is-narrow">
          <img
            src="/shutterstock_1036949959_s.jpg"
            width="227"
            height="250"
            alt="A collection of swords"
          />
        </div>
        <div className="column">
          <div className="content">
            <p>
              MEGALOS rules:{" "}
              <a href="https://mataramg.itch.io/megalos" target="_blank">
                https://mataramg.itch.io/megalos
              </a>
            </p>
            <p>
              Source code:{" "}
              <a
                href="https://github.com/astralfrontier/megalos"
                target="_blank"
              >
                https://github.com/astralfrontier/megalos
              </a>
            </p>

            <p>
              This tool was independently developed and is not affiliated with
              the author of MEGALOS. This tool is available under an MIT
              license.
            </p>

            <p>
              Images are licensed from Shutterstock and are not covered by the
              MIT license.
            </p>
          </div>
        </div>
        <div className="column is-narrow">
          <img
            src="/shutterstock_1158872473_s.jpg"
            width="250"
            height="250"
            alt="A collection of jewels"
          />
        </div>
      </div>
    </div>
  );
}

export default AppFooter;

import React, { Component } from "react";
import "./rolee.css";
export default class Identify_Role extends Component {
  handleSubmit = (event) => {
    event.preventDefault(); //
    const الدورالمحدد = document.getElementById("الدور").value;
    if (الدورالمحدد !== "") {
      window.location.href = "log1.html"; //   .
    } else {
      alert("يرجى تحديد دورك");
    }
  };

  render() {
    return (
      <div className="container">
        <br />
        <br />

        <h1 style={{ textAlign: "center" }}>
          {" "}
          اهلا بك في موقع جزل التطوعي من فضلك حدد دورك
        </h1>
        <br />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="الدور">اختر دورك</label>
          <select id="الدور" name="الدور" required>
            <option value="" disabled defaultValue>
              اختر دورك
            </option>
            <option value="متطوع">متطوع</option>
            <option value="المستفيد">جهة حكومية</option>
          </select>
          <button
            type="submit"
            onClick={() => {
              window.location.href = "/Login";
            }}
          >
            <a
              href="/sign-in"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              المتابعة
            </a>
          </button>
        </form>
      </div>
    );
  }
}

import React, { Component } from 'react';

export default class ResetPassword extends Component {
  render() {
    return (
      <div className="container">
        
        <h1>إعادة تعيين كلمة المرور</h1>
        <br />
        <br />
        <form>
          <div className="mb-3">
            <label htmlFor="new_password">كلمة المرور الجديدة</label>
            <input
              type="password"
              id="new_password"
              className="form-control"
              placeholder="أدخل كلمة المرور الجديدة"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password">تأكيد كلمة المرور</label>
            <input
              type="password"
              id="confirm_password"
              className="form-control"
              placeholder="تأكيد كلمة المرور الجديدة"
              required
            />
          </div>
          <br />
        
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                window.location.href = 'log6.html';
              }}
            >
              <a href="/PasswordChanged" style={{color: 'white', textDecoration: 'none'}}>إعادة تعيين كلمة المرور</a>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

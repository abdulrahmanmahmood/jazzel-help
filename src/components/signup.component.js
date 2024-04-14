import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isVolunteer, setIsVolunteer] = useState(true);
  const [showVolunteerDropdown, setShowVolunteerDropdown] = useState(false);
  const [showGovernmentDropdown, setShowGovernmentDropdown] = useState(false);
  const [volunteerCharity, setVolunteerCharity] = useState(0); // Define state variable for volunteer charity
  const [governmentAgency, setGovernmentAgency] = useState(0); // Define state variable for government agency
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userData;

    if (isVolunteer) {
      // If the user is a volunteer, construct the userData object accordingly
      userData = {
        displayName: username,
        email,
        charities: parseInt(volunteerCharity), // Convert to number
        password,
        confirmPassword,
        isVolunteer: true,
      };
    } else {
      // If the user is not a volunteer, construct the userData object accordingly
      userData = {
        displayName: username,
        email,
        goverrateAgancy: parseInt(governmentAgency), // Convert to number
        password,
        confirmPassword,
        isVolunteer: false,
      };
    }
    console.log("هيا دي الداتا يعم يوسف اللي عايزها؟", userData);

    try {
      const response = await axios.post(
        "http://jazlhelp.runasp.net/api/Account/register",
        userData
      );
      console.log("Registration successful:", response.data);
      // Handle successful registration, e.g., redirect to login page

      // Display the response message to the user
      alert("تم التسجيل بنجاح!");

      // Navigate to the verify email page
      navigate("/sign-in");
    } catch (error) {
      console.error("Registration failed:", error);
      console.log(userData);
      setError("Registration failed. Please try again.");
    }
  };

  const handleVolunteerRadioChange = () => {
    setIsVolunteer(true);
    setShowVolunteerDropdown(true);
    setShowGovernmentDropdown(false);
  };

  const handleGovernmentRadioChange = () => {
    setIsVolunteer(false);
    setShowVolunteerDropdown(false);
    setShowGovernmentDropdown(true);
  };

  const handleVolunteerCharityChange = (e) => {
    setVolunteerCharity(e.target.value);
  };

  const handleGovernmentAgencyChange = (e) => {
    setGovernmentAgency(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>إنشاء حساب</h3>

      <div className="mb-3 flex flex-row">
        <input
          type="text"
          className="form-control"
          placeholder="الاسم المستخدم"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <label className="w-[120px] items-baseline mt-3">اسم المستخدم</label>
      </div>

      <div className="mb-3 flex flex-row">
        <input
          type="email"
          className="form-control"
          placeholder="أدخل عنوان بريدك الإلكتروني"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <label className="w-[120px] items-baseline ">
          عنوان البريد الإلكتروني
        </label>
      </div>

      <div className="mb-3 flex flex-row">
        <input
          type="password"
          className="form-control"
          placeholder="أدخل كلمة المرور"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <label className="w-[120px] items-baseline mt-3">كلمة المرور</label>
      </div>

      <div className="mb-3 flex flex-row">
        <input
          type="password"
          className="form-control"
          placeholder="أدخل كلمة المرور"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <label className="w-[120px] items-baseline mt-3">
          تأكيد كلمة المرور{" "}
        </label>
      </div>
      <div className="flex flex-row  justify-between  pr-[85px]">
        <div className=" ">
          <label
            className="form-check-label  text-2xl font-bold text-[#3f4934] bg-white p-1 rounded-lg w-[200px] inline-block "
            htmlFor="flexRadioDefault1"
          >
            جهة حكومية
          </label>
          <input
            className="w-[20px] h-[20px] "
            type="radio"
            name="isVolunteer"
            id="flexRadioDefault1"
            checked={!isVolunteer}
            onChange={handleGovernmentRadioChange}
          />
        </div>

        <div className="form-check text-right">
          <label
            className="form-check-label text-2xl font-bold text-[#3f4934] bg-white p-1 rounded-lg w-[200px] inline-block "
            htmlFor="flexRadioDefault2"
          >
            متطوع
          </label>
          <input
            className=" w-[20px] h-[20px]"
            type="radio"
            name="isVolunteer"
            id="flexRadioDefault2"
            checked={isVolunteer}
            onChange={handleVolunteerRadioChange}
          />
        </div>
      </div>

      {showVolunteerDropdown && (
        <div className="text-xl text-center">
          <select
            name=""
            id=""
            className=" mx-auto w-[75%] "
            onChange={handleVolunteerCharityChange}
          >
            <option> اختر الجمعية الخيرية</option>
            <option value="0">جميعة البر الخيرية إيتاء </option>
            <option value="1">جمعية الاسكان التنموية</option>
            <option value="2">جمعية الصحية الانسانية</option>
            <option value="3">جمعية رأفة رعاية الايتام</option>
            <option value="4">جمعية شكر لحفظ النعمة</option>
          </select>
        </div>
      )}

      {showGovernmentDropdown && (
        <div className="text-xl text-center">
          <select
            name=""
            id=""
            className=" mx-auto w-[75%] "
            onChange={handleGovernmentAgencyChange}
          >
            <option>اختر الجهة الحكومية</option>
            <option value="0">محافظة بيشة </option>
            <option value="1">وزارة الصحة</option>
            <option value="2">
              وزارة المواردة البشرية والتنمية الاجتماعية
            </option>
            <option value="3">وزارة العدل</option>
            <option value="4">وزارة الشئون البلدية والقروية والاسكان</option>
          </select>
        </div>
      )}

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          إنشاء حساب
        </button>
      </div>
      <p className="forgot-password text-right">
        {error && <span className="text-danger">{error}</span>}
        مسجل بالفعل؟ <a href="/sign-in">تسجيل الدخول؟</a>
      </p>
    </form>
  );
};

export default SignUp;

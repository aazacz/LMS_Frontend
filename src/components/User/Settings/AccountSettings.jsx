import { React, useState } from "react";

const AccountSettings = () => {
  const [password, setPassword] = useState("user-password");
  const [username, setUsername] = useState("Username");
  const [email, setEmail] = useState("Email");
  const [timezone, setTimezone] = useState(
    "(UTC-6.00)Central Time (US and Canada)"
  );
  const [language, setLanguage] = useState("English");

  const [showPassword, setShowPassword] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showTimezone, setShowTimezone] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toogleUsernameVisibility = () => {
    setShowUsername(!showUsername);
  };
  const toogleEmailVisibility = () => {
    setShowEmail(!showEmail);
  };
  const toogleTimezoneVisibility = () => {
    setShowTimezone(!showTimezone);
  };
  const toogleLanguageVisibility = () => {
    setShowLanguage(!showLanguage);
  };

  return (
    <div className="w-full p-2  overflow-y-scroll no-scrollbar  flex flex-col justify-center items-start  gap-4  font-poppins ">
      <p className="font-semibold text-sm md:text-lg">Account Settings</p>
      <div className="w-11/12  h-max flex flex-wrap justify-start items-center ">
        <div className="w-11/12 h-max flex flex-col justify-center items-left gap-6">
          <div>
            <label className="text-sm font-medium">
              Password <br />{" "}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              className=" p-2 text-sm w-11/12  text-gray-400 outline-none"
              readOnly
            />
            <button className="px-4 py-2 bg-[#0066DE] rounded-lg text-sm text-white" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div>
            <label className="text-sm font-medium">
              Username <br />{" "}
            </label>
            <input
              type={showUsername ? "text" : "password"}
              value={username}
              className=" p-2 text-sm w-11/12  text-gray-400 outline-none"
              readOnly
            />
            <button className="px-4 py-2 bg-[#0066DE] rounded-lg text-sm text-white" onClick={toogleUsernameVisibility}>
              {showUsername ? "Hide" : "Show"}
            </button>
          </div>
          <div>
            <label className="text-sm font-medium">
              Email <br />{" "}
            </label>
            <input
              type={showEmail ? "text" : "password"}
              value={email}
              className="p-2 text-sm w-11/12 text-gray-400 outline-none"
              readOnly
            />
            <button
              className="px-4 py-2 bg-[#0066DE] rounded-lg text-sm text-white"
              onClick={toogleEmailVisibility} 
            >
              {showEmail ? "Hide" : "Show"}
            </button>
          </div>
          <div>
            <label className="text-sm font-medium">
              Language <br />{" "}
            </label>
            <input
              type={showLanguage ? "text" : "password"}
              value={language}
              className="p-2 text-sm w-11/12  text-gray-400 outline-none"
              readOnly
            />
            <button className="px-4 py-2 bg-[#0066DE] rounded-lg text-sm text-white" onClick={toogleLanguageVisibility}>
              {showLanguage ? "Hide" : "Show"}
            </button>
          </div>
          <div>
            <label className="text-sm font-medium">
              TimeZone <br />{" "}
            </label>
            <input
              type={showTimezone ? "text" : "password"}
              value={timezone}
              className="p-2 text-sm w-11/12  text-gray-400 outline-none"
              readOnly
            />
            <button className="px-4 py-2 bg-[#0066DE] rounded-lg text-sm text-white" onClick={toogleTimezoneVisibility}>
              {showTimezone ? "Hide" : "Show"}
            </button>
          </div>
          <h4 className="text-sm font-medium">Delete Your Account</h4>
          <h5 className="text-sm w-4/5 text-gray-400">
            When you delete your account,you lose access to Front account
            services,and we permanently delete your personal data.You can cancel
            the deletion for 14 days.
          </h5>
          <div className="text-sm text-red-600 flex justify-center items-center gap-4  ">
            <input type="checkbox" /> <p>Confirm that I want to delete my account</p>
          </div>
          <div className="flex gap-2 text-sm ">
            <buuton className="py-4 px-6 cursor-pointer font-semibold rounded-md  ">
              Learn More
            </buuton>
            <button className="py-4 px-6 bg-blue-500 font-semibold rounded-md text-white ">
              Delete Account
            </button>
          </div>
        </div>
      </div>
      {/* Add account settings content here */}
    </div>
  );
};

export default AccountSettings;

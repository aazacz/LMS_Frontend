import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Settings1 from "../../../assets/Settings1.jpg";
import "./SettingsPage.css";

const SettingsPage = () => {
  const [activeButton, setActiveButton] = useState("editProfile");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  const [mobilePushNotifications, setMobilePushNotifications] =
    useState("All New Messages");
  const [emailNotifications, setEmailNotifications] = useState(
    "Send me email notification"
  );
  const [emailUpdates, setEmailUpdates] = useState({
    tipsAndTricks: true,
    offersAndPromotions: true,
    researchOpportunities: true,
    newsletter: true,
  });

  const handleMobilePushChange = (event) => {
    setMobilePushNotifications(event.target.value);
  };

  const handleEmailNotificationsChange = (event) => {
    setEmailNotifications(event.target.value);
  };

  const handleEmailUpdatesChange = (event) => {
    setEmailUpdates({
      ...emailUpdates,
      [event.target.name]: event.target.checked,
    });
  };

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

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const renderContent = () => {
    switch (activeButton) {
      case "editProfile":
        return (
          <div className="w-3/4 h-max flex flex-col justify-center items-start pl-2pct gap-4 mr-5mct ">
            <p className="font-semibold text-lg mb-2mct">Edit Profile</p>
            <div className="w-11/12 md:w-11/12  h-max flex flex-wrap justify-start items-center pr-20pct ">
              <div className=" rounded-full bg-red-400 relative overflow-hidden w-28 h-28 md:w-32 md:h-32 lg:w-32 lg:h-32  ">
                <img src={Settings1} />

                <div className="absolute top-44 left-28 text-4xl bg-coolGray-50">
                  <CloudUploadIcon />
                </div>
              </div>
              <div className="flex flex-col justify-start items-start ml-5mct">
                <p className="text-sm md:text-md lg:text-lg font-semibold">
                  Upload Photo
                </p>
                <p className="text-xs  text-gray-600">300x300 and max 2mb</p>
              </div>
            </div>

            <p className="font-semibold text-sm md:text-md lg:text-md">
              Full Name
            </p>
            <input
              className="w-11/12 h-10 border-2 border-gray-100 px-2 rounded-lg text-sm md:text-md lg:text-md outline-none"
              type="text"
            />
            <p className="font-semibold text-sm md:text-md lg:text-md">
              Location
            </p>
            <input
              className="w-11/12 h-10 border-2 border-gray-100 px-2 rounded-lg text-sm md:text-md lg:text-md outline-none"
              type="text"
            />
            <p className="font-semibold text-sm md:text-md lg:text-md">
              Birthday
            </p>
            <input
              className="w-11/12 h-10 border-2 border-gray-100 px-2 rounded-lg text-sm md:text-md lg:text-md outline-none"
              type="date"
            />
            <p className="font-semibold text-sm md:text-md lg:text-md">Phone</p>
            <input
              className="w-11/12 h-10 border-2 border-gray-100 px-2 rounded-lg text-sm md:text-md lg:text-md outline-none"
              type="number"
              max={10}
            />
            <button className="py-4 px-6 bg-blue-500 font-semibold text-sm rounded-md ">
              Save Changes
            </button>
          </div>
        );
      case "accountSettings":
        return (
          <div className="w-3/4 h-max flex flex-col justify-center items-start pl-2pct gap-4 mr-5mct ">
            <p className="font-semibold text-lg mb-2mct">Account Settings</p>
            <div className="w-11/12 md:w-11/12  h-max flex flex-wrap justify-start items-center pr-20pct ">
              <div className="w-11/12 h-max flex flex-col justify-center items-left gap-6">
                <div>
                  <label className="text-sm font-medium">
                    Password <br />{" "}
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    className="text-sm w-11/12  text-gray-400 outline-none"
                    readOnly
                  />
                  <button
                    className="text-sm"
                    onClick={togglePasswordVisibility}
                  >
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
                    className="text-sm w-11/12  text-gray-400 outline-none"
                    readOnly
                  />
                  <button
                    className="text-sm"
                    onClick={toogleUsernameVisibility}
                  >
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
                    className="text-sm w-11/12 text-gray-400 outline-none"
                    readOnly
                  />
                  <button
                    className="text-sm text-grey-400"
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
                    className="text-sm w-11/12  text-gray-400 outline-none"
                    readOnly
                  />
                  <button
                    className="text-sm"
                    onClick={toogleLanguageVisibility}
                  >
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
                    className="text-sm w-11/12  text-gray-400 outline-none"
                    readOnly
                  />
                  <button
                    className="text-sm"
                    onClick={toogleTimezoneVisibility}
                  >
                    {showTimezone ? "Hide" : "Show"}
                  </button>
                </div>
                <h4 className="text-sm font-medium">Delete Your Account</h4>
                <h5 className="text-xs w-4/5 text-gray-400">
                  When you delete your account,you lose access to Front account
                  services,and we permanently delete your personal data.You can
                  cancel the deletion for 14 days.
                </h5>
                <div className="text-xs text-red-600  ">
                  <input type="checkbox" /> Confirm that I want to delete my
                  account
                </div>
                <div className="flex gap-2">
                  <buuton className="py-4 px-6 cursor-pointer font-semibold text-sm rounded-md  ">
                    Learn More
                  </buuton>
                  <button className="py-4 px-6 bg-blue-500 font-semibold text-sm rounded-md text-white ">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
            {/* Add account settings content here */}
          </div>
        );
      case "notificationSettings":
        return (
          <div className="notification-settings">
            <h2>Notification</h2>
            <div className="mobile-push-notification">
              <label htmlFor="mobile-push-notification">
                Mobile Push Notification
              </label>
              <select
                className="mobile-push-notification-option outline-none"
                id="mobile-push-notification"
                value={mobilePushNotifications}
                onChange={handleMobilePushChange}
              >
                <option value="All New Messages">All New Messages</option>
                <option value="Only Mentions">Only Mentions</option>
                <option value="None">None</option>
              </select>
            </div>
            <div className="email-notifications">
              <h3>Email Notifications</h3>
              <p>
                When you're busy or not online, Substance can send you email
                notifications for any new direct messages or mentions of your
                name.
              </p>
              <div className="radio-group">
                <h4>Send me email notification</h4>
                <label htmlFor="email-notifications-send">
                  <input
                    type="radio"
                    id="email-notifications-send"
                    name="email-notifications"
                    value="Send me email notification"
                    checked={
                      emailNotifications === "Send me email notification"
                    }
                    onChange={handleEmailNotificationsChange}
                  />
                  Send me email notification
                </label>
                <label htmlFor="email-notifications-hour">
                  <input
                    type="radio"
                    id="email-notifications-hour"
                    name="email-notifications"
                    value="Once an hour at most"
                    checked={emailNotifications === "Once an hour at most"}
                    onChange={handleEmailNotificationsChange}
                  />
                  Once an hour at most
                </label>
                <label htmlFor="email-notifications-never">
                  <input
                    type="radio"
                    id="email-notifications-never"
                    name="email-notifications"
                    value="Never"
                    checked={emailNotifications === "Never"}
                    onChange={handleEmailNotificationsChange}
                  />
                  Never
                </label>
              </div>
            </div>
            <div className="email-news-updates">
              <h3>Email News & Updates</h3>
              <p>
                From time to time, we'd like to send you emails with interesting
                news about Substance and your workspace. You can choose which of
                these updates you'd like to receive:
              </p>
              <div className="checkbox-group">
                <label htmlFor="tips-and-tricks">
                  <input
                    type="checkbox"
                    id="tips-and-tricks"
                    name="tipsAndTricks"
                    checked={emailUpdates.tipsAndTricks}
                    onChange={handleEmailUpdatesChange}
                  />
                  Tips and Tricks
                </label>
                <label htmlFor="offers-and-promotions">
                  <input
                    type="checkbox"
                    id="offers-and-promotions"
                    name="offersAndPromotions"
                    checked={emailUpdates.offersAndPromotions}
                    onChange={handleEmailUpdatesChange}
                  />
                  Offers and Promotions
                </label>
                <label htmlFor="research-opportunities">
                  <input
                    type="checkbox"
                    id="research-opportunities"
                    name="researchOpportunities"
                    checked={emailUpdates.researchOpportunities}
                    onChange={handleEmailUpdatesChange}
                  />
                  Research Opportunities
                </label>
                <label htmlFor="newsletter">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={emailUpdates.newsletter}
                    onChange={handleEmailUpdatesChange}
                  />
                  Newsletter
                </label>
              </div>
              <p className="notification-footer">
                If you opt out of the above, note that we'll still send you
                important administrative emails.
              </p>
            </div>
          </div>
        );
      case "helpDesk":
        return (
          <div className="notification-settings">
            <h2>Help Desk</h2>
            <div className="mobile-push-notification">
              <label htmlFor="mobile-push-notification">
                Mobile Push Notification
              </label>
              <select
                className="mobile-push-notification-option outline-none"
                id="mobile-push-notification"
                value={mobilePushNotifications}
                onChange={handleMobilePushChange}
              >
                <option value="All New Messages">All New Messages</option>
                <option value="Only Mentions">Only Mentions</option>
                <option value="None">None</option>
              </select>
            </div>
            <div className="email-notifications">
              <h4>Email Notifications</h4>
              <p>
                When you're busy or not online, Substance can send you email
                notifications for any new direct messages or mentions of your
                name.
              </p>
              <div className="radio-group">
                <h4>Send me email notification</h4>
                <label htmlFor="email-notifications-send">
                  <input
                    type="radio"
                    id="email-notifications-send"
                    name="email-notifications"
                    value="Send me email notification"
                    checked={
                      emailNotifications === "Send me email notification"
                    }
                    onChange={handleEmailNotificationsChange}
                  />
                  Send me email notification
                </label>
                <label htmlFor="email-notifications-hour">
                  <input
                    type="radio"
                    id="email-notifications-hour"
                    name="email-notifications"
                    value="Once an hour at most"
                    checked={emailNotifications === "Once an hour at most"}
                    onChange={handleEmailNotificationsChange}
                  />
                  Once an hour at most
                </label>
                <label htmlFor="email-notifications-never">
                  <input
                    type="radio"
                    id="email-notifications-never"
                    name="email-notifications"
                    value="Never"
                    checked={emailNotifications === "Never"}
                    onChange={handleEmailNotificationsChange}
                  />
                  Never
                </label>
              </div>
            </div>
            <div className="email-news-updates">
              <h3>Email News & Updates</h3>
              <p>
                From time to time, we'd like to send you emails with interesting
                news about Substance and your workspace. You can choose which of
                these updates you'd like to receive:
              </p>
              <div className="checkbox-group">
                <label htmlFor="tips-and-tricks">
                  <input
                    type="checkbox"
                    id="tips-and-tricks"
                    name="tipsAndTricks"
                    checked={emailUpdates.tipsAndTricks}
                    onChange={handleEmailUpdatesChange}
                  />
                  Tips and Tricks
                </label>
                <label htmlFor="offers-and-promotions">
                  <input
                    type="checkbox"
                    id="offers-and-promotions"
                    name="offersAndPromotions"
                    checked={emailUpdates.offersAndPromotions}
                    onChange={handleEmailUpdatesChange}
                  />
                  Offers and Promotions
                </label>
                <label htmlFor="research-opportunities">
                  <input
                    type="checkbox"
                    id="research-opportunities"
                    name="researchOpportunities"
                    checked={emailUpdates.researchOpportunities}
                    onChange={handleEmailUpdatesChange}
                  />
                  Research Opportunities
                </label>
                <label htmlFor="newsletter">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={emailUpdates.newsletter}
                    onChange={handleEmailUpdatesChange}
                  />
                  Newsletter
                </label>
              </div>
              <p className="notification-footer">
                If you opt out of the above, note that we'll still send you
                important administrative emails.
              </p>
            </div>
          </div>
        );
    
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen  ">
      <div className="w-full h-5/6  flex justify-start items-center flex-wrap flex-col ">
        <div className="w-1/2 md:w-1/3 lg:w-30percent h-5/6 flex flex-col justify-start items-start gap-6  pl-15pct">
          <p className="  text-sm md:text-md lg:text-xl font-bold">
            Update and Manage
            <br /> Your Account
          </p>
          <button
            className={`bg-slate-100 rounded-md text-xs md:text-sm lg:text-sm ${
              activeButton === "editProfile" ? "bg-slate-200" : ""
            }`}
            onClick={() => handleButtonClick("editProfile")}
          >
            ✏️Edit Profile
          </button>
          <button
            className={`bg-white rounded-md text-xs md:text-sm lg:text-sm ${
              activeButton === "accountSettings" ? "bg-slate-200" : ""
            }`}
            onClick={() => handleButtonClick("accountSettings")}
          >
            🛞Account Settings
          </button>
          <button
            className={`bg-white rounded-md text-xs md:text-sm lg:text-sm ${
              activeButton === "notificationSettings" ? "bg-slate-200" : ""
            }`}
            onClick={() => handleButtonClick("notificationSettings")}
          >
            🔔Notification Settings
          </button>
          <button
            className={`bg-white rounded-md text-xs md:text-sm lg:text-sm ${
              activeButton === "helpDesk" ? "bg-slate-200" : ""
            }`}
            onClick={() => handleButtonClick("helpDesk")}
          >
            📞Help Desk
          </button>
          <button
            className={`bg-white rounded-md text-xs md:text-sm lg:text-sm ${
              activeButton === "logout" ? "bg-slate-200" : ""
            }`}
            onClick={() => handleButtonClick("logout")}
          >
            Logout
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsPage;

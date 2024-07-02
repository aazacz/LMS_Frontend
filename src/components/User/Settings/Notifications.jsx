import React,{useState} from 'react'
import "./SettingsTutor.css"

const Notifications = () => {
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
  )
}

export default Notifications

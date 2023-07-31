import React, { useState } from 'react';
import { BUDGET_PLANNER_LOGO } from './../../JavaScript/Modules/ImageHelper.js';
import { CustomLogger } from './../../JavaScript/Modules/Helper.js';
import LoginPage from './../Login/LoginPage.js';
import './IntroPageStyles.css';

const Intro_Page = (parms) => {
  const defaultIntroData = {
    showLoginPopup: false,
  };
  const [introData, setIntroData] = useState({ data: defaultIntroData });
  const onLoginClicked = () => {
    try {
      setIntroData({
        ...introData,
        data: { ...introData.data, showLoginPopup: true },
      });
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };

  const onLoginCompleted = () => {
    try {
      setIntroData({
        ...introData,
        data: { ...introData.data, showLoginPopup: false },
      });
    } catch (ex) {
      CustomLogger.ErrorLogger(ex);
    }
  };
  return (
    <div className="introPageHolder">
      <div className="mainContentHolder">
        <div className="leftContentHolder">
          <div className="imageHolder">
            <img src={BUDGET_PLANNER_LOGO} />
          </div>
          <p>
            This is a Private website focusing on the admins daily expenditure,
            This website records the expenditure and save to the google sheets
            and displays the same by retriving the data from the sheets. For now
            this cannot be used by any other individual as the access is
            restricted to the particular user alone. Thank you.
          </p>
        </div>
        <div className="rightContentHolder">
          <button onClick={onLoginClicked}>Login</button>
          {/* <div>
            <button onClick={onLoginClicked}>Login</button>
          </div> */}
        </div>
      </div>
      {introData.data.showLoginPopup === true ? (
        <div className="loginPopupHolder">
          <LoginPage onLoginProcessCompleted={onLoginCompleted} />
          <button onClick={onLoginCompleted}>close</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const IntroPage = Intro_Page;
export default IntroPage;

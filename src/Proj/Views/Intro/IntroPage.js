import React, {useState} from 'react';
import { BUDGET_PLANNER_LOGO } from './../../JavaScript/Modules/ImageHelper.js';import {
  CustomLogger
} from './../../JavaScript/Modules/Helper.js';
import LoginPage from './../Login/LoginPage.js';
import './IntroPageStyles.css';

const Intro_Page = (parms) => {
  const defaultIntroData = {}
  const [introData, setIntroData] = useState({data: defaultIntroData});
  const onLoginClicked = () =>{
    try{}catch(ex){
      CustomLogger.ErrorLogger(ex);
    }
  }
  return (
    <div className="introPageHolder">
      <div className="mainContentHolder">
        <div className="leftContentHolder">
          <img src={BUDGET_PLANNER_LOGO} />
          <p>
            This is a Private website focusing on the admins daily expenditure, This website records the expenditure and save to the google sheets and displays the same by retriving the data from the sheets. For now this cannot be used by any other individual as the access is restricted to the particular user alone. Thank you.
          </p>
        </div>
        <div className="rightContentHolder">
          <div>
            <button onClick={}>Login</button>
          </div>
        </div>
      </div>
      <div className="loginPopupHolder">
      {
        <LoginPage />
      }
    </div>
    </div>
  );
};

const IntroPage = Intro_Page;
export default IntroPage;

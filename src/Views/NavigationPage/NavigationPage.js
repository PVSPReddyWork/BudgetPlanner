import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Outlet,
  Routes,
} from 'react-router-dom';
import './NavigationPageStyles.css';
import IntroPage from './../Intro/IntroPage';
import LoginPage from './../Login/LoginPage';
import ViewExpensePage from './../Expenses/ViewExpenses/ViewExpensesPage';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

const CustomNavigation = (parms) => {
  const Router = BrowserRouter;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="view_expense" element={<ViewExpensePage />} />
          {/* <Route index element={<IntroPage />} />
          <Route path="login" element={<LoginPage />} /> */}
          {/* <Route path="boardlogin" element={<LoginToBoardPage />} /> */}
          {/* <Route path="help" element={<HelpPage />} /> */}
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

// You can think of these components as "pages"
// in your app.

const Layout = () => {
  return (
    <>
      <div className="header">
        <nav className="nav">
          <Link to="/" className="headerLink">
            <div className="menuOptions">Home</div>
          </Link>
          <Link to="/login" className="headerLink">
            <div className="menuOptions">Login</div>
          </Link>
          <Link to="/view_expense" className="headerLink">
            <div className="menuOptions">Expenses</div>
          </Link>
          {/* <Link to="/boardlogin" className="headerLink">
            <div className="menuOptions">Select Board</div>
          </Link>
          <Link to="/help" className="headerLink">
            <div className="menuOptions">Help</div>
          </Link> */}
          {/* <Link to="/dashboard" className="headerLink">
            <div className="menuOptions">Dashboard</div>
          </Link> */}
        </nav>
      </div>

      <Outlet />
    </>
  );
};

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

// const FaceRecognition_Page = (parms) => {
//   return (
//     <div>
//       <p>Hello Face</p>
//     </div>
//   );
// };
// const FaceRecognitionPage2 = FaceRecognition_Page;

// function FaceRecognitionPage() {
//   return (
//     <div>
//       <h2>Hello Face</h2>
//     </div>
//   );
// }

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

const NoPage = () => {
  return <h1>404</h1>;
};

export default CustomNavigation;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import React, { Suspense, lazy } from "react";

const Accounts = lazy(() => import("../../pages/Accounts"));
const Campaigns = lazy(() => import("../../pages/Campaigns"));
const Profiles = lazy(() => import("../../pages/Profiles"));

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Accounts />} />
          <Route path="/:accountId" element={<Profiles />} />
          <Route path="/:accountId/:profileId" element={<Campaigns />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;

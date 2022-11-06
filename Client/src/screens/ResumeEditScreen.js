import React, { useEffect } from "react";
import ResumeEdit from "../components/ResumeEdit";
import SideBar from "../components/SideBar";
import {  useSelector } from "react-redux";








export default function ResumeEditScreen() {

  const Data = useSelector((state) => state.getResumeEditReducer);
  const { resume, loading } = Data

  console.log(resume , loading)

  return (
    <div class="body-box">
      {loading ? ( <div>Loading...</div>) : (
        <div class="body-content">
        <SideBar  />
        <ResumeEdit resume={resume} loading={loading} />
      </div>
      )}
    </div>
  );
}

import React, { useContext } from "react";
import Resume1Temp from "./Resume1Temp";
import { useEffect, useState } from "react";
import RichTEditor from './RichTEditor'
import $ from 'jquery';
import { useDispatch, useSelector } from "react-redux";
import { resumeEdit } from "../actions/resumeEditAction";
import axios from "axios";
import { StateContext } from "../context/StateProvider.js";



//Left out
//DELETION 
// SKILL , PROJECT ETC
//Field
//Project , experience , hobby

export default function ResumeEdit({ resume, loading, getResume }) {

  const [ProfileEdit, setProfileEdit] = useState(false)
  const [educationEdit, seteducationEdit] = useState(false)
  const [skillEdit, setskillEdit] = useState(false)
  const [projectEdit, setprojectEdit] = useState(false)
  const [ExperinceEdit, setExperinceEdit] = useState(false)



  //Profile Fields states
  const [name, setname] = useState(null)
  const [email, setemail] = useState(null)
  const [phone, setphone] = useState(null)
  const [jobTitle, setjobTitle] = useState(null)
  const [address, setaddress] = useState(null)
  const [linkedIn, setlinkedIn] = useState(null)
  const [github, setgithub] = useState(null)
  const [about, setabout] = useState(null)

  function updateProfile() {
    const data = {
      "field": "profile",
      "data": {
        "name": `${name != null ? name : resume.profile.name}`,
        "jobTitle": `${jobTitle != null ? jobTitle : resume.profile.jobTitle}`,
        "email": `${email != null ? email : resume.profile.email}`,
        "phone": `${phone != null ? phone : resume.profile.phone}`,
        "address": `${address != null ? address : resume.profile.address}`,
        "about": `${about != null ? about : resume.profile.about}`,
        "links": {
          "linkedIn": `${linkedIn != null ? linkedIn : resume.profile.links.linkedIn}`,
          "github": `${github != null ? github : resume.profile.links.github}`
        }
      }
    }

    console.log(data)

    axios.patch(`/api/update-resume/636a1933d8a6bba474f5b2bf`, data, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(
      (response) => {
        console.log(response.data)
        getResume()
      },
      (error) => {
        if (error.response.status == 401) {
        }
      }
    );

    toggleEdit('profile')
  }

  //Education field states

  const [degree, setdegree] = useState(null)
  const [school, setschool] = useState(null)
  const [city, setcity] = useState(null)
  const [country, setcountry] = useState(null)
  const [eduStartDate, seteduStartDate] = useState(null)
  const [eduEndDate, seteduEndDate] = useState(null)
  const [eduDescription, seteduDescription] = useState(null)
  const [isNewEducation, setisNewEducation] = useState(false)
  const [educationId, seteducationId] = useState('')
  const [educationEditCurrent, seteducationEditCurrent] = useState({})   //Data upon which editing will happen containg _id of doc

  function updateEducation() {
    if (isNewEducation) {
      const data = {
        "field": "education",
        "data": {
          "degree": `${degree}`,
          "school": `${school}`,
          "city": `${city}`,
          "country": `${country}`,
          "startDate": `${eduStartDate}`,
          "endDate": `${eduEndDate}`,
          "description": `${eduDescription}`
        },
        "type": "new"
      }
      console.log(data)
      axios.patch(`/api/update-resume/636a1933d8a6bba474f5b2bf`, data, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        (response) => {
          console.log(response.data)
          getResume()
          toggleEdit('education')
        },
        (error) => {
          if (error.response.status == 401) {
          }
        }
      );

    }
    else {
      const data = {
        "field": "education",
        "data": {
          "degree": `${degree == null ? educationEditCurrent.degree : degree}`,
          "school": `${school == null ? educationEditCurrent.school : school}`,
          "city": `${city == null ? educationEditCurrent.city : city}`,
          "country": `${country == null ? educationEditCurrent.country : country}`,
          "startDate": `${eduStartDate == null ? educationEditCurrent.startDate : eduStartDate}`,
          "endDate": `${eduEndDate == null ? educationEditCurrent.endDate : eduEndDate}`,
          "description": `${eduDescription == null ? educationEditCurrent.description : eduDescription}`
        },
        "docId": `${educationEditCurrent._id}`
      }
      console.log(data)
      axios.patch(`/api/update-resume/636a1933d8a6bba474f5b2bf`, data, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        (response) => {
          console.log(response.data)
          getResume()
          toggleEdit('education')

        },
        (error) => {
          if (error.response.status == 401) {
          }
        }
      );
    }
  }

  function deleteEducationItem(eduId) {
    if (window.confirm('Delete the item?')) {
      axios.delete(`/api/delete-education/636a1933d8a6bba474f5b2bf/${eduId}`, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        (response) => {
          console.log(response.data)
          getResume()
        },
        (error) => {
          if (error.response.status == 401) {
          }
        }
      );
    }

  }



  //Skill field states
  const [skillName, setskillName] = useState(null)
  const [skillSubName, setskillSubName] = useState(null)
  const [skillLevel, setskillLevel] = useState(null)
  const [isNewSkill, setisNewSkill] = useState(false)
  const [skillEditCurrent, setskillEditCurrent] = useState({})

  function updateSkill() {
    if (isNewSkill) {
      const data = {
        "field": "skill",
        "data": {
          "name": `${skillName}`,
          "subName": `${skillSubName}`,
          "level": `${skillLevel}`
        },
        "type": "new"
      }
      console.log(data)
      axios.patch(`/api/update-resume/636a1933d8a6bba474f5b2bf`, data, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        (response) => {
          console.log(response.data)
          getResume()
          toggleEdit('skill')
        },
        (error) => {
          if (error.response.status == 401) {
          }
        }
      );
    }
    else {
      const data = {
        "field": "skill",
        "data": {
          "name": `${skillName == null ? skillEditCurrent.name : skillName}`,
          "subName": `${skillSubName == null ? skillEditCurrent.subName : skillSubName}`,
          "level": `${skillLevel == null ? skillEditCurrent.level : skillLevel}`
        },
        "docId": `${skillEditCurrent._id}`
      }

      axios.patch(`/api/update-resume/636a1933d8a6bba474f5b2bf`, data, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        (response) => {
          console.log(response.data)
          getResume()
          toggleEdit('skill')
        },
        (error) => {
          if (error.response.status == 401) {
          }
        }
      );

    }
  }

  function deleteSkillItem(Id) {
    if (window.confirm('Delete the item?')) {
      axios.delete(`/api/delete-skill/636a1933d8a6bba474f5b2bf/${Id}`, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        (response) => {
          console.log(response.data)
          getResume()
        },
        (error) => {
          if (error.response.status == 401) {
          }
        }
      );
    }

  }

  //Project field states
  const { projectDescription, setprojectDescription } = useContext(StateContext);

  const [projectTitle, setprojectTitle] = useState(null)
  const [projectSubTitle, setprojectSubTitle] = useState(null)
  const [projectLink, setprojectLink] = useState(null)
  const [projectStartDate, setprojectStartDate] = useState(null)
  const [projectEndDate, setprojectEndDate] = useState(null)
  const [isNewProject, setisNewProject] = useState(false)
  const [projectEditCurrent, setprojectEditCurrent] = useState({})

  function updateProject() {
    console.log('Update project')
    if (isNewProject) {
      const data = {
        "field": "project",
        "data": {
          "title": `${projectTitle}`,
          "subTitle": `${projectSubTitle}`,
          "link": `${projectLink}`,
          "description": `${projectDescription}`,
          "startDate": `${projectStartDate}`,
          "endDate": `${projectEndDate}`,
        },
        "type": "new"
      }
      console.log(data)
      axios.patch(`/api/update-resume/636a1933d8a6bba474f5b2bf`, data, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        (response) => {
          console.log(response.data)
          getResume()
          toggleEdit('project')
        },
        (error) => {
          if (error.response.status == 401) {
          }
        }
      );
    }
    else {
      const data = {
        "field": "project",
        "data": {
          "title": `${projectTitle == null ? projectEditCurrent.title : projectTitle}`,
          "subTitle": `${projectSubTitle == null ? projectEditCurrent.subTitle : projectSubTitle}`,
          "link": `${projectLink == null ? projectEditCurrent.link : projectLink}`,
          "description": `${projectDescription == null ? projectEditCurrent.description : projectDescription}`,
          "startDate": `${projectStartDate == null ? projectEditCurrent.startDate : projectStartDate}`,
          "endDate": `${projectEndDate == null ? projectEditCurrent.endDate : projectEndDate}`,
        },
        "docId": `${projectEditCurrent._id}`
      }

      axios.patch(`/api/update-resume/636a1933d8a6bba474f5b2bf`, data, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        (response) => {
          console.log(response.data)
          getResume()
          toggleEdit('project')
        },
        (error) => {
          if (error.response.status == 401) {
          }
        }
      );

    }
  }

  function deleteProjectItem(Id) {
    if (window.confirm('Delete the item?')) {
      axios.delete(`/api/delete-project/636a1933d8a6bba474f5b2bf/${Id}`, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        (response) => {
          console.log(response.data)
          getResume()
        },
        (error) => {
          if (error.response.status == 401) {
          }
        }
      );
    }

  }


  //Experience field states
  // const { projectDescription, setprojectDescription } = useContext(StateContext);

  const [expJobTitle, setexpJobTitle] = useState(null)
  const [employer, setemployer] = useState(null)
  const [expCity, setexpCity] = useState(null)
  const [expCountry, setexpCountry] = useState(null)
  const [expStartDate, setexpStartDate] = useState(null)
  const [expEndDate, setexpEndDate] = useState(null)
  const [isNewExp, setisNewExp] = useState(false)
  const [expEditCurrent, setexpEditCurrent] = useState({})


  function updateExperience(){
    console.log('Update experience')
    if (isNewExp) {
      const data = {
        "field": "experience",
        "data": {
          "jobTitle": `${expJobTitle}`,
          "employer": `${employer}`,
          "city": `${expCity}`,
          "country": `${expCountry}`,
          "description": `${projectDescription}`,
          "startDate": `${expStartDate}`,
          "endDate": `${expEndDate}`,
        },
        "type": "new"
      }
      console.log(data)
      axios.patch(`/api/update-resume/636a1933d8a6bba474f5b2bf`, data, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        (response) => {
          console.log(response.data)
          getResume()
          toggleEdit('experience')
        },
        (error) => {
          if (error.response.status == 401) {
          }
        }
      );
    }
    else {
      console.log("Current exp update")
      const data = {
        "field": "experience",
        "data": {
          "jobTitle": `${expJobTitle == null ? expEditCurrent.jobTitle : expJobTitle}`,
          "employer": `${employer == null ? expEditCurrent.employer : employer}`,
          "city": `${expCity == null ? expEditCurrent.city : expCity}`,
          "country": `${expCountry == null ? expEditCurrent.country : expCountry}`,
          "description": `${projectDescription == null ? expEditCurrent.description : projectDescription}`,
          "startDate": `${expStartDate == null ? expEditCurrent.startDate : expStartDate}`,
          "endDate": `${expEndDate == null ? expEditCurrent.endDate : expEndDate}`,
        },
        "docId": `${expEditCurrent._id}`
      }
      console.log(data)

      axios.patch(`/api/update-resume/636a1933d8a6bba474f5b2bf`, data, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        (response) => {
          console.log(response.data)
          getResume()
          toggleEdit('experience')
        },
        (error) => {
          if (error.response.status == 401) {
          }
        }
      );

    }
  }


   function deleteExperienceItem(Id) {
    if (window.confirm('Delete the item?')) {
      axios.delete(`/api/delete-experience/636a1933d8a6bba474f5b2bf/${Id}`, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        (response) => {
          console.log(response.data)
          getResume()
        },
        (error) => {
          if (error.response.status == 401) {
          }
        }
      );
    }

  }

  function toggleEdit(type) {
    console.log(type)
    switch (type) {
      case 'profile':
        setProfileEdit(!ProfileEdit)
        console.log(ProfileEdit)
        break;
      case 'education':
        seteducationEdit(!educationEdit)
        setisNewEducation(false)
        setdegree(null)
        setschool(null)
        setcity(null)
        setcountry(null)
        seteduStartDate(null)
        seteduEndDate(null)
        seteduDescription(null)
        break;
      case 'skill':
        console.log(skillLevel)
        setskillEdit(!skillEdit)
        setisNewSkill(false)
        setskillName(null)
        setskillSubName(null)
        setskillLevel(null)
      case 'project':
        console.log(projectEdit)
        setprojectEdit(!projectEdit)
        setisNewProject(false)
        setprojectTitle(null)
        setprojectSubTitle(null)
        setprojectLink(null)
        setprojectStartDate(null)
        setprojectEndDate(null)
      case 'experience':
        console.log(ExperinceEdit)
        setExperinceEdit(!ExperinceEdit)
        setisNewExp(false)
        setjobTitle(null)
        setemployer(null)
        setexpCity(null)
        setexpCountry(null)
        setprojectStartDate(null)
        setprojectEndDate(null)
      default:
        break;
    }
  }

  const Data = useSelector((state) => state.getResumeEditReducer);
  // const { resume, loading } = Data

  // console.log(resume, loading)




  function changePickupStoreMenu() {
    var body = $("body"),
      mask = $('<div class="mask"></div>'),
      toggleSlideRight = document.querySelector(".toggle-slide-right"),
      slideMenuRight = document.querySelector(".slide-menu-right"),
      activeNav = "";
    $("body").append(mask);

    /* slide menu right */
    toggleSlideRight.addEventListener("click", function () {
      $("body").addClass("smr-open");
      $(".mask").fadeIn();
      activeNav = "smr-open";
      slideMenuRight.style.display = "block";
    });

    /* hide active menu if close menu button is clicked */
    $(document).on("click", ".close-menu", function (el, i) {
      $("body").removeClass(activeNav);
      activeNav = "";
      $(".mask").fadeOut();
      slideMenuRight.style.display = "none";
    });
  }

  useEffect(() => {
    changePickupStoreMenu()
  }, [])


  return (
    <>
      <div class="right-content-box">
        <div class="right-option-bar">
          <div class="r-option-box1">
            <div class="rb1-c1">
              <div class="dropdown">
                <button
                  class="btn btn-menu dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Resume 1
                </button>
                <ul
                  class="dropdown-menu dropdown-menu-center"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a class="dropdown-item" href="#">
                      Add another
                    </a>
                  </li>
                  {/* <li><a class="dropdown-item" href="#">Another action</a></li>
                                  <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                </ul>
              </div>

              <div class="btn btn-warning my-2 mx-2">
                <button id="generatePDF">Download PDF</button>
              </div>
            </div>

            <div class="rb1-c2 personal-detail">
              <div class="rb1-box-head">
                <div class="icon">
                  <ion-icon name="person-outline"></ion-icon>
                </div>
                <div class="personal-detail-text">Personal Details</div>
                <div class="personal-detail-edit">
                  <div class="edit" onClick={() => { toggleEdit('profile') }} >
                    <ion-icon name="create-outline"></ion-icon>
                    <div>Edit</div>
                  </div>
                </div>
              </div>
              <div class="rb1-c2-content">

                <div class={`c2-content-body profileDataView ${ProfileEdit == true ? 'displayNone' : ''} `}>
                  <div class="left-c2-c">
                    <div class="display-img">
                      <div class="dp-img">
                        <img src="/img/avtar.png" alt="" />
                      </div>
                    </div>
                    <div class="peronal-phone">
                      <div class="peronal-text">Phone :</div>
                    </div>
                    <div class="personal-email">
                      <div class="personal-email">Email :</div>
                    </div>
                  </div>

                  <div class="right-c2-c">
                    <div class="personal-r-name">
                      <div class="personal-name-text">{resume.profile.name}</div>
                    </div>
                    <div class="personal-r-phone">{resume.profile.phone}</div>
                    <div class="perosnal-r-email">{resume.profile.email}</div>
                  </div>
                </div>

                <div className={`profileEditInput  ${ProfileEdit == false ? 'displayNone' : ''} `}>
                  <div className="profileEditWrap">

                    <div className="profile-input-merge">
                      <div className="profile-input profile-name">
                        <div class="sub-skillHeading">
                          <p>
                            <b>Full Name</b>
                            <sub></sub>
                          </p>
                        </div>
                        <input type="text" className="InputProject w-80" value={name != null ? name : resume.profile.name} onChange={(e) => setname(e.target.value)} />
                      </div>
                      <div className="profile-input profile-email">
                        <div class="sub-skillHeading">
                          <p>
                            <b>Email</b>
                            <sub></sub>
                          </p>
                        </div>
                        <input type="email" className="InputProject w-80" value={email != null ? email : resume.profile.email} onChange={(e) => setemail(e.target.value)} />
                      </div>
                    </div>
                    <div className="profile-input-merge">
                      <div className="profile-input profile-jobTitle">
                        <div class="sub-skillHeading">
                          <p>
                            <b>Job Title</b>
                            <sub></sub>
                          </p>
                        </div>
                        <input type="text" className="InputProject w-80" value={jobTitle != null ? jobTitle : resume.profile.jobTitle} onChange={(e) => setjobTitle(e.target.value)} />
                      </div>
                      <div className="profile-input profile-phone">
                        <div class="sub-skillHeading">
                          <p>
                            <b>Phone</b>
                            <sub></sub>
                          </p>
                        </div>
                        <input type="text" className="InputProject w-80" value={phone != null ? phone : resume.profile.phone} onChange={(e) => setphone(e.target.value)} />
                      </div>
                    </div>
                    <div className="profile-input profile-phone">
                      <div class="sub-skillHeading">
                        <p>
                          <b>Address</b>
                          <sub></sub>
                        </p>
                      </div>
                      <input type="text" className=" InputProject w-80" value={address != null ? address : resume.profile.address} onChange={(e) => setaddress(e.target.value)} />
                    </div>
                    <div className="profile-input-merge-heading">
                      <div class="sub-skillHeading">
                        <p>
                          <b>Links</b>
                          <sub></sub>
                        </p>
                      </div>
                    </div>
                    <div className="profile-input-merge">
                      <div className="profile-input profile-jobTitle">
                        <div class="sub-skillHeading">
                          <p>
                            <b>LinkedIn</b>
                            <sub></sub>
                          </p>
                        </div>
                        <input type="text" className=" InputProject w-80" value={linkedIn != null ? linkedIn : resume.profile.links.linkedIn} onChange={(e) => setlinkedIn(e.target.value)} />
                      </div>
                      <div className="profile-input profile-phone">
                        <div class="sub-skillHeading">
                          <p>
                            <b>Github</b>
                            <sub></sub>
                          </p>
                        </div>
                        <input type="text" className=" InputProject w-80" value={github != null ? github : resume.profile.links.github} onChange={(e) => setgithub(e.target.value)} />
                      </div>
                    </div>
                    <div className="profile-input profile-name">
                      <div class="sub-skillHeading">
                        <p>
                          <b>About</b>
                          <sub></sub>
                        </p>
                      </div>
                      <textarea id="w3review" name="w3review" className=" InputProject w-80" value={about != null ? about : resume.profile.about} onChange={(e) => setabout(e.target.value)} rows="6" cols="50">

                      </textarea>
                    </div>


                  </div>
                  <div className="profileEditActionBtns d-flex w-100">
                    <div className="Save-btn w-20 mx-4 my-4">
                      <button className="btn btn-success w-100" onClick={() => updateProfile()}>Save</button>
                    </div>
                    <div className="Cancel-btn w-20 mx-4 my-4">
                      <button className="btn w-80 " onClick={() => { toggleEdit('profile') }}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="rb1-c5 personal-education">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      <div class="personal-project-head">
                        <div class="icon">
                          <ion-icon name="book"></ion-icon>
                        </div>
                        <div class="head-text">Education</div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">

                      <div className={`${educationEdit == true ? 'displayNone' : ''} `}>

                        {resume.education.map((data) => {
                          return (
                            <div className="education-content d-flex">
                              <div className="education-content-title">
                                <div className="education-upperBox d-flex">
                                  <div className="education-Degree">
                                    {data.degree} -
                                  </div>
                                  <div className="education-school">
                                    {data.school}
                                  </div>
                                </div>
                                <div className="education-lowerBox d-flex">
                                  <div className="education-startDate">
                                    {data.startDate} -
                                  </div>
                                  <div className="education-endDate">
                                    {data.endDate}
                                  </div>
                                </div>
                              </div>
                              <div className="education-actions d-flex">
                                <div class="edit" onClick={() => { seteducationEditCurrent(data); toggleEdit('education'); }} >
                                  <ion-icon name="create-outline"></ion-icon>
                                  <div>Edit</div>
                                </div>
                                <div class="delete-action" onClick={() => { deleteEducationItem(data._id) }}>
                                  <ion-icon name="trash"></ion-icon>
                                  <div>Delete</div>
                                </div>
                              </div>

                            </div>
                          )
                        })}
                      </div>

                      <div className={`${educationEdit == false ? 'displayNone' : ''} `}>

                        <p class="head">
                          <b>Create Education</b>
                        </p>
                        <button type="button" class="ProjectButton">
                          <img src="iicon.png" alt="" class="ProjectImage" /> Tips
                        </button>

                        <div className="input-merge ">
                          <div class="sub-skillHeading">
                            <p>
                              <b>Degree *</b>
                              <sub></sub>
                            </p>
                          </div>
                          <input
                            type="text"
                            placeholder="Enter Degree"
                            class="InputProject w-80"
                            value={isNewEducation ? (degree == null ? '' : degree) : (degree != null ? degree : educationEditCurrent.degree)}
                            onChange={(e) => setdegree(e.target.value)}
                          />
                        </div>

                        <div className="input-merge ">
                          <div class="sub-skillHeading">
                            <p>
                              <b>Subject *</b>
                              <sub></sub>
                            </p>
                          </div>
                          <input type="text"
                            placeholder="Enter School"
                            className="InputProject w-80"
                            value={isNewEducation ? (school == null ? '' : school) : (school != null ? school : educationEditCurrent.school)}
                            onChange={(e) => setschool(e.target.value)} />
                        </div>

                        <div className="input-merge d-flex">
                          <div className="profile-input profile-jobTitle w-50">
                            <div class="sub-skillHeading">
                              <p>
                                <b>City</b>
                                <sub></sub>
                              </p>
                            </div>
                            <input type="text"
                              placeholder="Enter City"
                              className="InputProject w-80"
                              value={isNewEducation ? (city == null ? '' : city) : (city != null ? city : educationEditCurrent.city)}
                              onChange={(e) => setcity(e.target.value)} />
                          </div>

                          <div className="profile-input profile-jobTitle w-50">
                            <div class="sub-skillHeading">
                              <p>
                                <b>Country</b>
                                <sub></sub>
                              </p>
                            </div>
                            <input type="text"
                              placeholder="Enter Country"
                              className="InputProject w-80"
                              value={isNewEducation ? (country == null ? '' : country) : (country != null ? country : educationEditCurrent.country)}
                              onChange={(e) => setcountry(e.target.value)} />
                          </div>
                        </div>

                        <div className="input-merge d-flex">
                          <div className="profile-input profile-jobTitle w-50">
                            <div class="sub-skillHeading">
                              <p>
                                <b>Start Date</b>
                                <sub></sub>
                              </p>
                            </div>
                            <input type="text"
                              placeholder="eg. dd/mm/yyyy"
                              className="InputProject w-80" value={isNewEducation ? (eduStartDate == null ? '' : eduStartDate) : (eduStartDate != null ? eduStartDate : educationEditCurrent.startDate)} onChange={(e) => seteduStartDate(e.target.value)} />
                          </div>

                          <div className="profile-input profile-jobTitle w-50">
                            <div class="sub-skillHeading">
                              <p>
                                <b>End Date</b>
                                <sub></sub>
                              </p>
                            </div>
                            <input type="text"
                              placeholder="eg. dd/mm/yyyy"
                              className="InputProject w-80" value={isNewEducation ? (eduEndDate == null ? '' : eduEndDate) : (eduEndDate != null ? eduEndDate : educationEditCurrent.endDate)} onChange={(e) => seteduEndDate(e.target.value)} />
                          </div>
                        </div>

                        <div className="profile-input ">
                          <div class="sub-skillHeading">
                            <p>
                              <b>Description</b>
                              <sub></sub>
                            </p>
                          </div>
                          <textarea id="w3review"
                            placeholder="Enter Description"
                            name="w3review" className="InputProject w-80" value={isNewEducation ? (eduDescription == null ? '' : eduDescription) : (eduDescription != null ? eduDescription : educationEditCurrent.description)} onChange={(e) => seteduDescription(e.target.value)} rows="6" cols="50">
                          </textarea>
                        </div>

                        <div className="profileEditActionBtns d-flex w-100">
                          <div className="Save-btn w-20 mx-4 my-4">
                            <button className="btn btn-success w-100" onClick={() => updateEducation()}>Save</button>
                          </div>
                          <div className="Cancel-btn w-20 mx-4 my-4">
                            <button className="btn w-80 " onClick={() => { toggleEdit('education'); }}>Cancel</button>
                          </div>
                        </div>

                      </div>

                      <div className="newObject isNewEducation">
                        <div className="newObjectBtn">
                          <div class="add-btn w-20" onClick={() => { toggleEdit('education'); setisNewEducation(true); }} >
                            <ion-icon name="add"></ion-icon>
                            <div>Add</div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="rb1-c4 personal-skills">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      <div class="personal-project-head">
                        <div class="icon">
                          <ion-icon name="bulb"></ion-icon>
                        </div>
                        <div class="head-text">Skills</div>

                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">

                      <div class={`skills ${skillEdit == true ? 'displayNone' : ''} `}>
                        {resume.skill.map((data) => {
                          return (
                            <div className="education-content d-flex">
                              <div className="education-content-title">
                                <div className="education-upperBox d-flex">
                                  <div className="education-Degree">
                                    {data.name}
                                  </div>
                                </div>
                                <div className="education-lowerBox d-flex">
                                  <div className="education-endDate">
                                    {data.subName}
                                  </div>
                                </div>
                              </div>
                              <div className="education-actions d-flex">
                                <div class="edit" onClick={() => { setskillEditCurrent(data); toggleEdit('skill'); }} >
                                  <ion-icon name="create-outline"></ion-icon>
                                  <div>Edit</div>
                                </div>
                                <div class="delete-action" onClick={() => { deleteSkillItem(data._id) }}>
                                  <ion-icon name="trash"></ion-icon>
                                  <div>Delete</div>
                                </div>
                              </div>

                            </div>
                          )
                        })}
                      </div>

                      <div className={`skill-input-container ${skillEdit == false ? 'displayNone' : ''} `}>
                        <p class="head">
                          <b>Create Skill</b>
                        </p>
                        <button type="button" class="ProjectButton">
                          <img src="iicon.png" alt="" class="ProjectImage" /> Tips
                        </button>
                        <div class="skill">
                          <div class="skillHeading">
                            <p>
                              <b>Skill *</b>
                            </p>
                          </div>
                          <input
                            type="text"
                            placeholder="Enter Skill"
                            class="InputProject"
                            value={isNewSkill ? (skillName == null ? '' : skillName) : (skillName != null ? skillName : skillEditCurrent.name)}
                            onChange={(e) => setskillName(e.target.value)}
                          />
                          <div class="sub-skillHeading">
                            <p>
                              <b>Sub-skills</b>
                              <sub> (recommended)</sub>
                            </p>
                          </div>
                          <input
                            type="text"
                            placeholder="Enter Sub-Skill"
                            class="InputProject"
                            value={isNewSkill ? (skillSubName == null ? '' : skillSubName) : (skillSubName != null ? skillSubName : skillEditCurrent.subName)}
                            onChange={(e) => setskillSubName(e.target.value)}
                          />
                          <div class="sub-skillHeading">
                            <p>
                              <b>Select Skill Level</b>
                              <sub> (optional)</sub>
                            </p>
                          </div>
                          <input
                            type="text"
                            placeholder="Skill-Level"
                            class="InputProject"
                            value={isNewSkill ? (skillLevel == null ? '' : skillLevel) : (skillLevel != null ? skillLevel : skillEditCurrent.level)}
                            onChange={(e) => setskillLevel(e.target.value)}
                          />
                        </div>
                        <div className="profileEditActionBtns d-flex w-100">
                          <div className="Save-btn w-20 mx-4 my-4">
                            <button className="btn btn-success w-100" onClick={() => updateSkill()}>Save</button>
                          </div>
                          <div className="Cancel-btn w-20 mx-4 my-4">
                            <button className="btn w-80 " onClick={() => { toggleEdit('skill'); }}>Cancel</button>
                          </div>
                        </div>
                      </div>

                      <div className="newObject isNewEducation">
                        <div className="newObjectBtn">
                          <div class="add-btn w-20" onClick={() => { setskillEdit(!skillEdit); setisNewSkill(true); }} >
                            <ion-icon name="add"></ion-icon>
                            <div>Add</div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="rb1-c3 personal-project">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingOne">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      <div class="personal-project-head">
                        <div class="icon">
                          <ion-icon name="folder"></ion-icon>
                        </div>
                        <div class="head-text">Projects</div>
                        {/* <div class="personal-detail-edit">
                          <div class="edit">
                            <ion-icon name="create-outline"></ion-icon>
                            <div>Edit</div>
                          </div>
                        </div> */}
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body" id="projectFieldsBody">

                      <div class={`project ${projectEdit == true ? 'displayNone' : ''} `}>
                        {resume.project.map((data) => {
                          return (
                            <div className="education-content d-flex">
                              <div className="education-content-title">
                                <div className="education-upperBox d-flex">
                                  <div className="education-Degree">
                                    {data.title}
                                  </div>
                                </div>
                                <div className="education-lowerBox d-flex">
                                  <div className="education-endDate">
                                    {data.subTitle}
                                  </div>
                                </div>
                              </div>
                              <div className="education-actions d-flex">
                                <div class="edit" onClick={() => { setprojectEditCurrent(data); setprojectDescription(data.description); toggleEdit('project'); }} >
                                  <ion-icon name="create-outline"></ion-icon>
                                  <div>Edit</div>
                                </div>
                                <div class="delete-action" onClick={() => { deleteProjectItem(data._id) }}>
                                  <ion-icon name="trash"></ion-icon>
                                  <div>Delete</div>
                                </div>
                              </div>

                            </div>
                          )
                        })}
                      </div>

                      <div className={`skill-input-container ProjectDropbox1 ${projectEdit == false ? 'displayNone' : ''} `}>
                        <p class="head">
                          <b>Create Project </b>
                        </p>
                        <button type="button" class="ProjectButton">
                          <img src="/img/icon.png" alt="" class="ProjectImage" />{" "}
                          Tips
                        </button>
                        <div class="content">
                          <div>
                            <p>
                              <b>Project Title *</b>
                            </p>
                          </div>
                          <input
                            type="text"
                            id="projectTitle"
                            placeholder="Enter Project Title"
                            class="InputProject"
                            value={isNewProject ? (projectTitle == null ? '' : projectTitle) : (projectTitle != null ? projectTitle : projectEditCurrent.title)}
                            onChange={(e) => setprojectTitle(e.target.value)}
                          />
                        </div>
                        <div class="linkbox">
                          <button type="button" class="LinkButton">
                            <img src="/img/link.png" alt="" class="LinkImage" />{" "}
                            Link
                          </button>
                        </div>
                        <div class="content">
                          <div>
                            <p>
                              <b>Sub Title</b>
                              <sub> (Optional)</sub>
                            </p>
                          </div>
                          <input
                            type="text"
                            id="projectSubTitle"
                            placeholder="Enter Sub Title"
                            class="InputProject"
                            value={isNewProject ? (projectSubTitle == null ? '' : projectSubTitle) : (projectSubTitle != null ? projectSubTitle : projectEditCurrent.subTitle)}
                            onChange={(e) => setprojectSubTitle(e.target.value)}
                          />
                          <div class="startdate">
                            <p>
                              <b>Start Date</b>
                              <sub> (Optional)</sub>
                            </p>
                            <input type="month" placeholder="Month" />
                            <p>
                              <b>End Date</b>
                              <sub> (Optional)</sub>
                            </p>
                          </div>
                        </div>
                        <div className="rich-text-editor">
                          < RichTEditor />
                        </div>
                        <div class="SaveDelbtn my-2 d-flex">
                          <button
                            type="button"
                            onclick="projectEdit(1)"
                            class="btn mx-2 btn-success"
                            onClick={() => updateProject()}
                          >
                            Savee
                          </button>
                          <button type="button" class="btn mx-4 btn-danger" onClick={() => { toggleEdit('project'); }}>
                            Cancel
                          </button>
                        </div>
                      </div>

                      <div class="addnew my-4">
                        <button
                          onclick="Addproject()"
                          type="button"
                          class="btn btn-primary"
                          onClick={() => { setprojectEdit(!projectEdit); setprojectDescription(null); setisNewProject(true); }}
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="rb1-c4 personal-experience">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingFive">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFive"
                      aria-expanded="false"
                      aria-controls="flush-collapseFive"
                    >
                      <div class="personal-project-head">
                        <div class="icon">
                          <ion-icon name="folder"></ion-icon>
                        </div>
                        <div class="head-text">Experience</div>
                        {/* <div class="personal-detail-edit">
                          <div class="edit">
                            <ion-icon name="create-outline"></ion-icon>
                            <div>Edit</div>
                          </div>
                        </div> */}
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingFive"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body" id="projectFieldsBody">

                      <div class={`project ${ExperinceEdit == true ? 'displayNone' : ''} `}>
                        {resume.experience.map((data) => {
                          return (
                            <div className="education-content d-flex">
                              <div className="education-content-title">
                                <div className="education-upperBox d-flex">
                                  <div className="education-Degree">
                                    {data.jobTitle}
                                  </div>
                                </div>
                                <div className="education-lowerBox d-flex">
                                  <div className="education-endDate">
                                    {data.employer}
                                  </div>
                                </div>
                              </div>
                              <div className="education-actions d-flex">
                                <div class="edit" onClick={() => { setexpEditCurrent(data); setprojectDescription(data.description); toggleEdit('experience'); }} >
                                  <ion-icon name="create-outline"></ion-icon>
                                  <div>Edit</div>
                                </div>
                                <div class="delete-action" onClick={() => { deleteExperienceItem(data._id) }}>
                                  <ion-icon name="trash"></ion-icon>
                                  <div>Delete</div>
                                </div>
                              </div>

                            </div>
                          )
                        })}
                      </div>

                      <div className={`skill-input-container ProjectDropbox1 ${ExperinceEdit == false ? 'displayNone' : ''} `}>
                        <p class="head">
                          <b>Create Experience </b>
                        </p>
                        <button type="button" class="ProjectButton">
                          <img src="/img/icon.png" alt="" class="ProjectImage" />{" "}
                          Tips
                        </button>
                        <div class="content">
                          <div>
                            <p>
                              <b>Job Title *</b>
                            </p>
                          </div>
                          <input
                            type="text"
                            id="projectTitle"
                            placeholder="Enter Job Title"
                            class="InputProject"
                            value={isNewExp ? (expJobTitle == null ? '' : expJobTitle) : (expJobTitle != null ? expJobTitle : expEditCurrent.jobTitle)}
                            onChange={(e) => setexpJobTitle(e.target.value)}
                          />
                        </div>
                        <div class="linkbox">
                          <button type="button" class="LinkButton">
                            <img src="/img/link.png" alt="" class="LinkImage" />{" "}
                            Employer
                          </button>
                        </div>
                        <div class="content">
                          <div>
                            <p>
                              <b>Employer</b>
                              <sub> (Optional)</sub>
                            </p>
                          </div>
                          <input
                            type="text"
                            id="projectSubTitle"
                            placeholder="Enter Sub Title"
                            class="InputProject"
                            value={isNewExp ? (employer == null ? '' : employer) : (employer != null ? employer : expEditCurrent.employer)}
                            onChange={(e) => setemployer(e.target.value)}
                          />
                          <div>
                            <p>
                              <b>City</b>
                              <sub> (Optional)</sub>
                            </p>
                          </div>
                          <input
                            type="text"
                            id="projectSubTitle"
                            placeholder="Enter Sub Title"
                            class="InputProject"
                            value={isNewExp ? (expCity == null ? '' : expCity) : (expCity != null ? expCity : expEditCurrent.city)}
                            onChange={(e) => setexpCity(e.target.value)}
                          />
                          <div>
                            <p>
                              <b>Country</b>
                              <sub> (Optional)</sub>
                            </p>
                          </div>
                          <input
                            type="text"
                            id="projectSubTitle"
                            placeholder="Enter Sub Title"
                            class="InputProject"
                            value={isNewExp ? (expCountry == null ? '' : expCountry) : (expCountry != null ? expCountry : expEditCurrent.country)}
                            onChange={(e) => setexpCountry(e.target.value)}
                          />
                          <div class="startdate">
                            <p>
                              <b>Start Date</b>
                              <sub> (Optional)</sub>
                            </p>
                            <input type="month" placeholder="Month" />
                            <p>
                              <b>End Date</b>
                              <sub> (Optional)</sub>
                            </p>
                          </div>
                        </div>
                        <div className="rich-text-editor">
                          < RichTEditor />
                        </div>
                        <div class="SaveDelbtn my-2 d-flex">
                          <button
                            type="button"
                            onclick="projectEdit(1)"
                            class="btn mx-2 btn-success"
                            onClick={() => updateExperience()}
                          >
                            Savee
                          </button>
                          <button type="button" class="btn mx-4 btn-danger" onClick={() => { toggleEdit('experience'); }}>
                            Cancel
                          </button>
                        </div>
                      </div>

                      <div class="addnew my-4">
                        <button
                          onclick="Addproject()"
                          type="button"
                          class="btn btn-primary"
                          onClick={() => { setExperinceEdit(!ExperinceEdit); setprojectDescription(null); setisNewExp(true); }}
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <div class="add-content">
            <button type="button" class="button">
              + Add Content
            </button>
          </div>
        </div>

        <div class="right-temp-box">
          <div class="menu slide-menu-right">
            <button class="close-menu">Close &rarr;</button>
            <div class="resume-temp">
              <Resume1Temp resume={resume} />
            </div>
          </div>
          <div class="right-arrow">
            <button class="toggle-slide-right">
              <i class="fa-solid fa-circle-chevron-left"> P r e v i e w </i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import Resume1Temp from "./Resume1Temp";
import { useEffect, useState } from "react";
import RichTEditor from './RichTEditor'
import $ from 'jquery';
import { useDispatch, useSelector } from "react-redux";
import { resumeEdit } from "../actions/resumeEditAction";


export default function ResumeEdit({resume , loading}) {

  console.log(resume)

  const dispatch = useDispatch()

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
                    <div class="edit">
                      <ion-icon name="create-outline"></ion-icon>
                      <div>Edit</div>
                    </div>
                  </div>
                </div>
                <div class="rb1-c2-content">
                  <div class="c2-content-body">
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
                          <div class="personal-detail-edit">
                            <div class="edit">
                              <ion-icon name="create-outline"></ion-icon>
                              <div>Edit</div>
                            </div>
                          </div>
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
                        <div class="ProjectDropbox1">
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
                            >
                              Save
                            </button>
                            <button type="button" class="btn mx-4 btn-danger">
                              Delete
                            </button>
                          </div>
                        </div>

                        <div class="addnew my-4">
                          <button
                            onclick="Addproject()"
                            type="button"
                            class="btn btn-primary"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rb1-c4 personal-skills">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        <div class="personal-project-head">
                          <div class="icon">
                            <ion-icon name="bulb"></ion-icon>
                          </div>
                          <div class="head-text">Skills</div>
                          <div class="personal-detail-edit">
                            <div class="edit">
                              <ion-icon name="create-outline"></ion-icon>
                              <div>Edit</div>
                            </div>
                          </div>
                        </div>
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingOne"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        <div class="skills">
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
                            />
                          </div>
                        </div>
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
                          <div class="personal-detail-edit">
                            <div class="edit">
                              <ion-icon name="create-outline"></ion-icon>
                              <div>Edit</div>
                            </div>
                          </div>
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
                        Placeholder content for this accordion, which is intended to
                        demonstrate the <code>.accordion-flush</code> class. This is
                        the first item's accordion body.
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
        </div>)
    </>
  );
}

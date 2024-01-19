import React, { useEffect, useState } from "react";
import './teacher.css';
import axios from "axios";

function Teacher() {
   const BASEurl = "http://localhost:3000/teacherList"
   const [teacherName, setTeacherName] = useState([]);
   const [classviseData, setClassviseData] = useState("");
   const fetchTeacher = async () => {
      try {
         const response = await axios.get(`${BASEurl}${classviseData}`);
         setTeacherName(response.data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      fetchTeacher();
   }, [])
   const handleClassChange = (event) => {
      setClassviseData(event.target.value);
   };

   if (teacherName.length === 0) {
      return (
         <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h1>No teacher list available</h1>
         </div>
      )
   }
   else {
      return (
         <>
            <div className="temp">
               <h4 className="text-primary m-3">Teachers List</h4>
               {
                  teacherName.map((itms) => {
                     return (
                        <div className="teacher_main_class">
                           <div className='teacher_box'>
                              <h4 class="branch_teacher">{itms.position}</h4>
                              <div className="teacher_deta">
                                 <div className="linebreak">
                                    <b> Teacher Name:-</b>{itms.teacherName}
                                 </div>
                                 <div className="linebreak">
                                    <b>Experince:- </b>{itms.experience}
                                 </div>
                                 <div className="linebreak">
                                    <b>Science:- </b>{itms.joinDate}
                                 </div>
                                 <div className="linebreak">
                                    <b>Subject:- </b>{itms.subjectTeacher}
                                 </div>
                                 <div className="linebreak">
                                    <b>Qualification:- </b>{itms.qualification}
                                 </div>
                                 <div className="contact">
                                    <b>Mobile Number:- </b><span>{itms.teacon}</span>
                                 </div>
                                 <div className="contact">
                                    <b>E-male:- </b><span>{itms.emails}</span>
                                 </div>
                                 <div className="linebreak">
                                    <b>Meeting Time:- </b>{itms.meetingTime}
                                 </div>
                              </div>
                           </div>
                        </div>
                     )
                  })
               }
            </div>
         </>
      );
   }
}
export default Teacher;     
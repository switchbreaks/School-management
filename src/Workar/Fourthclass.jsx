import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Teacher/teacher.css';     // this css comming from Teacher deatle component  
const Fourthclass = () => {
    const BASEurl = "http://localhost:3000/helpers";
    const [fetchHelper, setFetcHelper] = useState([]);

    const fetchHelperAPI = async () => {
        await axios.get(BASEurl).then((res) => setFetcHelper(res.data)).catch((err) => { console.log(err) });
    }
    useEffect(() => {
        fetchHelperAPI();
    }, [])

    return (
        <>
            <div className="temp">
                <div className="teacher_main_class">
                    {
                        fetchHelper.map((itms) => {
                            const { name, joinDate, emails, mobileNumber, gender, position, experience, meetingTime, } = itms;
                            return (
                                <>
                                    <div className='teacher_box'>
                                        <h4 class="branch_teacher">{position}</h4>
                                        <div className="teacher_deta">
                                            <div className="linebreak">
                                                <b>  Name:-</b>{name}
                                            </div>
                                            <div className="linebreak">
                                                <b>Experince:- </b>{experience} Years
                                            </div>
                                            <div className="linebreak">
                                                <b>Working Science:- </b>{joinDate}
                                            </div>
                                            <div className="linebreak">
                                                <b>Status:- </b>{position}
                                            </div>
                                            <div className="linebreak">
                                                <b>Gardner:- </b>{gender}
                                            </div>
                                            <div className="contact">
                                                <b>Mobile Number:- </b><span>{mobileNumber}</span>
                                            </div>
                                            <div className="contact">
                                                <b>E-male:- </b><span>{emails}</span>
                                            </div>
                                            <div className="linebreak">
                                                <b>Meeting Time:- </b>{meetingTime}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })

                    }
                </div>
            </div>
        </>
    );
}
export default Fourthclass;
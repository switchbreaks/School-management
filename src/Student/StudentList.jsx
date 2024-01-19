import React, { useEffect, useState } from "react";
import './stu.css'
import axios from "axios";

const StudentList = () => {
    const BASEurl = "http://localhost:3000/topperStudentData";
    const [students, setStudents] = useState([]);
    const [classviseData, setClassviseData] = useState("");

    const studentFunction = async () => {
        try {
            const response = await axios.get(`${BASEurl}${classviseData}`);
            setStudents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        studentFunction();
    }, [classviseData]);

    const handleClassChange = (event) => {
        setClassviseData(event.target.value);
    };
    return (
        <>
            <div className="student_main_class">

                <div className="btnAndHeader">
                    <h4 className="text-primary m-3">Our Best Student List</h4>
                    <div className="d-flex">
                        <div style={{ marginRight: "75px" }}>
                            <select
                                className="form-select threeBtns text-primary border border-dark"
                                onChange={handleClassChange}
                                value={classviseData}
                            >
                                <option value="">All Class</option>
                                <option value="?stuClass=6">6th</option>
                                <option value="?stuClass=7">7th</option>
                                <option value="?stuClass=8">8th</option>
                                <option value="?stuClass=9">9th</option>
                                <option value="?stuClass=10">10th</option>
                                <option value="?stuClass=11">11th</option>
                                <option value="?stuClass=12">12th</option>
                            </select>

                        </div>
                        <div style={{ marginRight: "75px" }}>
                            <select
                                className="form-select threeBtns text-primary border border-dark"
                                onChange={handleClassChange}
                                value={classviseData}
                            >
                                <option value="">All Years</option>
                                <option value="?passYear=2019">2019</option>
                                <option value="?passYear=2020">2020</option>
                                <option value="?passYear=2021">2021</option>
                                <option value="?passYear=2022">2022</option>
                                <option value="?passYear=2023">2023</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="student_submain_class">
                    {
                        students.length !== 0 ?
                            students.map((itms) => {
                                const { passYear, stuRank, rollNumber, stuName, stuClass, fathName, marks, studentRank, subject, } = itms;
                                return (
                                    <div className="stu_box" key={rollNumber}>
                                        <div className="sub_box">
                                            <div style={{ display: "flex" }}>
                                                <img
                                                    src="dp.png"
                                                    className="stu_img_class"
                                                    alt="img not found"
                                                />
                                                <div style={{ marginLeft: "20px" }}>
                                                    <div className="stu_data">
                                                        <b>Batch:-</b>
                                                        {passYear}
                                                    </div>
                                                    <div className="stu_data">
                                                        <b>Class:- </b>
                                                        {stuClass}
                                                    </div>
                                                    <div className="stu_data">
                                                        <b>{stuRank}:-</b> {studentRank}
                                                    </div>
                                                    <div className="stu_data">
                                                        <b>Mark:- </b>
                                                        {marks}
                                                    </div>
                                                    <div className="stu_data">
                                                        <b>Roll Number:-</b>
                                                        {rollNumber}
                                                    </div>
                                                    <div className="stu_data">
                                                        <b>Branch:- </b>
                                                        {subject}
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ marginLeft: "17px", marginTop: "7px" }}>
                                                <div className="stu_data">
                                                    <b>Name:- </b>
                                                    {stuName}
                                                </div>
                                                <div className="stu_data">
                                                    <b>Father Name:- </b>
                                                    {fathName}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    );
}

export default StudentList;

// what ever css apply for form all css comming from the ****""teacherList.css file and stu.css file""
import React, { useState, useEffect } from 'react'
import { CgAdd } from "react-icons/cg";
import { FaList } from "react-icons/fa";
import axios from 'axios';
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import swal from 'sweetalert';



const AddTopper = () => {
    const BASEurl = "http://localhost:3000/topperStudentData";
    const [classviseData, setClassviseData] = useState("");
    const [errors, setErrors] = useState({});
    const [showInputBox, setShowInputBox] = useState(false);
    const [students, setStudents] = useState([]);

    const [toppersData, setToppersData] = useState({
        stuName: '',
        passYear: '',
        rollNumber: '',
        studentRank: '',
        stuRank: '',
        stuClass: '',
        fathName: '',
        marks: '',
        subject: '',
        data: Date(),
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setToppersData({ ...toppersData, [name]: value });
        setErrors({ ...errors, [name]: '' });

    };

    const studentFunction = async () => {
        try {
            const response = await axios.get(`${BASEurl}${classviseData}`);
            setStudents(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        studentFunction();
    }, [classviseData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(BASEurl, toppersData);
                console.log('Response:', response);
                if (response.status === 201) {
                    setToppersData({
                        stuName: '',
                        passYear: '',
                        rollNumber: '',
                        studentRank: '',
                        stuRank: '',
                        stuClass: '',
                        fathName: '',
                        marks: '',
                        subject: '',
                    })
                    swal("Query", "Success", "Submitted");
                    setShowInputBox(false)
                    studentFunction();

                }
            } catch (error) {
                if (error.response.status === 404) {
                    swal("Query", "Error", `${error.response.statusText}`);
                }

            }
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = ['stuName', 'passYear', 'rollNumber', 'studentRank', 'stuRank', 'stuClass', 'fathName', 'marks', 'subject'];
        requiredFields.forEach((field) => {
            if (!toppersData[field]) {
                newErrors[field] = `This field is required`;
            }
        });
        if (toppersData.subject === "--- Subject ---") {
            newErrors.subject = 'Please Select Branch';
        }
        if (toppersData.stuClass === "--- Class ---") {
            newErrors.stuClass = 'Please Select Class';
        }
        if (toppersData.studentRank === "--- Rank ---") {
            newErrors.studentRank = 'Please Select Rank';
        }
        if (toppersData.stuRank === "--- Topper ---") {
            newErrors.stuRank = 'Please Topper Category';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // code for deleting data from topper list
    const handleClassChange = (event) => {
        setClassviseData(event.target.value);
    };

    const handleDelete = async (id) => {
        try {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this data!",
                icon: "warning",
                buttons: ["Cancel", "Yes, delete it!"],
                dangerMode: true,
            })
                .then(async (willDelete) => {
                    if (willDelete) {
                        const response = await fetch(`${BASEurl}/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        if (response.ok) {
                            studentFunction();
                        } else {
                            swal("Error", "Failed to delete data.", "error");
                        }
                    }
                });

        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <h3 className='teacherList'>   {showInputBox ? "Add New" : "Student List"}</h3>
                <div className='d-flex mt-3'>
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
                    {showInputBox ?
                        <button className='m-1 btn btn-primary' onClick={() => setShowInputBox(!showInputBox)}>
                            Show Topper List
                            <FaList style={{ fontSize: "15px", marginLeft: "7px", color: "#fff" }} />
                        </button>
                        :
                        <button className='m-1 btn btn-primary' onClick={() => setShowInputBox(!showInputBox)}>
                            Add Student
                            <CgAdd style={{ fontSize: "25px", marginLeft: "7px", color: "#fff" }} />
                        </button>
                    }
                </div>
            </div>
            {showInputBox ?
                <form onSubmit={handleSubmit}>
                    <div className='MainTeacherFormDiv'>
                        <div>
                            <div className='teacherNamediv'>
                                <span className='adminTeacherSpan'>Student Name*</span>
                                <input type='text' placeholder='Student Name' className='AdminTeacherInput'
                                    name='stuName' value={toppersData.stuName} onChange={handleChange} />
                            </div>
                            <span className="error-message">{errors.stuName && errors.stuName}</span>
                        </div>
                        <div>
                            <div className='teacherNamediv'>
                                <span className='adminTeacherSpan'>Class</span>
                                <select
                                    required
                                    className="AdminTeacherInput"
                                    name='stuClass' value={toppersData.stuClass} onChange={handleChange}
                                >
                                    <option className='AdminTeacherInput'>--- Class ---</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                </select>
                            </div>
                            <span className="error-message">{errors.stuClass && errors.stuClass}</span>

                        </div>
                        <div>
                            <div className='teacherNamediv'>
                                <span className='adminTeacherSpan'>Roll Number</span>
                                <input type='number' placeholder='Roll Number' className='AdminTeacherInput'
                                    name='rollNumber' value={toppersData.rollNumber} onChange={handleChange} />
                            </div>
                            <span className="error-message">{errors.rollNumber && errors.rollNumber}</span>

                        </div>
                        <div>
                            <div className='teacherNamediv'>
                                <span className='adminTeacherSpan'>Mark</span>
                                <input type='number' placeholder='Mark' className='AdminTeacherInput'
                                    name='marks' value={toppersData.marks} onChange={handleChange} />
                            </div>
                            <span className="error-message">{errors.marks && errors.marks}</span>

                        </div>
                        <div>
                            <div className='teacherNamediv'>
                                <span className='adminTeacherSpan'>Batch</span>
                                <input type='text' placeholder='Batch' className='AdminTeacherInput'
                                    name='passYear' value={toppersData.passYear} onChange={handleChange} />
                            </div>
                            <span className="error-message">{errors.passYear && errors.passYear}</span>

                        </div>
                        <div>
                            <div className='teacherNamediv'>
                                <span className='adminTeacherSpan'>Topper*</span>
                                <select
                                    required
                                    className="AdminTeacherInput"
                                    name='stuRank'
                                    value={toppersData.stuRank} onChange={handleChange}
                                >
                                    <option className='AdminTeacherInput'>--- Topper ---</option>
                                    <option>State Topper</option>
                                    <option>Distric Topper</option>
                                    <option>Block Topper</option>
                                    <option>College Rank</option>
                                </select>
                            </div>
                            <span className="error-message">{errors.stuRank && errors.stuRank}</span>

                        </div>
                        <div>
                            <div className='teacherNamediv'>
                                <span className='adminTeacherSpan'>Rank*</span>
                                <select
                                    required
                                    className="AdminTeacherInput"
                                    name="studentRank"
                                    value={toppersData.studentRank} onChange={handleChange}
                                >
                                    <option className='AdminTeacherInput'>--- Rank ---</option>
                                    <option>I</option>
                                    <option>II</option>
                                    <option>III</option>
                                </select>
                            </div>
                            <span className="error-message">{errors.studentRank && errors.studentRank}</span>

                        </div>
                        <div>
                            <div className='teacherNamediv'>
                                <span className='adminTeacherSpan'>Father Name*</span>
                                <input type='text' placeholder='Teacher Name' className='AdminTeacherInput'
                                    name="fathName" value={toppersData.fathName} onChange={handleChange} />
                            </div>
                            <span className="error-message">{errors.fathName && errors.fathName}</span>

                        </div>
                        <div>
                            <div className='teacherNamediv'>
                                <span className='adminTeacherSpan'>Branch</span>
                                <select
                                    required
                                    className="AdminTeacherInput"
                                    name='subject'
                                    value={toppersData.subject} onChange={handleChange}
                                >
                                    <option className='AdminTeacherInput'>--- Subject ---</option>
                                    <option>Art</option>
                                    <option>Science</option>
                                    <option>Commerce</option>
                                </select>
                            </div>
                            <span className="error-message">{errors.subject && errors.subject}</span>
                        </div>
                        <div style={{ width: "380px", flex: "end" }}>
                            <button className="mt-4 btn btn-primary" type="submit">Save</button>
                        </div>
                    </div>
                </form> : <>
                    <div className="student_submain_class">
                        {
                            students.length !== 0 ?
                                students.map((itms) => {
                                    const { passYear, stuRank, rollNumber, stuName, stuClass, fathName, marks, id, subject, studentRank } = itms;
                                    return (
                                        <div className="stu_box" key={id}>
                                            <div className='bothBtnsofAdmin'>
                                                <MdDeleteForever color='red' style={{ marginRight: "20px", cursor: "pointer" }} onClick={() => handleDelete(id)} />
                                            </div>
                                            <div className="sub_box">

                                                <div style={{ display: "flex" }}>
                                                    <img src="dp.png" className="stu_img_class" alt="img not found" />

                                                    <div style={{ marginLeft: "20px" }}>
                                                        <div className="stu_data">
                                                            <b>Batch:-</b>{passYear}
                                                        </div>
                                                        <div className="stu_data">
                                                            <b>Class:- </b>{stuClass}
                                                        </div>
                                                        <div className="stu_data">
                                                            <b>{stuRank}:- </b>{studentRank}
                                                        </div>
                                                        <div className="stu_data">
                                                            <b>Mark:- </b>{marks}
                                                        </div>
                                                        <div className="stu_data">
                                                            <b>Roll Number:-</b>{rollNumber}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div style={{ marginLeft: "17px" }}>

                                                    <div className="stu_data">
                                                        <b>Name:- </b>{stuName}
                                                    </div>

                                                    <div className="stu_data">
                                                        <b>Father Name:- </b>{fathName}
                                                    </div>
                                                    <div className="stu_data">
                                                        <b>Branch Name:- </b>{subject}
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : <>
                                    <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    </div>
                                </>
                        }
                    </div>
                </>
            }

        </div>
    )
}

export default AddTopper
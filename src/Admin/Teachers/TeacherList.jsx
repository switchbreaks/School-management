import React, { useState, useEffect } from 'react'
import axios from "axios";
import './teacherList.css';
import { CgAdd } from "react-icons/cg";
import { FaList } from "react-icons/fa";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import swal from 'sweetalert';


const TeacherList = () => {
    const BASEurl = "http://localhost:3000/teacherList";
    const [showInputBox, setShowInputBox] = useState(false);
    const [teacherNames, setTeacherName] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        teacherName: '',
        aadhaar: '',
        position: '',
        gender: '',
        joinDate: '',
        subjectTeacher: '',
        experience: '',
        label: '',
        qualification: '',
        mobileNumber: '',
        accountNo: '',
        ifsc: '',
        emails: '',
        meetingTime: '',
        address: '',
        pinCode: '',
        regdata: Date(),

    });
    const fetchTeacher = async () => {
        await axios.get(BASEurl).then((res) => setTeacherName(res.data)).catch((err) => { console.log(err) });
    }

    useEffect(() => {
        fetchTeacher();
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(BASEurl, formData);
                if (response.status === 201) {
                    swal("Query", "Success", "Submitted");
                    setFormData({
                        teacherName: '',
                        gender: '',
                        position: '',
                        joinDate: '',
                        subjectTeacher: '',
                        experience: '',
                        label: '',
                        qualification: '',
                        mobileNumber: '',
                        accountNo: '',
                        ifsc: '',
                        emails: '',
                        meetingTime: '',
                        aadhaar: '',
                        pinCode: '',

                    });
                    setShowInputBox(false);
                    fetchTeacher();
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

        // Basic required field validation
        const requiredFields = ['teacherName', 'aadhaar', 'position', 'joinDate', 'subjectTeacher', 'experience', 'accountNo', 'ifsc', 'label', 'emails', 'qualification', 'mobileNumber', 'address', 'pinCode'];
        requiredFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = `This field is required`;
            }
        });

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.emails && !emailRegex.test(formData.emails)) {
            newErrors.emails = 'Invalid email format';
        }
        if (formData.gender === "--- Gender ---") {
            newErrors.gender = 'Please Select Gender';
        }

        // Mobile number length validation
        if (formData.mobileNumber && formData.mobileNumber.length !== 10) {
            newErrors.mobileNumber = 'Mobile number should be 10 digits';
        }
        if (formData.aadhaar.length !== 12) {
            newErrors.aadhaar = 'Aadhaar number should be 12 digits';
        }
        if (formData.pinCode && formData.pinCode.length !== 6) {
            newErrors.pinCode = 'Pin Code should be 6 digits';
        }

        // Set validation errors
        setErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };

    const handleDelete = async (id) => {
        try {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this data!",
                icon: "warning",
                buttons: ["Cancel", "Yes, delete it!"],
                dangerMode: true,
            }).then(async (willDelete) => {
                if (willDelete) {
                    const response = await fetch(`${BASEurl}/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (response.ok) {
                        fetchTeacher();
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
        <div className='adminTeacherDiv'>
            <div className='subadminTeacherDIv'>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <h3 className='teacherList'>   {showInputBox ? " Add New" : "Teachers  List"}</h3>
                    <div>
                        {showInputBox ?
                            <button className='m-1 btn btn-primary' onClick={() => setShowInputBox(!showInputBox)}>
                                Show Teacher
                                <FaList style={{ fontSize: "15px", marginLeft: "7px", color: "#fff" }} />
                            </button>
                            :
                            <button className='m-1 btn btn-primary' onClick={() => setShowInputBox(!showInputBox)}>
                                Add Teacher
                                <CgAdd style={{ fontSize: "25px", marginLeft: "7px", color: "#fff" }} />
                            </button>
                        }
                    </div>
                </div>
                {
                    showInputBox ? <form onSubmit={handleSubmit}>
                        <div className='MainTeacherFormDiv'>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Teacher Name*</span>
                                    <input type='text' placeholder='Teacher Name' className='AdminTeacherInput'
                                        name='teacherName' value={formData.teacherName} onChange={handleChange} />
                                </div>
                                <span className="error-message">{errors.teacherName && errors.teacherName}</span>
                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Aadhaar number Name*</span>
                                    <input type='number' placeholder='0000 0000 0000' className='AdminTeacherInput'
                                        name='aadhaar' value={formData.aadhaar} onChange={handleChange} />
                                </div>
                                <span className="error-message">{errors.aadhaar && errors.aadhaar}</span>
                            </div>
                            <div>

                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Gender*</span>
                                    <select
                                        required
                                        className="AdminTeacherInput"
                                        name='gender'
                                        value={formData.gender} onChange={handleChange}

                                    >
                                        <option className='AdminTeacherInput'>--- Gender ---</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                                <span className="error-message">{errors.gender && errors.gender}</span>

                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Position*</span>
                                    <select
                                        required
                                        className="AdminTeacherInput"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                    >
                                        <option>--- Role ---</option>
                                        <option>Vice Principal</option>
                                        <option>Teacher</option>
                                        <option>Class Coordinator</option>
                                        <option>Lab Assistant</option>
                                    </select>
                                </div>
                                <span className="error-message">{errors.position && errors.position}</span>

                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Join Date*</span>
                                    <input type='date' placeholder='Join Date' className='AdminTeacherInput'
                                        name='joinDate' value={formData.joinDate} onChange={handleChange} />
                                </div>
                                <span className="error-message">{errors.joinDate && errors.joinDate}</span>
                            </div>
                            <div>

                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Subject Teacher*</span>
                                    <select
                                        required
                                        className="AdminTeacherInput"
                                        name="subjectTeacher"
                                        value={formData.subjectTeacher}
                                        onChange={handleChange}
                                    >
                                        <option>--- Select Subject ---</option>
                                        <option>English</option>
                                        <option>Math/Physics</option>
                                        <option>Chemistry</option>
                                        <option>Computer Science</option>
                                        <option>Bio</option>
                                        <option>Hindi/Sanskrit</option>
                                        <option>Drowing</option>
                                        <option>Social Science/History</option>
                                        <option>Polity</option>
                                        <option>Science</option>
                                        <option>All Subject</option>
                                    </select>
                                </div>
                                <span className="error-message">{errors.subjectTeacher && errors.subjectTeacher}</span>
                            </div>
                            <div>

                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Experince Years*</span>
                                    <select
                                        required
                                        className="AdminTeacherInput"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                    >
                                        <option className='AdminTeacherInput'>--- Experince ---</option>
                                        <option>0-1</option>
                                        <option>1-3</option>
                                        <option>4-5</option>
                                        <option>5-8</option>
                                        <option>8</option>
                                    </select>
                                </div>
                                <span className="error-message">{errors.experience && errors.experience}</span>

                            </div>
                            <div>

                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Lable*</span>
                                    <select
                                        required
                                        className="AdminTeacherInput"
                                        name="label"
                                        value={formData.label}
                                        onChange={handleChange}
                                    >
                                        <option className='AdminTeacherInput'>--- Classes can take ---</option>
                                        <option>0 - 5</option>
                                        <option>6 - 8</option>
                                        <option>9 - 10</option>
                                        <option>11 - 12</option>
                                        <option>6 - 12</option>
                                    </select>
                                </div>
                                <span className="error-message">{errors.label && errors.label}</span>

                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Qualification*</span>
                                    <input type='text' placeholder='Qualification' className='AdminTeacherInput'
                                        name='qualification' value={formData.qualification} onChange={handleChange} />
                                </div>
                                <span className="error-message">{errors.qualification && errors.qualification}</span>

                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Account Number*</span>
                                    <input type='text' placeholder='Account Number' className='AdminTeacherInput'
                                        name='accountNo' value={formData.accountNo} onChange={handleChange} />
                                </div>
                                <span className="error-message">{errors.accountNo && errors.accountNo}</span>

                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>IFSC Code*</span>
                                    <input type='text' placeholder='IFSC Code' className='AdminTeacherInput'
                                        name='ifsc' value={formData.ifsc} onChange={handleChange} />
                                </div>
                                <span className="error-message">{errors.ifsc && errors.ifsc}</span>

                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Mobile Number*</span>
                                    <input type='number' placeholder='Mobile Number' className='AdminTeacherInput'
                                        name='mobileNumber' value={formData.mobileNumber} onChange={handleChange} />

                                </div>
                                <span className="error-message">{errors.mobileNumber && errors.mobileNumber}</span>
                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>E-male*</span>
                                    <input type='text' placeholder='E-male' className='AdminTeacherInput'
                                        name='emails' value={formData.emails} onChange={handleChange} />

                                </div>
                                <span className="error-message">{errors.emails && errors.emails}</span>
                            </div>
                            <div>

                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Meeting Time</span>
                                    <input type='time' placeholder='Meeting Time' className='AdminTeacherInput'
                                        name='meetingTime' value={formData.meetingTime} onChange={handleChange} />
                                    <span className="error-message">{errors.meetingTime && errors.meetingTime}</span>

                                </div>
                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Address*</span>
                                    <input type='text' placeholder='Address' className='AdminTeacherInput'
                                        name='address' value={formData.address} onChange={handleChange} />

                                </div>
                                <span className="error-message">{errors.address && errors.address}</span>
                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Pin Code*</span>
                                    <input type='number' placeholder='Address' className='AdminTeacherInput'
                                        name='pinCode' value={formData.pinCode} onChange={handleChange} />

                                </div>
                                <span className="error-message">{errors.pinCode && errors.pinCode}</span>
                            </div>
                            <div style={{ width: "380px", flex: "end" }}>
                                <button className="mt-4 btn btn-primary" type="submit">Save</button>
                            </div>
                        </div>
                    </form>
                        : <div className='adminTeacherList'>
                            {/*   this div of style  code comming from the teacher.css file */}
                            <div className="temp">
                                {
                                    teacherNames.length !== 0 ? <>
                                        {
                                            teacherNames.map((itms, index) => {
                                                const { id } = itms;
                                                return (
                                                    <div className="teacher_main_class" key={index}>
                                                        <div className='teacher_box'>

                                                            <h4 class="branch_teacher">{itms.position}</h4>
                                                            <div className='bothBtnsofAdmin'>
                                                                <button className='deleteBtn'><MdDeleteForever onClick={() => handleDelete(id)} /></button>
                                                            </div>
                                                            <div className="teacher_deta">

                                                                <div className="linebreak">
                                                                    <b> Teacher Name:-</b>{itms.teacherName}
                                                                </div>
                                                                <div className="linebreak">
                                                                    <b>Subject:- </b>{itms.subjectTeacher}
                                                                </div>
                                                                <div className="linebreak">
                                                                    <b>label:- </b>{itms.label}
                                                                </div>
                                                                <div className="linebreak">
                                                                    <b>Experince:- </b>{itms.experience} Years
                                                                </div>
                                                                <div className="linebreak">
                                                                    <b>Experince:- </b>{itms.gender}
                                                                </div>
                                                                <div className="linebreak">
                                                                    <b>Science:- </b>{itms.joinDate}
                                                                </div>
                                                                <div className="linebreak">
                                                                    <b>Qualification:- </b>{itms.qualification}
                                                                </div>
                                                                <div className="contact">
                                                                    <b>Mobile Number:- </b><span>{itms.mobileNumber}</span>
                                                                </div>
                                                                <div className="contact">
                                                                    <b>Aadhaar :- </b><span>{itms.aadhaar}</span>
                                                                </div>
                                                                <div className="contact">
                                                                    <b>Account Number:- </b><span>{itms.accountNo}</span>
                                                                </div>
                                                                <div className="contact">
                                                                    <b>IFSC Code:- </b><span>{itms.ifsc}</span>
                                                                </div>
                                                                <div className="contact">
                                                                    <b>E-male:- </b><span>{itms.emails}</span>
                                                                </div>
                                                                <div className="linebreak">
                                                                    <b>Meeting Time:- </b>{itms.meetingTime}
                                                                </div>
                                                                <div className="linebreak">
                                                                    <b>Address:- </b>{itms.address}
                                                                </div>

                                                                <div className="linebreak">
                                                                    <b>Pin Code:- </b>{itms.pinCode}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </> : (<div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <h3>Add teacher details</h3>
                                    </div>)
                                }

                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
export default TeacherList
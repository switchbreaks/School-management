import React, { useState } from 'react';
import './regis.css';
import axios from 'axios';
import swal from 'sweetalert';


function Registration() {
    const BASEurl = "http://localhost:3000/newRegistrationData";
    const [errors, setErrors] = useState({});
    const [registrationData, setregistrationData] = useState({
        studentName: '',
        fatherName: '',
        motherName: '',
        gender: '',
        classes: '',
        dob: '',
        aaddhar: '',
        religion: '',
        category: '',
        parentsPnoneNo: '',
        alternatePhoneNo: '',
        emailid: '',
        previousSchoolName: '',
        previousClassMarks: '',
        village: '',
        post: '',
        distric: '',
        pincode: '',
        data: Date(),
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setregistrationData({ ...registrationData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(BASEurl, registrationData);
                if (response.status === 201) {
                    swal("Query", "Success", "Submitted");
                    setregistrationData({
                        studentName: '',
                        fatherName: '',
                        motherName: '',
                        gender: '',
                        classes: '',
                        dob: '',
                        aaddhar: '',
                        religion: '',
                        category: '',
                        parentsPnoneNo: '',
                        alternatePhoneNo: '',
                        emailid: '',
                        previousSchoolName: '',
                        previousClassMarks: '',
                        village: '',
                        post: '',
                        distric: '',
                        pincode: '',
                    });
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    swal("Query", "Error", `${error.response.statusText}`);
                } else {
                    console.error('Error occurred:', error);
                }
            }
        }
    }

    const validateForm = () => {
        const newErrors = {};

        // Basic required field validation
        const requiredFields = ['studentName', 'fatherName', 'motherName', 'gender', 'classes', 'dob', 'aaddhar', 'religion', 'category', 'parentsPnoneNo', 'alternatePhoneNo', 'emailid', 'previousSchoolName', 'previousClassMarks', 'village', 'post', 'distric', 'pincode'];
        requiredFields.forEach((field) => {
            if (!registrationData[field]) {
                newErrors[field] = `This field is required`;
            }
        });
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (registrationData.emailid && !emailRegex.test(registrationData.emailid)) {
            newErrors.emailid = 'Invalid email format';
        }
        // Mobile number length validation
        if (registrationData.parentsPnoneNo && registrationData.parentsPnoneNo.length !== 10) {
            newErrors.parentsPnoneNo = 'Mobile number should be 10 digits';
        }
        if (registrationData.alternatePhoneNo && registrationData.alternatePhoneNo.length !== 10) {
            newErrors.alternatePhoneNo = 'Mobile number should be 10 digits';
        }
        if (registrationData.pincode && registrationData.pincode.length !== 6) {
            newErrors.pincode = 'Pin Code should be 6 digits';
        }
        if (registrationData.aaddhar && registrationData.aaddhar.length !== 12) {
            newErrors.aaddhar = 'Aadhaar number should be 12 digits';
        }
        if (registrationData.previousClassMarks > 99) {
            newErrors.previousClassMarks = 'Marks In %';
        }
        // gender validation 
        if (registrationData.gender === "--- Gender ---") {
            newErrors.gender = 'Please Select Gender';
        }
        if (registrationData.classes === "--- Admission for Class ---") {
            newErrors.classes = 'Please Select Class';
        }
        if (registrationData.religion === "--- Select Religion ---") {
            newErrors.religion = 'Please Select Your Religion';
        }
        if (registrationData.category === "--- Select Category ---") {
            newErrors.category = 'Please Select Your Category';
        }

        // Set validation errors
        setErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };
    return (
        <div style={{ marginBottom: "30px" }}>
            <h4 className='teacherList'>New Student Registration</h4>
            <form onSubmit={handleSubmit}>
                <div className='mainFormDiv'>
                    <div>
                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Student Name*</label>
                            <input type='text' className='inputboxClassname input-focused' placeholder='Student Name'
                                name='studentName' value={registrationData.studentName} onChange={handleChange} />
                        </div>
                        <span className="error-message">{errors.studentName && errors.studentName}</span>
                    </div>
                    <div>
                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Father Name*</label>
                            <input type='text' className='inputboxClassname' placeholder='Father Name'
                                name='fatherName' value={registrationData.fatherName} onChange={handleChange} />
                        </div>
                        <span className="error-message">{errors.fatherName && errors.fatherName}</span>
                    </div>
                    <div>
                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Mother Name*</label>
                            <input type='text' className='inputboxClassname' placeholder='Mother Name'
                                name='motherName' value={registrationData.motherName} onChange={handleChange} />

                        </div>
                        <span className="error-message">{errors.motherName && errors.motherName}</span>

                    </div>
                    <div>
                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Gender*</label>
                            <select
                                className="inputboxClassname"
                                name='gender'
                                value={registrationData.gender} onChange={handleChange}
                            >
                                <option>--- Gender ---</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <span className="error-message">{errors.gender && errors.gender}</span>

                    </div>
                    <div>
                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Admission forClass*</label>
                            <select
                                className="inputboxClassname"
                                name='classes'
                                value={registrationData.classes} onChange={handleChange}
                            >
                                <option>--- Admission for Class ---</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>11</option>
                            </select>
                        </div>
                        <span className="error-message">{errors.classes && errors.classes}</span>

                    </div>
                    <div>
                        <div className='mainLableDiv'>
                            <label className='lableClassName'>D.O.B*</label>
                            <input type='date' className='inputboxClassname'
                                name='dob' value={registrationData.dob} onChange={handleChange} />
                        </div>
                        <span className="error-message">{errors.dob && errors.dob}</span>
                    </div>
                    <div>

                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Aadhaar Number*</label>
                            <input type='number' className='inputboxClassname' placeholder='0000 0000 0000'
                                name='aaddhar' value={registrationData.aaddhar} onChange={handleChange} />
                        </div>
                        <span className="error-message">{errors.aaddhar && errors.aaddhar}</span>

                    </div>
                    <div>
                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Religion*</label>
                            <select
                                className="inputboxClassname"
                                name='religion'
                                value={registrationData.religion} onChange={handleChange}
                            >
                                <option>--- Select Religion ---</option>
                                <option>Hindu</option>
                                <option>Muslim</option>
                                <option>Christianity</option>
                                <option>Jew</option>
                            </select>
                        </div>
                        <span className="error-message">{errors.religion && errors.religion}</span>

                    </div>
                    <div>

                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Category*</label>
                            <select

                                className="inputboxClassname"
                                name='category'
                                value={registrationData.category} onChange={handleChange}
                            >
                                <option>--- Select Category ---</option>
                                <option>General</option>
                                <option>OBC</option>
                                <option>SC/ST</option>
                            </select>
                        </div>
                        <span className="error-message">{errors.category && errors.category}</span>

                    </div>
                    <div>
                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Parents Phone*</label>
                            <input type='text' className='inputboxClassname' placeholder='Parents Name'
                                name='parentsPnoneNo' value={registrationData.parentsPnoneNo} onChange={handleChange} />
                        </div>
                        <span className="error-message">{errors.parentsPnoneNo && errors.parentsPnoneNo}</span>

                    </div>
                    <div>

                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Alternate Number*</label>
                            <input type='text' className='inputboxClassname' placeholder='Parents Name'
                                name='alternatePhoneNo' value={registrationData.alternatePhoneNo} onChange={handleChange} />
                        </div>
                        <span className="error-message">{errors.alternatePhoneNo && errors.alternatePhoneNo}</span>

                    </div>
                    <div>

                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Email*</label>
                            <input type='email' className='inputboxClassname' placeholder='email id'
                                name='emailid' value={registrationData.emailid} onChange={handleChange} />
                        </div>
                        <span className="error-message">{errors.emailid && errors.emailid}</span>

                    </div>
                    <div>

                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Previous School Name*</label>
                            <input type='text' className='inputboxClassname' placeholder='School Name'
                                name='previousSchoolName' value={registrationData.previousSchoolName} onChange={handleChange} />
                        </div>
                        <span className="error-message">{errors.previousSchoolName && errors.previousSchoolName}</span>

                    </div>
                    <div>

                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Previous Class %*</label>
                            <input type='number' className='inputboxClassname' placeholder='000'
                                name='previousClassMarks' value={registrationData.previousClassMarks} onChange={handleChange} />
                        </div>
                        <span className="error-message">{errors.previousClassMarks && errors.previousClassMarks}</span>

                    </div>
                    <div>

                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Village*</label>
                            <input type='text' className='inputboxClassname' placeholder='Village'
                                name='village' value={registrationData.village} onChange={handleChange} />
                        </div>
                        <span className="error-message">{errors.village && errors.village}</span>

                    </div>
                    <div>

                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Post*</label>
                            <input type='text' className='inputboxClassname' placeholder='Post'
                                name='post' value={registrationData.post} onChange={handleChange} />
                        </div>
                        <span className="error-message">{errors.post && errors.post}</span>

                    </div>
                    <div>
                        <div className='mainLableDiv'>
                            <label className='lableClassName'>District*</label>
                            <input type='text' className='inputboxClassname' placeholder='Distric'
                                name='distric' value={registrationData.distric} onChange={handleChange} />
                        </div>
                        <span className="error-message">{errors.distric && errors.distric}</span>

                    </div>
                    <div>
                        <div className='mainLableDiv'>
                            <label className='lableClassName'>Pin Code*</label>
                            <input type='number' className='inputboxClassname' placeholder='Pin Code'
                                name='pincode' value={registrationData.pincode} onChange={handleChange} />
                        </div>
                        <span className="error-message">{errors.pincode && errors.pincode}</span>

                    </div>


                </div>
                <div>
                    <div style={{ marginTop: "10px", display: "flex", justifyContent: "right", marginRight: "5%" }}>
                        <button className='btn btn-primary f-right' type='submit'>Submit</button>
                    </div>
                </div>


            </form>
        </div>
    )
}

export default Registration
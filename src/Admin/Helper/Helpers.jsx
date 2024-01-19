import React, { useState, useEffect } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import { CgAdd } from "react-icons/cg";
import { FaList } from "react-icons/fa";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

const Helpers = () => {
    const BASEurl = "http://localhost:3000/helpers";
    const [errors, setErrors] = useState({});
    const [showInputBox, setShowInputBox] = useState(false);
    const [fetchHelper, setFetcHelper] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        position: '',
        joinDate: '',
        experience: '',
        qualification: '',
        mobileNumber: '',
        emails: '',
        meetingTime: '',
        address: '',
        account: '',
        ifsc: '',
        aadhaar: '',
        pinCode: '',
        data: Date(),
        
    });

    const fetchHelperAPI = async () => {
        await axios.get(BASEurl).then((res) => setFetcHelper(res.data)).catch((err) => { console.log(err) });
    }

    useEffect(() => {
        fetchHelperAPI();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });

    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = ['name', 'gender', 'account', 'ifsc', 'position', 'joinDate', 'aadhaar', 'experience', 'qualification', 'mobileNumber', 'meetingTime', 'address', 'pinCode'];
        requiredFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = `This field is required`;
            }
        });
        if (formData.aadhaar.length !== 12) {
            newErrors.aadhaar = 'Aadhaar number should be 12 digits';
        }
        if (formData.pinCode && formData.pinCode.length !== 6) {
            newErrors.pinCode = 'Pin Code should be 6 digits';
        }

        if (formData.gender === "--- Gender ---") {
            newErrors.gender = 'Please Select Gender';
        }
        if (formData.position === "--- Role ---") {
            newErrors.position = 'Please Select Role';
        }
        if (formData.experience === "--- Experince ---") {
            newErrors.experience = 'Please Select Experince';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(BASEurl, formData);
                if (response.status === 201) {
                    swal("Query", "Success", "Submitted");
                    setFormData({
                        name: '',
                        gender: '',
                        position: '',
                        joinDate: '',
                        experience: '',
                        qualification: '',
                        mobileNumber: '',
                        emails: '',
                        meetingTime: '',
                        address: '',
                        account: '',
                        ifsc: '',
                        aadhaar: '',
                        pinCode: '',
                    });
                    fetchHelperAPI();
                    setShowInputBox(false)
                }
            } catch (error) {
                if (error.response.status === 404) {
                    swal("Query", "Error", `${error.response.statusText}`);
                }
            }
        }
    };
    const handleDelete = (id) => {
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
                        fetchHelperAPI();
                    } else {
                        swal("Error", "Failed to delete data.", "error");
                    }
                }
            });

        } catch (error) {
            console.error('Error occurred:', error);
        }
    }



    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <h3 className='teacherList'>   {showInputBox ? " Add Member" : "Helper List"}</h3>
                <div>
                    {showInputBox ?
                        <button className='m-1 btn btn-primary' onClick={() => setShowInputBox(!showInputBox)}>
                            Show List
                            <FaList style={{ fontSize: "15px", marginLeft: "7px", color: "#fff" }} />
                        </button>
                        :
                        <button className='m-1 btn btn-primary' onClick={() => setShowInputBox(!showInputBox)}>
                            Add Member
                            <CgAdd style={{ fontSize: "25px", marginLeft: "7px", color: "#fff" }} />
                        </button>
                    }
                </div>
            </div>
            {
                showInputBox ?
                    <form onSubmit={handleSubmit}>
                        <div className='MainTeacherFormDiv'>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Name*</span>
                                    <input type='text' placeholder='Name' className='AdminTeacherInput' autoComplete='off'
                                        name='name' value={formData.teacherName} onChange={handleChange}
                                    />
                                </div>
                                <span className="error-message">{errors.name && errors.name}</span>
                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Aadhaar*</span>
                                    <input type='number' placeholder='0000 0000 0000' className='AdminTeacherInput' autoComplete='off'
                                        name='aadhaar' value={formData.aadhaar} onChange={handleChange}
                                    />
                                </div>
                                <span className="error-message">{errors.aadhaar && errors.aadhaar}</span>
                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Account Number*</span>
                                    <input type='number' placeholder='Account Number' className='AdminTeacherInput' autoComplete='off'
                                        name='account' value={formData.account} onChange={handleChange}
                                    />
                                </div>
                                <span className="error-message">{errors.account && errors.account}</span>
                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>IFSC Code*</span>
                                    <input type='text' placeholder='IFSC Code' className='AdminTeacherInput' autoComplete='off'
                                        name='ifsc' value={formData.ifsc} onChange={handleChange}
                                    />
                                </div>
                                <span className="error-message">{errors.ifsc && errors.ifsc}</span>
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
                                        name='position'
                                        value={formData.position} onChange={handleChange}

                                    >
                                        <option>--- Role ---</option>
                                        <option>Electrician</option>
                                        <option>Gardner</option>
                                        <option>Helper</option>
                                        <option>Security</option>
                                        <option>Women/Helper</option>
                                        <option>Cook</option>
                                    </select>
                                </div>
                                <span className="error-message">{errors.position && errors.position}</span>

                            </div>

                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Join Date*</span>
                                    <input type='date' placeholder='Join Date' className='AdminTeacherInput' autoComplete='off'
                                        name='joinDate' value={formData.joinDate} onChange={handleChange}
                                    />
                                </div>
                                <span className="error-message">{errors.joinDate && errors.joinDate}</span>
                            </div>

                            <div>

                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Experince Years*</span>
                                    <select
                                        required
                                        className="AdminTeacherInput"
                                        name='experience' value={formData.experience} onChange={handleChange}

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
                                    <span className='adminTeacherSpan'>Education*</span>
                                    <input type='text' placeholder='Qualification' className='AdminTeacherInput' autoComplete='off'
                                        name='qualification' value={formData.qualification} onChange={handleChange} />
                                </div>
                                <span className="error-message">{errors.qualification && errors.qualification}</span>

                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Mobile Number*</span>
                                    <input type='number' placeholder='Mobile Number' className='AdminTeacherInput' autoComplete='off'
                                        name='mobileNumber' value={formData.mobileNumber} onChange={handleChange} />

                                </div>
                                <span className="error-message">{errors.mobileNumber && errors.mobileNumber}</span>
                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>E-male</span>
                                    <input type='email' placeholder='E-male' className='AdminTeacherInput' autoComplete='off'
                                        name='emails' value={formData.emails} onChange={handleChange} />

                                </div>
                                <span className="error-message">{errors.emails && errors.emails}</span>
                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Meeting Time</span>
                                    <input type='time' placeholder='Meeting Time' className='AdminTeacherInput' autoComplete='off'
                                        name='meetingTime' value={formData.meetingTime} onChange={handleChange} />

                                </div>
                                <span className="error-message">{errors.meetingTime && errors.meetingTime}</span>
                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Address*</span>
                                    <input type='text' placeholder='Address' className='AdminTeacherInput' autoComplete='off'
                                        name='address' value={formData.address} onChange={handleChange} />

                                </div>
                                <span className="error-message">{errors.address && errors.address}</span>
                            </div>
                            <div>
                                <div className='teacherNamediv'>
                                    <span className='adminTeacherSpan'>Pin Code*</span>
                                    <input type='number' placeholder='Address' className='AdminTeacherInput' autoComplete='off'
                                        name='pinCode' value={formData.pinCode} onChange={handleChange} />
                                </div>
                                <span className="error-message">{errors.pinCode && errors.pinCode}</span>
                            </div>

                            <div style={{ width: "380px", flex: "end" }}>
                                <button className="mt-4 btn btn-primary" type="submit">Save</button>
                            </div>
                        </div>
                    </form>
                    :
                    <div>
                        <div className='adminTeacherList'>
                            {/*   this div of style  code comming from the teacher.css file */}
                            <div className="temp">
                                {
                                    fetchHelper.length !== 0 ? <>
                                        {
                                            fetchHelper.map((itms, index) => {
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
                                                                    <b>Name:-</b>{itms.name}
                                                                </div>

                                                                <div className="linebreak">
                                                                    <b>Work:- </b>{itms.position}
                                                                </div>
                                                                <div className="linebreak">
                                                                    <b>Experince:- </b>{itms.experience} Years
                                                                </div>
                                                                 <div className="linebreak">
                                                                    <b>Name:-</b>{itms.gender}
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
                                                                    <b>Account Number:- </b><span>{itms.account}</span>
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
                    </div>
            }
        </div>

    )
}
export default Helpers

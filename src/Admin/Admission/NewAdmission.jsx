import React, { useState, useEffect } from 'react';
import './newadmission.css';
import axios from 'axios';
import { CgAdd } from "react-icons/cg";
import { FaList } from "react-icons/fa";

const NewAdmission = () => {
    const BASEurl = 'http://localhost:3000/newRegistrationData';
    const toDay = new Date().toLocaleDateString()
    const [fetchregistration, setFetchregistration] = useState([]);
    const [viewDetailsState, setviewDetailsState] = useState([])
    const [fetchAdmission, setFetchAdmission] = useState([])
    const [hideDetails, setHideDetails] = useState(false);
    const [showforms, setShowforms] = useState(false)
    const [admission, setAdmission] = useState({
        selectedValue: '',
        admissionFee: '550',
        slipNumber: '',
        admissionDate: toDay,
        eductionFee: '',
        total: 2500
    });

    const admissionAPi = async () => {
        try {
            const response = await axios.get("http://localhost:3000/admission");
            setFetchAdmission(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        admissionAPi();
    }, []);

    const queryAPi = async () => {
        try {
            const response = await axios.get(BASEurl);
            setFetchregistration(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        queryAPi();
    }, []);
    //  view details
    const viewDetails = async (selectedValue) => {
        try {
            const response = await axios.get(`${BASEurl}/${selectedValue}`);
            setviewDetailsState(response.data);
            setHideDetails(true)
        } catch (err) {
            console.log(err);
        }
    };



    const handleChange = (e) => {
        setAdmission({ ...admission, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/admission", admission);
            if (response.status === 201) {
                setAdmission({
                    selectedValue: '',
                    admissionFee: '550',
                    slipNumber: '',
                    eductionFee: '',
                })
                admissionAPi();
                setShowforms(false)
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };
    // console.log()

    return (
        <div className='admissionMainDiv'>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <h3 className='teacherList'>   {showforms ? "New Student" : "Student List"}</h3>
                <div>
                    {showforms ?
                        <button className='m-1 btn btn-primary' onClick={() => setShowforms(!showforms)}>
                            Hide Form
                            <FaList style={{ fontSize: "15px", marginLeft: "7px", color: "#fff" }} />
                        </button>
                        :
                        <button className='m-1 btn btn-primary' onClick={() => setShowforms(!showforms)}>
                            New Admission
                            <CgAdd style={{ fontSize: "25px", marginLeft: "7px", color: "#fff" }} />
                        </button>
                    }
                </div>
            </div>
            {
                showforms ?
                    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
                        <div className='flexColumn'>
                            <div>
                                <div className='admissionselecter'>
                                    <span className='adminTeacherSpan'>Select Detail*</span>
                                    <select
                                        required
                                        className='admissionSelecterMain'
                                        name='selectedValue'
                                        onChange={handleChange}
                                        value={admission.selectedValue}
                                    >
                                        {fetchregistration.map((itms) => (
                                            <option key={itms.id} value={`${itms.id}`}>
                                                {itms.studentName} Aadhaar No. {itms.aaddhar}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className='admissionselecter'>
                                    <span className='adminTeacherSpan'>Admission Fee*</span>
                                    <input
                                        type='number'
                                        placeholder='Admission Fee'
                                        className='admissionSelecterMain'
                                        name='admissionFee'
                                        onChange={handleChange}
                                        value={admission.admissionFee}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className='admissionselecter'>
                                    <span className='adminTeacherSpan'>Education Fee*</span>
                                    <input
                                        type='number'
                                        placeholder='Education Fee'
                                        className='admissionSelecterMain'
                                        name='eductionFee'
                                        onChange={handleChange}
                                        value={admission.eductionFee}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className='admissionselecter'>
                                    <span className='adminTeacherSpan'>Slip Number*</span>
                                    <input
                                        type='text'
                                        placeholder='Amount'
                                        className='admissionSelecterMain'
                                        name='slipNumber'
                                        onChange={handleChange}
                                        value={admission.slipNumber}
                                    />
                                </div>
                            </div>

                        </div>
                        <button type='submit' className='btn btn-primary'>
                            Submit
                        </button>
                    </form>
                    : null
            }
            {
                hideDetails ?
                    <div className='viewDetails'>
                        <div className='m-2'>
                            <b>Student Name:- </b>
                            <span>{viewDetailsState.studentName}</span>
                        </div>
                        <div className='m-2'>
                            <b>Father Name:- </b>
                            <span>{viewDetailsState.fatherName}</span>
                        </div>
                        <div className='m-2'>
                            <b>Mother Name:- </b>
                            <span>{viewDetailsState.motherName}</span>
                        </div>
                        <div className='m-2'>
                            <b>Class:- </b>
                            <span>{viewDetailsState.classes}</span>
                        </div>
                        <div className='m-2'>
                            <b>village:- </b>
                            <span>{viewDetailsState.village}</span>
                        </div>
                        <div className='m-2'>
                            <b>Post:- </b>
                            <span>{viewDetailsState.post}</span>
                        </div>
                        <div className='m-2'>
                            <b>Pin Code:- </b>
                            <span>{viewDetailsState.pincode}</span>
                        </div>

                        <b style={{ textAlign: "center", cursor: "pointer", color: "red" }} onClick={() => setHideDetails(false)}>!OK</b>
                    </div>
                    : null
            }
            <div className='listOfAdmissionStudent'>

                {fetchAdmission.map((itms, index) => {
                    const { selectedValue } = itms
                    return (
                        <div >
                            <div className='admissionDiv'>
                                <div className='m-2'>
                                    <p style={{ color: "red" }}>{index + 1}.</p>
                                </div>
                                <div className='m-2'>
                                    <b>Registration Number:- </b>
                                    <span>{itms.selectedValue}</span>
                                </div>
                                <div className='m-2'>
                                    <b>Admission Fee:- </b>
                                    <span>{itms.admissionFee}</span>
                                </div>
                                <div className='m-2'>
                                    <b>Receipt Number:- </b>
                                    <span>{itms.slipNumber}</span>
                                </div>
                                <div className='m-2'>
                                    <b>Roll Number:- </b>
                                    <span>{itms.id}</span>
                                </div>

                                <div className='m-2'>
                                    <b>Admission Data:- </b>
                                    <span>{itms.admissionDate}</span>
                                </div>
                                <div className='m-2'>
                                    <b>Total Due Fee:- </b>
                                    <span style={{ color: "red", fontWeight: "500" }}>{itms.total - itms.eductionFee}</span>
                                </div>

                                <div style={{ marginLeft: "30px", }}>
                                    <b className='btn btn-primary ' onClick={() => viewDetails(selectedValue)}>View Detail</b>
                                </div>

                            </div>
                        </div>

                    )
                })
                }
            </div>


        </div>
    );
};

export default NewAdmission;

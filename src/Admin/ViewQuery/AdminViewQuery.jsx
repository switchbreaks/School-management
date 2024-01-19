import React, { useState, useEffect } from 'react';
import "./viewquery.css";
import axios from 'axios';
import swal from 'sweetalert';
import { MdDeleteForever } from "react-icons/md";

function AdminViewQuery() {
    const BASEurl = "http://localhost:3000/query"
    const [fetchallQuery, setFetchAllquery] = useState([]);
    const queryAPi = async () => {
        await axios.get(BASEurl).then((res) => setFetchAllquery(res.data)).catch((err) => { console.log(err) });
    }

    useEffect(() => {
        queryAPi();
    }, []);

    const reversedArray = [...fetchallQuery].reverse();//  this code help to reverce data which last come first


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
                        queryAPi();  // Fetch the updated data
                    } else {
                        swal("Error", "Failed to delete data.", "error");
                    }
                }
            });

        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    if (fetchallQuery.length === 0) {
        return <div style={{ width: "100%",height:"100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h1>No query found</h1>
        </div>
    }
    else {
        return (
            <div className='viewquery m-3'>
                <h3 className='text-primary'>Query List</h3>
                {
                    reversedArray.map((itms, index) => {
                        const { names, rollnumber, emailsiD, querysString, id, data } = itms
                        return (
                            <div>
                                <p>{index + 1}.</p>
                                <div className='query'>
                                    <div>
                                        <span>Name:- </span>
                                        <span>{names}</span>
                                    </div>

                                    <div>
                                        <span>Roll Number:- </span>
                                        <span>{rollnumber}</span>
                                    </div>
                                    <div>
                                        <span>Date:- </span>
                                        <span>{data}</span>
                                    </div>
                                    <div>

                                        <span>Email Id:- </span>
                                        <span>{emailsiD}</span>
                                    </div>
                                </div>
                                <div>
                                    <span>Issu:- </span>
                                    <span>{querysString}</span>
                                </div>
                                <span><MdDeleteForever color='red' style={{ fontSize: "large", cursor: "pointer" }} onClick={() => handleDelete(id)} /></span>
                                <hr className='hrlinecolor' />
                            </div>

                        )
                    })

                }

            </div>
        )
    }
}

export default AdminViewQuery
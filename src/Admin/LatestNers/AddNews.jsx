import React, { useState, useEffect } from 'react';
import "./latestNews.css";
import axios from 'axios';
import swal from 'sweetalert';
import { MdDeleteForever } from "react-icons/md";


function AddNews() {
    const BASEurl = "http://localhost:3000/news";
    const [fetchNewsPost, setFetchNewsPost] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        postContent: '',
        data: Date(),
    });
    //  fetching saved news data

    const fetchNews = async () => {
        await axios.get(BASEurl).then((res) => setFetchNewsPost(res.data)).catch((err) => { console.log(err) });
    }

    useEffect(() => {
        fetchNews();
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!formData.postContent.trim()) {
            newErrors.postContent = 'Post content is required';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(BASEurl, formData);
                if (response.status === 201) {
                    swal("Query", "Success", "Submitted");
                    fetchNews();  // Fetch the updated data
                    setFormData({
                        postContent: ''  // Reset form data
                    });
                }
            } catch (error) {
                if (error.response.status === 404) {
                    swal("Query", "Error", `${error.response.statusText}`);
                }
            }
        } else {
            console.log('Form validation failed');
        }
    };
    

    // delete news 
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
                        fetchNews();  // Fetch the updated data
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
        <div className='postNews m-3'>
            <h4 className='text-primary'>Add News</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <span>Write About Post</span>
                    <textarea
                        className={`addNewson ${errors.postContent ? 'is-invalid' : ''}`}
                        placeholder="Write query ..."
                        style={{ height: '200px' }}
                        autoComplete="off"
                        name="postContent"
                        value={formData.postContent}
                        onChange={handleChange}
                    />
                    {errors.postContent && <div className="invalid-feedback">{errors.postContent}</div>}
                </div>
                <button type="submit" className='btn btn-primary'>Post</button>
            </form>
            <div style={{ marginTop: "30px",marginBottom:"55px" }}>
                <h4 className='text-primary'>Your Post</h4>
                {
                    fetchNewsPost.map((itms, index) => {
                        const { id, postContent } = itms;
                        return (
                            <div className='newsAndDeletbtn' key={index}>
                                <p>{index + 1} :- </p>
                                <p className='mainNewsContent'>&nbsp; &nbsp; {postContent}</p>
                                <MdDeleteForever color='red' style={{ cursor: "pointer" }} onClick={() => handleDelete(id)} />
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default AddNews;
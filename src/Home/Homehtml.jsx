import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';
import './homepage.css';
const Homehtml = (prose) => {

    const [featchNews, setFetchNews] = useState([])
    const [userQueryes, setuserQueries] = useState({
        names: '',
        rollnumber: '',
        emailsiD: '',
        querysString: '',
        data: Date(),
    })

    const newsApis = async () => {
        await axios.get("http://localhost:3000/news").then((res) => setFetchNews(res.data)).catch((err) => { console.log(err) });
    }

    useEffect(() => {
        newsApis();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuserQueries({ ...userQueryes, [name]: value });
    };
    const submituser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/query', userQueryes);
            console.log('Response:', response);
            if (response.status === 201) {
                swal("Query", "Success", "Submitted");
                setuserQueries({
                    names: '',
                    rollnumber: '',
                    emailsiD: '',
                    querysString: '',

                })
            }
        } catch (error) {
            if (error.response.status === 404) {
                swal("Query", "Error", `${error.response.statusText}`);
            }
        }
    }
    return (
        <>
            <header className="home_page">
                <div className="top_class">
                    <span style={{ backgroundColor: "red", color: "#fff", padding: "0 8px 0 8px" }}>News*</span>
                    <marquee className="marquee_class">
                        {featchNews.map((itms, index) => (
                            <span className="news">&#127775;&#127775;{itms.postContent}&#127775;&#127775;</span>
                        ))}
                    </marquee>
                </div>
                <div className="img_animation">
                    {/* this is space for the animated img */}
                </div>
                <div className="top_class">
                    <marquee className="marquee_class">
                        <span className="news bottom">&#8902;&#8902;&#8902;{prose.student_news}&#8902;&#8902;&#8902;</span>
                    </marquee>
                </div>
            </header>
            <hr />
            <section>
                <div className="about_college">
                    <article className="all_artical">
                        <p className="about_home_p">
                            You will be very happy and happy to know that in your nearest area which comes under
                            Awadh region, from where you can get supernatural feeling of getting your children
                            graduate from commerce, arts and science faculties through skilled and trained and
                            experienced principals. make your life worthwhile
                            Excellencies, you know that education is a unique means of building the present and future. In a rural country like
                            India, no special attention has been paid to the education of the rural population. There is a long tradition of
                            voluntary efforts in our country. Jata Shankar Shukla Prabandhak ji laid the foundation of wonderful stay in the rural
                            area of ​​Chhapia development block and holy village Guru village located in the eastern part of Gonda district in the
                            form of a school, in which keeping in mind the all round development of your children, proper curriculum was prepared.
                            has been arranged
                        </p>
                    </article>
                    <div className="img_principal">
                        <img src="principal_sir.jpg"
                            alt="principal_sir img not found"
                            className="principal_sir_img"
                            title="Principal Teacher"

                        />
                    </div>
                </div>
            </section>
            <div className="map_feedbacl">
                <div className="current_location">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14225.110811996128!2d82.42110165!3d26.958103799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3990b326e6376d6d%3A0x8d15d11c2d89a476!2sSharvan%20Dham%20Inter%20College!5e0!3m2!1sen!2sin!4v1651341026845!5m2!1sen!2sin" title="Google Map location" alt="GPS problem" />
                </div>
                <form onSubmit={submituser}>
                    <h1 className="h1">Query</h1>
                    <label>Name</label>
                    <input type="text"
                        className="homeInputes"
                        placeholder="Your name.." required autoComplete="off"
                        name="names" value={userQueryes.names} onChange={handleChange}
                    />
                    <label >Roll Number</label>
                    <input type="Number"
                        className="homeInputes"
                        placeholder="Enter Your Roll Number" required autoComplete="off"
                        name="rollnumber" value={userQueryes.rollnumber} onChange={handleChange}
                    />
                    <label>Email</label>
                    <input type="email"
                        className="homeInputes"
                        placeholder="Enter Your email" required autoComplete="off"
                        name="emailsiD" value={userQueryes.emailsiD} onChange={handleChange}
                    />
                    <label>Query</label>
                    <textarea
                        className="homeInputes"
                        placeholder="Write query ..." style={{ height: '200px' }} required autoComplete="off"
                        name="querysString" value={userQueryes.querysString} onChange={handleChange}
                    />
                    <label>
                        <div className="check">
                            <input type='checkbox' required /><span>
                                Your email will be saved to inform you  that your problems have solved</span>

                        </div>
                    </label>
                    <label>
                        <input type="submit" className="home_page_logi" />
                        <input type="reset" value="Reset" className="home_page_logi" />
                    </label>
                </form>
            </div>
        </>
    );
}
export default Homehtml;
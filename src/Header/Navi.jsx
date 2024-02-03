import React from "react";
import { Link } from "react-router-dom";
import "./navig.css";
import { useNavigate } from "react-router-dom";
const dropdownMenu = () => {
    let x = document.getElementById("dropdownClick");
    if (x.className === "ulli_class") {
        x.className += " responsive";
    } else {
        x.className = "ulli_class";
    }
};
function Navi() {
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;
    const handleLogout = () => {
        localStorage.removeItem('token');
    };

    return (
        <>
            <nav>
                <div className="main_navi">
                    <ul className="ulli_class" id="dropdownClick">

                        {/* Conditionally show/hide links based on authentication */}
                        {isLoggedIn ? (
                            <>
                                <li><Link to="/AddNews">Notice</Link></li>
                                <li><Link to="/AdminViewQuery">Query</Link></li>
                                <li><Link to="/AddTopper">Topper </Link></li>
                                <li><Link to="/TeacherList">Teacher</Link></li>
                                <li><Link to="/Helpers">Helpers</Link></li>
                                <li><Link to="/NewAdmission">Admission </Link></li>
                                <li className="right" onClick={handleLogout}><Link to="/NewAdmission">logout</Link></li>

                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home </Link></li>
                                <li><Link to="/teacher"> Teacher </Link></li>
                                <li><Link to="/StudentList"> Student</Link></li>
                                <li><Link to="/Classprop"> syllabus</Link></li>
                                <li><Link to="/Photo"> Photo's</Link></li>
                                <li className="right" ><Link to="/Login"> Login </Link></li>
                                <li className="right" ><Link to="/Registration"> Registration </Link></li>
                            </>
                        )}
                        <li className="dropdownIcon"><Link to="" onClick={dropdownMenu}> &#9776;</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navi;

import React from "react";
import { Route, Routes, } from "react-router-dom";
import Navi from "./Header/Navi";
import Homeprose from "./Home/Homeprose";
import About from "./Aboute/About";
import Teacher from "./Teacher/Teacher";
import StudentList from "./Student/StudentList";
import Classprop from "./Syllabus/Classprop"
import Photo from './Photo/Photo';
import Registration from "./Reg/Registration";
import Login from "./Admin/Login/Login";
import NotFound from "./Default/NotFound";
import Footer from "./Footer/Footer";
import Currenttime from './Currenttime';
import Fourthclass from "./Workar/Fourthclass";
import Forgotpassword from "./Workar/Fourthclasslist";
import TeacherList from "./Admin/Teachers/TeacherList";
import AddTopper from "./Admin/AddTopperStudent/AddTopper";
import Helpers from "./Admin/Helper/Helpers";
import AddNews from "./Admin/LatestNers/AddNews";
import AdminViewQuery from "./Admin/ViewQuery/AdminViewQuery";
import NewAdmission from "./Admin/Admission/NewAdmission";
import Aboutes from "./Admin/Aboutes/Aboutes";
const App = () => {
    const token = localStorage.getItem('token');
    return (
        <>
            <Navi />
            {token === null ?
                <Routes>
                    <Route path="/" element={<Homeprose />} />
                    <Route path="/StudentList" element={<StudentList />} />
                    <Route path="/Teacher" element={<Teacher />} />
                    <Route path="/Classprop" element={<Classprop />} />
                    <Route path="/Photo" element={<Photo />} />
                    <Route path="/Currenttime" element={<Currenttime />} />
                    <Route path="/Registration" element={<Registration />} />
                    <Route path="/Fourthclass" element={<Fourthclass />} />

                    <Route path="/Login" element={<Login />}>
                        <Route path="Login/Forgotpassword" element={<Forgotpassword />} />
                    </Route>
                    <Route path="*" element={<Homeprose />} />
                </Routes>
                : <Routes>
                    <Route path="/AddTopper" element={<AddTopper />} />
                    <Route path="/TeacherList" element={<TeacherList />} />
                    <Route path="/Helpers" element={<Helpers />} />
                    <Route path="/AddNews" element={<AddNews />} />
                    <Route path="/AdminViewQuery" element={<AdminViewQuery />} />
                    <Route path="/NewAdmission" element={<NewAdmission />} />
                </Routes>
            }
            <Footer />
        </>
    );
};
export default App;
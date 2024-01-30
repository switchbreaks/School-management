import React from "react";
import "./footer.css"
import { Link } from 'react-router-dom';
function Footer() {
	const token = localStorage.getItem('token');

	const contact = () => {
		window.confirm('Mobile Number is +91 123456789')
	}
	const deve = () => {
		window.confirm("contact:- utkarsh.9167@gmail.com")
	}

	return (
		<>
			<footer style={{ bottom: "0px" }}>
				<div className="footy">
					<div className="rowss">
						{
							token ?

								<div className="flex_wala">
									<div className="col-3 mobilestack">
										<h2>Menu</h2>
										<ul>
											<li ><Link to="/AddNews">Add News </Link></li>
											<li><Link to="/AdminViewQuery">Query </Link> </li>
											<li className="AddTopper">Topper</li>
										</ul>
									</div>
									<div className="col-3 mobilestack">
										<h2>Media</h2>
										<ul>
											<li> Instagram </li>
											<li className="nonmobile">facebook</li>
											<li onClick={contact}>content</li>
										</ul>
									</div>
									<div className="col-3 mobilestack">
										<h2>Pages</h2>
										<ul>
											<li className="nonmobile"><Link to="/TeacherList"> Teacher </Link></li>
											<li><Link to="/Helpers">Helpers</Link></li>
											<li><Link to="/NewAdmission">Admission</Link></li>
										</ul>
									</div>
									<div className="col-3 mobilestack">
										<h1>Developed By</h1>
										<ul onClick={deve}>
											<li>Utkarsh&nbsp;Mishra</li>
											<li>BSc III</li>
											<li></li>
										</ul>
									</div>
								</div> : <div className="flex_wala">
									<div className="col-3 mobilestack">
										<h1>Study</h1>
										<ul>
											<li ><Link to="/"> Home </Link></li>
											<li><Link to="/About">About </Link> </li>
											<li className="nonmobile">More</li>
										</ul>
									</div>
									<div className="col-3 mobilestack">
										<h2>Study</h2>
										<ul>
											<li><Link to="/Photo"> Photo</Link> </li>
											<li className="nonmobile">facebook</li>
											<li onClick={contact}>content</li>
										</ul>
									</div>
									<div className="col-3 mobilestack">
										<h1>Study</h1>
										<ul>
											<li className="nonmobile"><Link to="/teacher"> Teacher </Link></li>
											<li><Link to="/Fourthclass">Helpers</Link></li>
											<li><Link to="/Login">Fee</Link></li>
										</ul>
									</div>
									<div className="col-3 mobilestack">
										<h1>Developed By</h1>
										<ul onClick={deve}>
											<li>Adarsh&nbsp;Mishra</li>
											<li>BCA</li>
											<li></li>
										</ul>
									</div>
								</div>
						}
						<h6 className="myname">&#169;2023 Developed By:-  Utkarsh Mishra</h6>
					</div>
				</div>

			</footer>

		</>
	);
}
export default Footer;

import React from "react";
import Abouthtml from './Abouthtml';
import './about.css'
    const About=()=>{
        return(
            <>
                    <Abouthtml 
                        name_of_peop='Shravan Dham'
                        matter='Shravan Dham Inter College was formed in the year 2012 which was named after Shravan Maharaj. 
                        It is believed that King Dasaratha performed the Prana Shanti Puja of Shravan Kumar here.'
                        aboutImg='color_logo.jpg'
                        imgFound='img not found'
                        title="Shravan Maharaj"
                    />
                    <Abouthtml 
                        name_of_peop='Principle List'
                        matter='In the early days of the school, the principal was Shri Ayodhya Prasad Tiwari ji.
                         Who directed very skillfully. Keeping in mind the age, he took retirement, he contributed as a teacher of Sanskrit geography and economics for about 35 years. At present, the Principal is Shri Sunil Pandey ji, 
                        who has 15 years of experience in Biology, and is working in his position with great efficiency.'
                        aboutImg='principal_sir.jpg'
                        imgFound='img not found'
                        title="Principle"
                    />
                    <Abouthtml 
                        name_of_peop='Scouts Guides'
                        matter='Every year on 27th February the Scod Guide program is organized in Shravan Dham Inter College. In this program, 3 days training is given to all the students, how the country and society are 
                        helped in difficult times. in which is taught to cook without utensils and to give first aid'
                        aboutImg='skote.jpeg'
                        imgFound='img not found'
                        title="Principle"
                    />
            </>
        );
    }
export default About;
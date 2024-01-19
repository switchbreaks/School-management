import React from "react";

    const Abouthtml=(prop)=>{
        return(
            <>
                <div className="about_main_class">
                <h1 className="name1">{prop.name_of_peop}<hr className="under_name"/></h1>
                    <div className="chil_main_class">
                        <article className="about_artical">
                            <p className="about_artical_p">
                            {prop.matter}
                            </p>
                        </article>
                        <img src={prop.aboutImg}
                             alt={prop.imgFound}
                             className="img_css_about"
                             title={prop.title}
                             />
                    </div>
                </div>
                
            </>
        );
}
export default Abouthtml;
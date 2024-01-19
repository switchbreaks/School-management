import React from "react";
import './photoimg.css'
import photolinks from "./Photolinks.js"
function Photo() {
    return (
        <>
            <div className="photo_main_class">
                <div className="photo_child_class">
                    {
                        photolinks.map((itms) => {
                            return (
                                <img src={itms.thisphoto}
                                    alt={itms.altn}
                                    className="img_class"
                                    title={itms.title}
                                />
                            )
                        })
                    
                    }
                </div>
            </div>
        </>
    );
}
export default Photo;
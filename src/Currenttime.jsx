import React, { useState } from "react";
const datetime={
    fontSize: '20px',
    backgroundColor: 'darkmagenta',
    color :'#eee',
    marginRight :'10px',
    borderRadius :'5px',
    marginTop: '45.5%',
    float: 'right',
    padding: '5px',
    position: 'relativ',
};

const Currenttime=()=>{
    let time= new Date().toLocaleTimeString();
    const[ctime, newtome]= useState(time);

    const Updatedtime=()=>{
        time= new Date().toLocaleTimeString();
        newtome(time);
    }
    setInterval(Updatedtime,1000)
    
    return(
        <>
            <h1 style={datetime}>{ctime}</h1>
        </>
    );
}
export default Currenttime;
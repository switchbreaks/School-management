import React from "react";
const notfound = {
    color: '#ff5300',
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    fontSize: '40px',
    backgroundColor: '#E7D7D7',
    marginTop: '20px',
    height: '200px',
    minWidth: '367px'
    // this is internal css in react Js
}
const font = {
    marginTop: '60px',
    fontSize: '30px',
    color: 'red'
}
const NotFound = () => {
    return (
        <>
            <div style={notfound}>
                <h1>Error!</h1>
                <h4 style={font}> Page Not Found :-(</h4>
            </div><br />
        </>
    );
};
export default NotFound;
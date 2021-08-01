import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ( props ) => {
    const { courseName, courseCode, image } = props.course;
    return (

            <div className="card m-3 p-2" style={{width: "18rem"}}>
                <img className="card-img-top" src={`data:image/png;base64,${image.img}`} alt={courseCode}/>
                <div className="card-body">
                    <h5 className="card-title text-primary m-2 p-2 text-center">{courseName}</h5>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    {/* <Link className='btn btn-primary mx-auto' style={{margin:"auto"}} to="/">Go somewhere</Link> */}
                    {
                        props.manageStudents?
                        <Link onClick={()=>props.manageStudents(courseCode)} className='btn btn-primary mx-auto' style={{margin:"auto"}} to="/dashboard">Manage Students</Link>
                        :
                        <></>
                    }
                </div>
            </div>
            
    );
};

export default CourseCard;
import { UserContext } from 'App';
import CourseCard from 'components/Dashboard/Utilities/CourseCard/CourseCard';
import React, { useContext, useState } from 'react';

const MarkSheet = () => {
    // @ts-ignore
    const { loggedInUserData } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = loggedInUserData;
    const [showCards, setShowCards] = useState(true);
    const [courseCode, setCourseCode] = useState('demoCourse');
    const markSheet = ( courseCode ) => {
        setShowCards(false);
        setCourseCode(courseCode)
        console.log(courseCode);
    };
    const handleBack =()=>{
        setShowCards(true);
        setCourseCode('demoCourse')
    }
    return (
        <div>
            {
            showCards ? (
                <div className="cards row">
                    {
                    // @ts-ignore
                    loggedInUser.courses?.map((course) => (
                    <CourseCard markSheet={markSheet}  className='col-md-4' course={course} key={course.courseCode}></CourseCard>
                    ))
                    }
                </div>
                ) : (
                    <div>
                        <p onClick={handleBack } className='text-danger bg-warning m-2 p-2 rounded' style={{width:'80px', cursor: 'pointer'}}><b>&larr;</b> BACK</p><br /><br />
                        <h2>Details Page</h2>
                    </div>
                )
            }
        </div>
    );
};

export default MarkSheet;
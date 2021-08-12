import { UserContext } from 'App';
import CourseCard from 'components/Dashboard/Utilities/CourseCard/CourseCard';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';

const MarkSheet = () => {
    // @ts-ignore
    const { loggedInUserData } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = loggedInUserData;
    const [showCards, setShowCards] = useState(true);
    const [courseCode, setCourseCode] = useState('demoCourse');
    const [ results, setResults] = useState([])

    const markSheet = ( courseCode ) => {
        setShowCards(false);
        setCourseCode(courseCode)
        console.log(courseCode);
    };
    
    const handleBack =()=>{
        setShowCards(true);
        setCourseCode('demoCourse')
    }

    useEffect(()=>{
        const email = sessionStorage.getItem('email')
        console.log(courseCode,email)
        const formData = new FormData();
        // getResults
        formData.append("email", email);
        formData.append("courseCode", courseCode);
                fetch("http://localhost:4000/getOnesResults", {
                  method: "POST",
                  body: formData,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data,'fetched');
                    if(data){
                        setResults(data)
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
    },[courseCode])

    return (
        <div>
            {
            showCards ? (
                <div className="cards row">
                    {
                    // @ts-ignore
                    loggedInUser.courses?.map((course) => (
                    <CourseCard markSheet={markSheet}  className='col-md-4' showWaitingButton={false} 
                     course={course} key={course.courseCode}></CourseCard>
                    ))
                    }
                </div>
                ) : (
                    <div>
                        <p onClick={handleBack } className='text-danger bg-warning m-2 p-2 rounded' style={{width:'80px', cursor: 'pointer'}}><b>&larr;</b> BACK</p><br /><br />
                        <table className="table rounded p-5 bg-primary">
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">marks</th>
                            <th scope="col">Exam Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            results?.map((result, index) =><tr key={index}>
                            <th className='bg-success text-white' scope="row">{index+1}</th>
                            <td className='bg-success text-white'>{result.marks}</td>
                            <td className='bg-success text-white'>{result.examName}</td>
                            </tr>)
                        }
                        </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    );
};

export default MarkSheet;
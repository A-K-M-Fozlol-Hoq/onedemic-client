import { UserContext } from 'App';
import CourseCard from 'components/Dashboard/Utilities/CourseCard/CourseCard';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShowStudentsPaper from './ShowStudentsPaper';

const ViewAllResult = () => {
    // @ts-ignore
    const { loggedInUserData } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = loggedInUserData;
    const [showCards, setShowCards] = useState(true);
    const [showTable, setShowTable]= useState(true);
    const [courseCode, setCourseCode] = useState('demoCourse');
    const [ results, setResults] = useState([])
    const [ pdfCode, setPDFCode] =useState('')

    const viewAllResults = ( courseCode ) => {
        setShowCards(false);
        setCourseCode(courseCode)
    };

    const handleBack =()=>{
        setShowCards(true);
        setCourseCode('demoCourse')
    }

    const handleClick =(pdfCode)=>{
        setShowTable(false)
        setPDFCode(pdfCode);
    }

    const handleBackToTable =()=>{
        setShowCards(false);
        setShowTable(true)
    }

    useEffect(()=>{
        const formData = new FormData();
        formData.append("courseCode", courseCode);
                fetch("http://localhost:4000/getResults", {
                  method: "POST",
                  body: formData,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if(data){
                        setResults(data)
                    }
                    else{
                        setResults([])
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
                    <CourseCard viewAllResults={viewAllResults} className='col-md-4' showWaitingButton={false} 
                     course={course} key={course.courseCode}></CourseCard>
                    ))
                    }
                </div>
                ) : (
                    <div>
                        {
                        showTable?
                        <div>
                        <p onClick={handleBack } className='text-danger bg-warning m-2 p-2 rounded' style={{width:'80px', cursor: 'pointer'}}><b>&larr;</b> BACK</p><br /><br />
                        <table className="table rounded p-5 bg-primary">
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Student Email</th>
                            <th scope="col">marks</th>
                            <th scope="col">Exam Name</th>
                            <th scope="col">View Answer Script</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            results?.map((result, index) =><tr key={index}>
                            <th className='bg-success text-white' scope="row">{index+1}</th>
                            <td className='bg-success text-white'>{result.email}</td>
                            <td className='bg-success text-white'>{result.marks}</td>
                            <td className='bg-success text-white'>{result.examName}</td>
                            <td className='bg-warning text-center text-white'><Link to='/dashboard' style={{textDecoration: 'none'}}
                            onClick={()=>handleClick(result.pdfCode)} 
                            >{result.marks ==='pending' &&  <>Answer Script</>}</Link></td>
                            </tr>)
                        }
                        </tbody>
                        </table>
                    </div>
                    :
                    <div>
                        <p onClick={handleBackToTable } className='text-danger bg-warning m-2 p-2 rounded'
                         style={{width:'160px', cursor: 'pointer'}}><b>&larr;</b> BACK TO TABLE</p><br /><br />
                        <
// @ts-ignore
                        ShowStudentsPaper pdfCode={pdfCode} ></ShowStudentsPaper>
                    </div>
                        }
                    </div>
                )
            }
        </div>
    );
};

export default ViewAllResult;
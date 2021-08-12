import { UserContext } from 'App';
import CourseCard from 'components/Dashboard/Utilities/CourseCard/CourseCard';
import ShowPDFQuestion from 'components/Dashboard/StudentDashboard/UpcomingExam/ShowPDFQuestion/ShowPDFQuestion';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import ShowMCQQuestion from '../ShowMCQQuestion/ShowMCQQuestion';

const UpcomingExam = () => {
    // @ts-ignore
    const { loggedInUserData } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = loggedInUserData;
    const [showCards, setShowCards] = useState(true);
    const [courseCode, setCourseCode] = useState('demoCourse');
    const [ quiz, setQuiz ]= useState({});
    let [exams, setExams]=useState([])
    const [filteredExams, setFilteredExams] = useState([]);
    const [loadingExam, setLoadingExam] = useState(false);

    useEffect(()=>{
        let courses =[]
        console.log(loggedInUser)
        loggedInUser.courses.map((course)=>{
            // console.log(course)
            courses.push(course)
        })
        console.log(courses)
        setLoadingExam(true)
        if(loggedInUser.courses.length === 0){
          setLoadingExam(false);
        }

        const formData = new FormData();
          formData.append("courses", JSON.stringify(courses));

          fetch("http://localhost:4000/getExamCollection", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              setLoadingExam(false);
              exams=[]
              // console.log(data);
              if(data.length > 0){
                data.map((course) => {
                  course.map((exam)=>{
                    // setExams([...exams,exam] )
                    // console.log(exam)
                    exams.push(exam)
                  })
                })
                
              }
              filterQuestion()
            })
            .catch((error) => {
              console.error(error);
            });
    },[])

    const filterQuestion =()=>{
      let temp=[];
      for(var i=0; i<exams.length; i++){
          exams[i].course =JSON.parse(exams[i].course)
        }
      for(i=0; i<exams.length; i++){
        var today = new Date();
        var miliSeconds = today.getTime();
        if((miliSeconds<exams[i].endTime) && (`${new Date()}`.slice(0, 10) === exams[i].date.slice(0, 10))){
          if(miliSeconds<exams[i].startTime){
            temp.push({...exams[i],index: i, start:false})
          }
          else{
            temp.push({...exams[i],index: i,start:true})
          }
        }
        }
        setFilteredExams(temp)
    }
    const startExam = ( index ) => {
      console.log(showCards)     
      setShowCards(false);
      for(let i=0; i<filteredExams.length; i++){
        if(index === filteredExams[i].index){
          setQuiz(filteredExams[i]);
        }
      }
      console.log(quiz);
    };
    const handleBack =()=>{
      setShowCards(true);
      setCourseCode('demoCourse')
    }
    return (
        <div>
          {
              showCards ? 
              <div>
                {
                loadingExam ? 
                  <div className="bg-blue m-5 p-5 rounded text-center m-auto text-white">
                    <p>Loading...</p>
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <br />
                  </div>:
                  <div>
                    {
                      filteredExams.length >0 ?
                      <div className="cards row">
                        {
                          // @ts-ignore
                          filteredExams?.map((exam) => (
                          <CourseCard startExam={startExam} index={exam.index} showWaitingButton={!(exam.start)} 
                          className='col-md-4' course={exam.course} key={exam.index}></CourseCard>
                          ))
                        }
                      </div>
                      :
                      <div>
                        {
                          !loadingExam?
                          <p className='bg-blue m-5 p-5 rounded text-center m-auto text-white'>
                            You don't have any exam today!</p>:<></>
                        }
                      </div>
                    }
                  </div>
                }
              </div>
              :
              <div>
                <p onClick={handleBack } className='text-danger bg-warning m-2 p-2 rounded'
                 style={{width:'80px', cursor: 'pointer'}}><b>&larr;</b> BACK</p><br /><br />
                {
                  // @ts-ignore
                  quiz.examType ==='written' ?
                  <ShowPDFQuestion examName={quiz
// @ts-ignore
                  .examName} quiz={quiz}></ShowPDFQuestion>
                  :
                  <></>
                }
                {
                  // @ts-ignore
                  quiz.examType ==='mcq' ?
                  <ShowMCQQuestion examName={quiz
// @ts-ignore
                  .examName} quiz={quiz}></ShowMCQQuestion>
                  :
                  <></>
                }
              </div>
          }

        </div>
    
    );
};

export default UpcomingExam;
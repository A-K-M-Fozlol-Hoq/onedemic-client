import "date-fns";
import { UserContext } from "App";
import React, { useContext, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./CreateExam.css";
import CourseCard from "components/Dashboard/Utilities/CourseCard/CourseCard";
import ExamInfo from './ExamInfo';

const CreateExam = () => {
  // @ts-ignore
  const { loggedInUserData } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = loggedInUserData;

  const [courseCode, setCourseCode] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

    // Here is all the time credentials
  // const dateAndTime = {selectedDate, startTime, endTime};

    //Decide what to show
  const [showCourses, setShowCourses] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showExamCreator, setShowExamCreator] = useState(false);

  const [method, setMethod] = useState("Select Exam Type");
  const [disabled, setDisabled] = useState(false);
  const [confirmButton, setConfirmButton] = useState(true);
  const [ examName, setExamName ]= useState('');
  let [ course, setCourse ]= useState({});
  let [ mcqExamData, setMCQExamData ]= useState({course:{}, date:'', startTime:'', examName:'', endTime:'', examType:'mcq'});
  let [ writtenExamData, setWrttenExamData ]= useState({course:{}, date:'', startTime:'', examName:'', endTime:'', examType:'written'});
  const [ error, setError] = useState('')

  let [ mcqQuestion, setMCQQuestion] = useState([])
  let [ writtenQuestion, setWrittenQuestion] = useState(null)

  //   console.log(loggedInUser.courses);
  // console.log(courseData);

  const [quizes, setQuizes] = useState([
    {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
      marks: "1",
    },
  ]); //This is going to be used for setting each quiz

  const handleChangeInput = (index, event) => {
    const values = [...quizes];
    values[index][event.target.name] = event.target.value;
    setQuizes(values);
    setConfirmButton(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let haveError=false;
    for (let i = 0; i < quizes.length; i++) {
      console.log(quizes[i]);
      if(!quizes[i].question || !quizes[i].option1 || !quizes[i].option2 || !quizes[i].option3 || !quizes[i].option4 ){
        setError(`Please enter question and all options properly at ${i+1} (st/nd/th) question`);
        haveError=true;
      }
      else{
        if(!quizes[i].correctAnswer ||
          (quizes[i].option1 !== quizes[i].correctAnswer &&
          quizes[i].option2 !== quizes[i].correctAnswer &&
          quizes[i].option3 !== quizes[i].correctAnswer &&
          quizes[i].option4 !== quizes[i].correctAnswer)){
            setError(`Please Enter Correct answer carefully at ${i+1} (st/nd/th) question `);
            haveError=true;
        }
      }
    }
    if(!haveError){
      setConfirmButton(false);
      setMCQQuestion(quizes)
      // console.log(mcqExamData)
      // const newExamData = { ...mcqExamData }
      // newExamData.questions = quizes;
      // setMCQExamData(newExamData);
      // mcqExamData=newExamData;
      // console.log(mcqExamData)
    }
    else{
      alert(error)
    }
  };
  const handleAddQuiz = () => {
    setQuizes([
      ...quizes,
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: "",
        marks: "",
      },
    ]);
  };

  const handleRemoveQuiz = (index) => {
    quizes.filter((quiz)=>quiz.index !== index);
  };

  const handleConfirmQuiz = () => {
    if(mcqQuestion.length>1){
      console.log("Quiz Confirmed");
      setConfirmButton(true)
      console.log(mcqExamData);
      console.log(  mcqQuestion);
      // courseCode, date, startTime, examName, endTime, examType, questions
      const formData = new FormData();
      // formData.append("file", answerScript);
      formData.append("course", JSON.stringify(mcqExamData.course));
      formData.append("date", mcqExamData.date);
      formData.append("startTime", mcqExamData.startTime);
      formData.append("endTime", mcqExamData.endTime);
      formData.append("examName", mcqExamData.examName);
      formData.append("examType", mcqExamData.examType);
      formData.append("questions",JSON.stringify(mcqQuestion) );

      fetch("https://protected-reef-78007.herokuapp.com/createMCQExam", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert('Exam created successfully');
        })
        .catch((error) => {
          console.error(error);
        });
      }
      else{
        alert('You have to enter at least two mcq')
      }
    
  };
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   console.log(date);
  //   // console.log(quizes[0].date);
  // };
  const handleSelectExamDateButton = (courseCode,courseName,image) => {
    setCourseCode(courseCode);
    const newCourse = { ...course }
    // @ts-ignore
    newCourse.courseName = courseName;
    // @ts-ignore
    newCourse.courseCode = courseCode;
    // @ts-ignore
    newCourse.image = image;
    setCourse(newCourse);
    // course = { ...newCourse }
    console.log(courseCode,courseName,image,'--0,', course,'--2',newCourse);

    setShowCourses(false);
    setShowCalendar(true);
  };
  const handleBackToCoursesButton = () => {
    setCourseCode("");
    setShowCourses(true);
    setShowCalendar(false);
    setShowExamCreator(false);
  };
  const handleCreateExamButton = () =>{
    const newExamData = { ...mcqExamData }
    newExamData.date = selectedDate;
    newExamData.startTime = startTime;
    newExamData.endTime = endTime;
    newExamData.examName = examName;
    // @ts-ignore
    newExamData.course = course;    
    // mcqExamData={...newExamData}
    setMCQExamData(newExamData);
    // @ts-ignore
    const newWrittenExamData = { ...writtenExamData }
    newWrittenExamData.date = selectedDate;
    newWrittenExamData.startTime = startTime;
    newWrittenExamData.endTime = endTime;
    newWrittenExamData.examName = examName;
    // @ts-ignore
    newWrittenExamData.course = course;      
    // writtenExamData = { ...newExamData}
    // @ts-ignore
    setWrttenExamData(newWrittenExamData);
    setShowCalendar(false);
    setShowExamCreator(true);
  }

  const handleBackToCalendarButton = () => {
    setShowCourses(false);
    setShowExamCreator(false);
    setShowCalendar(true);
  };

  const handlePDFUpload = (e) =>{
    e.preventDefault();
      const newFile = e.target.files[0];
      if(newFile.type === 'application/pdf'){
        setWrittenQuestion(newFile)
        // console.log('204')
        // const newExamData = { ...writtenExamData }
        // newExamData.question = newFile;  
        // writtenExamData = { ...newExamData}

        // setWrttenExamData(newExamData);
        // console.log('211',newFile,newExamData,'------',writtenExamData)
        setConfirmButton(false);
      }
      else{
        alert('Please Upload PDF file')
      }
  }
  
  const makeWrittenExam = (e) =>{
    e.preventDefault();
    setConfirmButton(true)
    console.log('ok')
    console.log(writtenExamData)
    console.log( writtenQuestion)
    // course, date, startTime, examName, endTime, examType, question, pdfFile
    const formData = new FormData();
          formData.append("file", writtenQuestion);
          formData.append("course", JSON.stringify(mcqExamData.course));
          formData.append("date", writtenExamData.date);
          formData.append("startTime", writtenExamData.startTime);
          formData.append("endTime", writtenExamData.endTime);
          formData.append("examName", writtenExamData.examName);
          formData.append("examType", writtenExamData.examType);

          fetch("https://protected-reef-78007.herokuapp.com/createWrittenExam", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              alert('Exam created successfully');
            })
            .catch((error) => {
              console.error(error);
            });
  }


  return (
    <div className="create-exam-wrapper">
      {showCourses ? (
        <div className="cards row">
            {loggedInUser.courses.map((course) => (
              <CourseCard handleSelectExamDateButton={handleSelectExamDateButton} showWaitingButton={false} 
              className='col-md-4' course={course} key={course.courseCode}></CourseCard>
            ))}
        </div>
      ) : (
        <></>
      )}
      {showCalendar ? (
        <Container>
          <Button className="text-danger bg-warning m-2 px-3 rounded" onClick={handleBackToCoursesButton}>
            <b>&larr;</b> Back to courses
          </Button>
          <ExamInfo selectedDate={selectedDate} setSelectedDate={setSelectedDate} startTime={startTime} 
          setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} setExamName={setExamName}></ExamInfo>
          {
            selectedDate && startTime && endTime && examName ?
            <Button variant="primary" onClick={handleCreateExamButton}>Create Exam</Button> : <></>
          }
        </Container>
      ) : (
        <></>
      )}
      {showExamCreator ? (
        <section>
          <Button className="text-danger bg-warning m-2 px-3 rounded" onClick={handleBackToCalendarButton} >
            <b>&larr;</b> Back to calendar
          </Button> <br /> <br />
          <h6>{`Exam for ${courseCode}`}</h6>
          <div className="quiz-method">
            <button type="button" onClick={() => setMethod("Upload")} className="btn btn-outline-primary btn-lg" > Upload File </button>
            <button type="button" onClick={() => setMethod("Create Quiz")} className="btn btn-primary btn-lg" > Create Quiz </button>
          </div>
          <div className="selected-method">
            <h6> <span className="badge bg-secondary m-3">{method}</span> </h6>
            {method === "Upload" ? (
              <div className="upload-file">
                <form className="p-5" onSubmit={makeWrittenExam}>
                  <div className="upload-file">
                  <label htmlFor="upload" className="form-label"> Upload File (PDF) </label>
                  <input className="form-control form-control-lg" type="file" name="" id="upload" onChange={handlePDFUpload} accept="application/pdf" />
                  </div>
                  {/* <button type="button" onClick={handleConfirmQuiz} disabled={confirmButton} style={{ width: "100%" }}
                    className="btn btn-outline-success btn-lg mt-2" > Confirm Submit </button> */}
                  <input type="submit" disabled={confirmButton} style={{ width: "100%" }} 
                  className="btn btn-outline-success btn-lg mt-2" value="Confirm Submit" />
                </form>
              </div>
            ) : (
              <></>
            )}
            {method === "Create Quiz" ? (
              <Container>
                <form>
                  {quizes.length > 1 ? (
                    <span className="badge bg-light text-dark">
                      {quizes.length} questions
                    </span>
                  ) : (
                    <span className="badge bg-light text-dark">
                      {quizes.length} question
                    </span>
                  )}
                  <Row md={3} xl={4} sm={1}>
                    {quizes.map((quiz, index) => (
                      <div key={index} className="quiz-set">
                        <textarea name="question" value={quiz.question} onChange={(event) => handleChangeInput(index, event)}
                          className="form-control m-1" style={{ height: "100px", width: "350px" }} required
                          placeholder={`Enter question ${index + 1}`} /> <br />
                        <input type="text" name="option1" value={quiz.option1} onChange={(event) => handleChangeInput(index, event)}
                          className="form-control m-1" style={{ width: "350px" }} required placeholder="Option1" /> <br />
                        <input type="text" name="option2" value={quiz.option2}  onChange={(event) => handleChangeInput(index, event)}
                          className="form-control m-1" style={{ width: "350px" }} required placeholder="Option2" /> <br />
                        <input type="text" name="option3" value={quiz.option3} onChange={(event) => handleChangeInput(index, event)}
                          className="form-control m-1" style={{ width: "350px" }}  placeholder="Option3" /> <br />
                        <input type="text" name="option4" value={quiz.option4} onChange={(event) => handleChangeInput(index, event)}
                          className="form-control m-1" style={{ width: "350px" }} required placeholder="Option4" /> <br />
                        <input type="text" name="correctAnswer" value={quiz.correctAnswer}
                          onChange={(event) => handleChangeInput(index, event)}
                          className="form-control m-1" style={{ width: "350px" }} required placeholder="Correct answer" />
                        <span className="badge bg-secondary mt-3 mb-3"> marks
                          <input name="marks" id="marks" defaultValue='1' onChange={(event) => handleChangeInput(index, event) }
                          type="number" className="form-control m-1"  max='10' min='1' style={{ width: "350px" }}
                          required placeholder="Marks"  />
                        </span><br />
                        <button type="button" disabled={disabled}
                          // @ts-ignore
                          onClick={handleRemoveQuiz(index)} className="btn btn-danger btn-lg mx-2 mb-3" >  - </button>
                        <button type="button" onClick={handleAddQuiz}  className="btn btn-warning btn-lg mx-2 mb-3" >  + </button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-outline-primary mt-3" style={{ width: "100%" }}
                      onClick={handleSubmit} > Save Changes </button> <br />
                    <button type="button" onClick={handleConfirmQuiz} disabled={confirmButton} style={{ width: "100%" }}
                      className="btn btn-outline-success btn-lg mt-2" > Confirm Quiz </button>
                  </Row>
                </form>
              </Container>
            ) : (
              <></>
            )}
          </div>
        </section>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateExam;
import { UserContext } from "App";
import React, { useContext, useState } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CreateExam.css";

const CreateExam = () => {
  // @ts-ignore
  const { loggedInUserData, courseInfo } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = loggedInUserData;
  const [courseData, setCourseData] = courseInfo;
  //these are the teacher's and courses information taken from the contextAPI

  const [courseCode, setCourseCode] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [showExamCreator, setShowExamCreator] = useState(false);

  const [showCourses, setShowCourses] = useState(true);
  //this will allow displaying all the courses by default

  const [method, setMethod] = useState("Select Method");
  const [disabled, setDisabled] = useState(false);
  const [confirmButton, setConfirmButton] = useState(true);

  //   console.log(loggedInUser.courses);
  // console.log(courseData);

  const [quizes, setQuizes] = useState([
    {
      date: selectedDate,
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
      marks: "",
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
    for (let i = 0; i < quizes.length; i++) {
      if (
        !quizes[i].question ||
        !quizes[i].option1 ||
        !quizes[i].option2 ||
        !quizes[i].option3 ||
        !quizes[i].option4 ||
        !quizes[i].correctAnswer
      ) {
        alert("Please provide all questions with options.");
      } else {
        setConfirmButton(false);
        // const updatedCourse = loggedInUser.courses.exams.push(quizes);
        // console.log("Quiz :", updatedCourse);
      }
    }
  };
  const handleAddQuiz = () => {
    setQuizes([
      ...quizes,
      {
        date: selectedDate,
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
    const values = [...quizes];
    if (values.length > 1) {
      values.splice(index, 1);
      setQuizes(values);
    } else if (index === 0) {
      setDisabled(true);
    }
  };
  const handleConfirmQuiz = () => {
    console.log("Quiz Confirmed");
    console.log(quizes);
    //post using this method
  };
  const handleSelectDateButton = () => {
    setShowCourses(false);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowExamCreator(true);
    // console.log(quizes[0].date);
  };
  const handleCreateExamButton = (courseCode) => {
    setCourseCode(courseCode);
    // console.log(courseCode);
  };
  const handleBackButton = () => {
    setShowCourses(true);
    setShowExamCreator(false);
    setCourseCode("");
  };

  return (
    <div className="create-exam-wrapper">
      {showCourses ? (
        <Container>
          <Row md={3} xs={2} xl={4}>
            {loggedInUser.courses.map((eachCourse) => (
              <Card style={{ width: "18rem", margin: "10px" }}>
                <Card.Img variant="top" src={`data:image/png;base64,${eachCourse.image.img}`}/>
                <Card.Body>
                  <Card.Title>{eachCourse.courseName}</Card.Title>
                  <Card.Text>{eachCourse.courseCode}</Card.Text>
                  <Button variant="primary" onClick={handleSelectDateButton}>
                    Select Exam Date
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </Container>
      ) : (
        <Container>
          <Button
            className="text-danger bg-warning m-2 px-3 rounded"
            onClick={handleBackButton}
          >
            <b>&larr;</b> BACK
          </Button>
          <Calendar onChange={handleDateChange} />
        </Container>
      )}
      {
          showExamCreator ? 
          (
              <section>
          <Button
            className="text-danger bg-warning m-2 px-3 rounded"
            onClick={handleBackButton}
          >
            <b>&larr;</b> BACK
          </Button>
          <br />
          <br />
          <h6>{`Exam for ${courseCode}`}</h6>
          <div className="quiz-method">
            <button
              type="button"
              onClick={() => setMethod("Upload")}
              className="btn btn-outline-primary btn-lg"
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setMethod("Create Quiz")}
              className="btn btn-primary btn-lg"
            >
              Create Quiz
            </button>
          </div>
          <div className="selected-method">
            <h6>
              <span className="badge bg-secondary m-3">{method}</span>
            </h6>
            {method === "Upload" ? (
              <div className="upload-file">
                <label htmlFor="upload" className="form-label">
                  Upload File (PDF)
                </label>
                <input
                  className="form-control form-control-lg"
                  type="file"
                  name=""
                  id="upload"
                  accept="application/pdf"
                />
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
                        <span className="badge bg-secondary m-3">
                          marks
                          <input name="marks" id="marks" value={quiz.marks}
                          onChange={(event) => handleChangeInput(index, event)} type="number" max="10" min="1" />
                        </span>
                        <textarea
                          name="question"
                          value={quiz.question}
                          onChange={(event) => handleChangeInput(index, event)}
                          className="form-control m-1"
                          style={{ height: "100px", width: "350px" }}
                          required
                          placeholder={`Enter question ${index + 1}`}
                        />
                        <br />
                        <input
                          type="text"
                          name="option1"
                          value={quiz.option1}
                          onChange={(event) => handleChangeInput(index, event)}
                          className="form-control m-1"
                          style={{ width: "350px" }}
                          required
                          placeholder="Option1"
                        />
                        <br />
                        <input
                          type="text"
                          name="option2"
                          value={quiz.option2}
                          onChange={(event) => handleChangeInput(index, event)}
                          className="form-control m-1"
                          style={{ width: "350px" }}
                          required
                          placeholder="Option2"
                        />
                        <br />
                        <input
                          type="text"
                          name="option3"
                          value={quiz.option3}
                          onChange={(event) => handleChangeInput(index, event)}
                          className="form-control m-1"
                          style={{ width: "350px" }}
                          required
                          placeholder="Option3"
                        />
                        <br />
                        <input
                          type="text"
                          name="option4"
                          value={quiz.option4}
                          onChange={(event) => handleChangeInput(index, event)}
                          className="form-control m-1"
                          style={{ width: "350px" }}
                          required
                          placeholder="Option4"
                        />
                        <br />
                        <input
                          type="text"
                          name="correctAnswer"
                          value={quiz.correctAnswer}
                          onChange={(event) => handleChangeInput(index, event)}
                          className="form-control m-1"
                          style={{ width: "350px" }}
                          required
                          placeholder="Correct answer"
                        />
                        <br />
                        <button
                          type="button"
                          disabled={disabled}
                          onClick={handleRemoveQuiz}
                          className="btn btn-danger btn-lg mx-2 mb-3"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={handleAddQuiz}
                          className="btn btn-warning btn-lg mx-2 mb-3"
                        >
                          +
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-outline-primary mt-3"
                      style={{ width: "100%" }}
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </button>
                    <br />
                    <button
                      type="button"
                      onClick={handleConfirmQuiz}
                      disabled={confirmButton}
                      style={{ width: "100%" }}
                      className="btn btn-outline-success btn-lg mt-2"
                    >
                      Confirm Quiz
                    </button>
                  </Row>
                </form>
              </Container>
            ) : (
              <></>
            )}
          </div>
        </section>
          ) : <></>} 
    </div>
  );
};

export default CreateExam;
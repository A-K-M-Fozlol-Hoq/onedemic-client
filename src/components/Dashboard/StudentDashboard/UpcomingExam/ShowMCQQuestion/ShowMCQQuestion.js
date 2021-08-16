import React, { useEffect, useState } from 'react';
import ShowMcqQuestionCard from '../Utilities/ShowMcqQuestionCard';

const ShowMCQQuestion = ( props) => {
    const { quiz,examName }= props;
    const questions = JSON.parse(quiz.questions);
    const [ showMCQ, setShowMCQ]= useState('')
    const totalMCQ= questions.length;
    const [ questionNo, setQuestonNo]=useState(1);
    const [ enableNextButton, setEnableNextButton]=useState(false);
    const [ enableSubmitButton, setEnableSubmitButton]=useState(true)
    const [haveTime, sethaveTime]= useState(true)
    const [ correctAnswer, setCorrectAnswer]= useState('')
    const [ selectedAnswer, setselectedAnswer]= useState('')
    
    useEffect(() => {
        if(questions.length>0){
            setShowMCQ(questions[0])
            setQuestonNo(1);
            sessionStorage.setItem("marks", '0');
        }
        
    },[])
    const handleSubmit =(e)=>{
        e.preventDefault();
        setEnableSubmitButton(false)
        let marks = parseInt(sessionStorage.getItem("marks"));
        if(correctAnswer ===selectedAnswer ){
            marks = marks+1;
            console.log(marks,'marks')
            sessionStorage.setItem("marks", marks.toString() );
        }
        const email = sessionStorage.getItem("email");
        console.log(email, quiz.course.courseCode, marks,examName)
        const formData2 = new FormData();
            formData2.append("email", email);
            formData2.append("courseCode", quiz.course.courseCode);
            // @ts-ignore
            formData2.append("marks", marks);
            formData2.append("examName", examName);
            fetch("https://protected-reef-78007.herokuapp.com/storeMCQResult", {
              method: "POST",
              body: formData2,
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                alert('Submitted answer script successfully!')
              })
              .catch((error) => {
                console.error(error);
              });
    }
    const handleNextButton =(correctAnswer)=>{
        setQuestonNo(questionNo+1)
        if(questionNo === (totalMCQ-1)){
            setEnableNextButton(true)
            setShowMCQ(questions[questionNo])
        }
        else{
            setEnableNextButton(false)
            setShowMCQ(questions[questionNo])
        }
        console.log(correctAnswer , selectedAnswer)
        if(correctAnswer ===selectedAnswer ){
            const marks = parseInt(sessionStorage.getItem("marks"))+1;
            console.log(marks,'marks')
            sessionStorage.setItem("marks", marks.toString() );
        }
    }
    setInterval(function(){ 
        if(new Date().getTime() > quiz.endTime) {
            sethaveTime(false)
        }
    }, 10000);
    return (
        <div>
            {
                showMCQ ?
                <div>
                    <ShowMcqQuestionCard handleNextButton={handleNextButton} enableNextButton={enableNextButton}
                    questionNo={questionNo} totalMCQ={totalMCQ} setCorrectAnswer={setCorrectAnswer} correctAnswer={correctAnswer}
                    setselectedAnswer={setselectedAnswer} selectedAnswer={selectedAnswer} question={showMCQ}></ShowMcqQuestionCard>
                    {
                        haveTime?
                        <div><button  onClick={handleSubmit}className="btn btn-primary" disabled={!enableSubmitButton}
                        >Save And Finish Now(Submit Answer)</button></div>
                        :
                        <p style={{width:'100%'}} className="btn btn-danger p-5">time end (You will able to submit ths answer script)</p>
                    }
                </div>
                :<></>
            }
        </div>
    );
};

export default ShowMCQQuestion;
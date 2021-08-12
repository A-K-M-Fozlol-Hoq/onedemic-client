import React from 'react';

const ShowMcqQuestionCard = (props) => {
    const {question, enableNextButton, handleNextButton,questionNo,totalMCQ,setselectedAnswer,setCorrectAnswer}= props;
    
    const handleChange=(e,correctAnswer) =>{
        const { value} = e.target;
        setselectedAnswer(value)
        setCorrectAnswer(correctAnswer)
    }
    
    const nextButton = (e,correctAnswer) => {
        setCorrectAnswer(correctAnswer)
        handleNextButton(correctAnswer)
    }
    return (
        <div>
            <p style={{width:'100%'}} className='text-white bg-success p-2 text-center'>{questionNo}(st/nd/rd/th) question of total {totalMCQ}</p>
            <div className="question-part m-5 p-5 bg-primary text-white rounded">
            <p>{question.question}</p>
                <select  onChange={(e)=>handleChange(e,question.correctAnswer)}className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value={question.option1} >{question.option1}</option>
                    <option value={question.option2}>{question.option2}</option>
                    <option value={question.option3}>{question.option3}</option>
                    <option value={question.option4}>{question.option4}</option>
                </select>
                <button disabled className="btn btn-warning mt-5">Previous</button>
                <button disabled={enableNextButton} onClick={(e)=>nextButton(e,question.correctAnswer)} style={{marginLeft:'10px'}}
                 className="btn btn-warning mt-5">Next</button>
            </div>
        </div>
    );
};

export default ShowMcqQuestionCard;
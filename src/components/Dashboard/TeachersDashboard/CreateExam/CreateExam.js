import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './CreateExam.css';

const CreateExam = () => {
    const [method, setMethod] = useState('Create Quiz');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);
    const [confirmButton, setConfirmButton] = useState(true);

    const [quizes, setQuizes] = useState([{
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: ''
    }]); //This is going to be used for setting each quiz

    const handleChangeInput = (index, event) => {
        const values = [...quizes];
        values[index][event.target.name] = event.target.value;
        setQuizes(values);
        setConfirmButton(true);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        for (let i = 0; i < quizes.length; i++) {
            if (!quizes[i].question ||
                !quizes[i].option1 ||
                !quizes[i].option2 ||
                !quizes[i].option3 ||
                !quizes[i].option4 ||
                !quizes[i].correctAnswer) {
                setError(true);
                alert('Please provide all questions with proper options.');
            }
            else {
                setConfirmButton(false);
                console.log("Quiz :", quizes);
            }
        }

    }
    const handleAddQuiz = () => {
        setQuizes([...quizes, {
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            correctAnswer: ''
        }])
    }
    const handleRemoveQuiz = (index) => {
        const values = [...quizes];
        if (values.length > 1) {
            values.splice(index, 1);
            setQuizes(values);
        }
        else if (index === 0) {
            setDisabled(true);
        }
    }
    const handleConfirmQuiz = () => {
        console.log("Quiz Confirmed");
        //post using this method
    }

    return (
        <div className='create-exam-wrapper'>
            <h3>Create Exam</h3>
            <div className="quiz-method">
                <button type="button"
                    onClick={() => setMethod('Upload')}
                    className="btn btn-outline-primary btn-lg">Upload File</button>
                <button type="button"
                    onClick={() => setMethod('Create Quiz')}
                    className="btn btn-primary btn-lg">Create Quiz</button>
            </div>
            <div className="selected-method">
                <h3>{method}</h3>
                {
                    method === 'Upload' ?

                        <div className="upload-file">
                            <label htmlFor="upload" className="form-label">Upload File (PDF)</label>
                            <input className="form-control form-control-lg" type="file" name="" id="upload" accept="application/pdf" />
                        </div>
                        : <></>
                }
                {
                    method === 'Create Quiz' ?
                        <form>
                            {
                                quizes.map((quiz, index) => (
                                    <div key={index} className='quiz-set'>
                                        <span className="badge bg-secondary m-3">#{index+1}</span>
                                        <textarea
                                            name='question'
                                            value={quiz.question}
                                            onChange={event => handleChangeInput(index, event)}
                                            className="form-control m-1"
                                            style={{ 'height': '100px', 'width': '400px' }}
                                            required
                                            placeholder="Enter question here" /><br />
                                        <input type="text"
                                            name='option1'
                                            value={quiz.option1}
                                            onChange={event => handleChangeInput(index, event)}
                                            className="form-control m-1"
                                            style={{ 'width': '400px' }}
                                            required
                                            placeholder='Option1' /><br />
                                        <input type="text"
                                            name='option2'
                                            value={quiz.option2}
                                            onChange={event => handleChangeInput(index, event)}
                                            className="form-control m-1"
                                            style={{ 'width': '400px' }}
                                            required
                                            placeholder='Option2' /><br />
                                        <input type="text"
                                            name='option3'
                                            value={quiz.option3}
                                            onChange={event => handleChangeInput(index, event)}
                                            className="form-control m-1"
                                            style={{ 'width': '400px' }}
                                            required
                                            placeholder='Option3' /><br />
                                        <input type="text"
                                            name='option4'
                                            value={quiz.option4}
                                            onChange={event => handleChangeInput(index, event)}
                                            className="form-control m-1"
                                            style={{ 'width': '400px' }}
                                            required
                                            placeholder='Option4' /><br />
                                        <input type="text"
                                            name='correctAnswer'
                                            value={quiz.correctAnswer}
                                            onChange={event => handleChangeInput(index, event)}
                                            className="form-control m-1"
                                            style={{ 'width': '400px' }}
                                            required
                                            placeholder='Correct answer' /><br />
                                        <button type="button" disabled={disabled} onClick={handleRemoveQuiz} className="btn btn-danger btn-lg mx-2 mb-3">-</button>
                                        <button type="button" onClick={handleAddQuiz} className="btn btn-warning btn-lg mx-2 mb-3">+</button>
                                    </div>
                                ))
                            }
                            <button type="button"
                                className="btn btn-outline-primary mt-3"
                                style={{ 'width': '100%' }}
                                onClick={handleSubmit}>Save Changes</button><br />
                            <button type="button"
                                onClick={handleConfirmQuiz}
                                disabled={confirmButton}
                                style={{ 'width': '100%' }}
                                className="btn btn-outline-success btn-lg mt-2">Confirm Quiz</button>
                        </form>
                        : <>
                        </>
                }
            </div>
        </div>
    );
};

export default CreateExam;
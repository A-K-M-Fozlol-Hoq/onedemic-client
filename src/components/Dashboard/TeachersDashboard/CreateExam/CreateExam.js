import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './CreateExam.css';

const CreateExam = () => {
    const [method, setMethod] = useState('Create Quiz');
    const [questions, setQuestions] = useState([]);

    // const [quiz, setQuiz] = useState({
    //     question: '',
    //     option1: '',
    //     option2: '',
    //     option3: '',
    //     option4: ''
    // }); //This is going to be used for setting each quiz

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        setQuestions([...questions, {
            question: data.question,
            option1: data.option1,
            option2: data.option2,
            option3: data.option3,
            option4: data.option4
        }]);
        console.log('quiz added', questions);
}

return (
    <div className='create-exam-wrapper'>
        <h3>Create Exam</h3>
        <div className="quiz-method">
            <button type="button" onClick={() => setMethod('Upload')} className="btn btn-outline-primary btn-lg">Upload File</button>
            <button type="button" onClick={() => setMethod('Create Quiz')} className="btn btn-primary btn-lg">Create Quiz</button>
        </div>
        <div className="selected-method">
            <h3>{method}</h3>
            {
                method === 'Upload' ?
                    <div className="upload-file">
                        <input type="file" name="" id="" />
                    </div>
                    : <></>
            }
            {
                method === 'Create Quiz' ?
                    // <div>
                    //     <label htmlFor="numberOfQuizes">Number of questions</label>
                    //     <input type="number" name="numberOfQuestions" id="numberOfQuestions" min='1' max='80' />
                    // </div>
                    <>
                        <div className="quizes">
                            <h5>{`Number of quizes : ${questions.length}`}</h5>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label htmlFor="question">Question {questions.length}</label>
                                <input className='quiz-field mb-2 form-control' name='question' placeholder='Enter Question'{...register("question", { required: true })} />
                                {errors.question && <span className='text-danger'>Please enter the question</span>} <br />

                                <label htmlFor="option1">1. </label>
                                <input className='pr-5 my-1 mx-2' name='option1' placeholder='enter option1'{...register("option1", { required: true })} />
                                {errors.option1 && <span className='text-danger'>Please provide option 1</span>} <br />

                                <label htmlFor="option2">2. </label>
                                <input className='pr-5 my-1 mx-2' name='option2' placeholder='enter option2'{...register("option2", { required: true })} />
                                {errors.option2 && <span className='text-danger'>Please provide option 2</span>} <br />

                                <label htmlFor="option3">3. </label>
                                <input className='pr-5 my-1 mx-2' name='option3' placeholder='enter option3'{...register("option3", { required: true })} />
                                {errors.option3 && <span className='text-danger'>Please provide option 3</span>} <br />

                                <label htmlFor="option4">4. </label>
                                <input className='pr-5 my-1 mx-2' name='option3' placeholder='enter option4'{...register("option4", { required: true })} />
                                {errors.option4 && <span className='text-danger'>Please provide option 4</span>} <br />

                                <input type="submit" />
                            </form>
                        </div>
                    </>
                    : <></>
            }
        </div>
    </div>
);
};

export default CreateExam;
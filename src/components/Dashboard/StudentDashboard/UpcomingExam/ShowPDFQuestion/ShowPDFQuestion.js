import React, { useEffect, useState } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';

export default function ShowPDFQuestion( props) {
  const {quiz,examName}= props;
  
pdfjs.GlobalWorkerOptions.workerSrc =
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1);
const [ answerScript, setAnswerScript] = useState(null);
const [ showSubmitButton, setShowSubmitButton] = useState(false);
let [ pdf, setPDF] = useState({});
const [haveTime, sethaveTime]= useState(true)

document.addEventListener("contextmenu", (event) => {
	event.preventDefault();
});
	
/*When document gets loaded successfully*/
function onDocumentLoadSuccess({ numPages }) {
	setNumPages(numPages);
	setPageNumber(1);
}

function changePage(offset) {
	setPageNumber(prevPageNumber => prevPageNumber + offset);
}

function previousPage() {
	changePage(-1);
}

function nextPage() {
	changePage(1);
}
const handleAnswerUpload = (e) => {
  e.preventDefault();
  const newFile = e.target.files[0];
  if(newFile.type === 'application/pdf'){
    setAnswerScript(newFile);
    setShowSubmitButton(true)
  }
  else{
    alert('Please Upload PDF file')
  }
  
}
const handleAnswerSubmit = (e) => {
  e.preventDefault();
  setShowSubmitButton(false)
  if(answerScript){
    console.log(answerScript)
    const email = sessionStorage.getItem("email");
    const pdfCode = new Date();
    const formData = new FormData();
    formData.append("file", answerScript);
    // @ts-ignore
    formData.append("pdfCode", pdfCode);
    fetch("http://localhost:4000/storePDF", {
      method: "POST",
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
    const formData2 = new FormData();
      // @ts-ignore
      formData2.append("pdfCode", pdfCode);
      formData2.append("email", email);
      formData2.append("courseCode", quiz.course.courseCode);
      formData2.append("marks", 'pending');
      formData2.append("examName", examName);
      fetch("http://localhost:4000/storeWrittenesult", {
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
  else{
    alert('Please Upload answer script before submission')
  }
}

setInterval(function(){ 
  if(new Date().getTime() > quiz.endTime) {
      sethaveTime(false)
  }
}, 10000);

return (
	<div>
	<div className="main">
	<Document
    file={`data:application/pdf;base64,${quiz.pdfFile.pdf}`}
		onLoadSuccess={onDocumentLoadSuccess}
	>
		<Page pageNumber={pageNumber} />
	</Document>
	<div>
		<div className="pagec">
		Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
		</div>
		<div className="buttonc">
		<button
		type="button"
		disabled={pageNumber <= 1}
		onClick={previousPage}
		className="Pre">Previous</button>
		<button type="button" disabled={pageNumber >= numPages} onClick={nextPage} > Next </button>
		</div>
	</div>
	</div>
  <form className="p-5" onSubmit={handleAnswerSubmit}>
    <div className="upload-file">
      <label htmlFor="upload" className="form-label"> Upload File (PDF) </label>
      <input onChange={handleAnswerUpload} className="form-control form-control-lg" type="file" name="answerScript"
        id="upload" accept="application/pdf" />
    </div>
    {
      haveTime?
      <input disabled={!showSubmitButton} type="submit"
      className={`message ${showSubmitButton === true ? "btn btn-success mt-5" : " mt-5"}`} value="Submit answer" />
      :
      <p style={{width:'100%'}} className="btn btn-danger mt-5 p-5">time end (You will able to submit ths answer script)</p>
    }
    </form>
  {
    // @ts-ignore
    pdf.pdf ?
    <Document
		// @ts-ignore
		file={`data:application/pdf;base64,${pdf.pdf}`}
		onLoadSuccess={onDocumentLoadSuccess}
	>
		<Page pageNumber={pageNumber} />
	</Document>
  :
  <></>
  }
	</div>
);
}
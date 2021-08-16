import React, { useEffect, useState } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
// @ts-ignore
import url from './sample.pdf';
// const url =
// "http://www.africau.edu/images/default/sample.pdf"

export default function ShowPDFQuestionDeltedComponentOldCOmponentDontImportThis() {

  
pdfjs.GlobalWorkerOptions.workerSrc =
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const [numPages, setNumPages] = useState(null);
const [pageNumber, setPageNumber] = useState(1);
const [ answerScript, setAnswerScript] = useState(null);
const [ showSubmitButton, setShowSubmitButton] = useState(false);
let [ pdf, setPDF] = useState({});

useEffect(()=>{
  fetch('https://protected-reef-78007.herokuapp.com/getPDFDemo', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
  })
      .then(response => response.json())
      .then(data => {
        // src={`data:image/png;base64,${image.img}`}
          console.log(data[0].pdfFile,'  --start')
          // setUrl(data[0].pdfFile.pdf)
          // @ts-ignore
          setPDF(data[0].pdfFile);
          // setUrl(`data:application/json;base64,${data[0].pdfFile.pdf})`)
          // console.log(url,'ok')
          // console.log(`data:application/pdf;base64,${pdf}`,'ok')
      })
      .catch(error => {
          console.error(error)
      })
},[])

/*To Prevent right click on screen*/
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
  if(answerScript){
    console.log(answerScript)

    console.log('1')



    const formData = new FormData();
          formData.append("file", answerScript);

          fetch("https://protected-reef-78007.herokuapp.com/storePDFDemo", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              alert('Course created successfully');
            })
            .catch((error) => {
              console.error(error);
            });
  }
  else{
    alert('Please Upload answer script before submission')
  }
}

return (
	<div>
	<div className="main">
	<Document
		file={url}
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
    <input disabled={!showSubmitButton} type="submit" className={`message ${showSubmitButton === true ? "btn btn-success mt-5" : " mt-5"}`} value="Submit answer" />
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





// API part for
// app.post("/storePDFDemo", (req, res) => {
//     const file = req.files.file;
//     const newPDF = file.data;
//     const encPDF = newPDF.toString("base64");

//     var pdfFile = {
//       contentType: file.mimetype,
//       size: file.size,
//       pdf: Buffer.from(encPDF, "base64"),
//     };
//     // console.log(file,courseCode, courseName, email, image);
//     pdfColletion
//       .insertOne({ pdfFile })
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
//   app.get("/getPDFDemo", (req, res) => {
//     pdfColletion.find({ }).toArray((err, pdf) => {
//       res.send(pdf)
//     });
//   });
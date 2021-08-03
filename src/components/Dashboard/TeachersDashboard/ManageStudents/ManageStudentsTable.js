import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import deleteImg from '../../../../images/delete.webp'
import { Link } from 'react-router-dom';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(email, name, deleteImg) {
  return { email, name, deleteImg };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ManageStudentsTable( props ) {
  const { course,deleteStudent } = props;
  console.log(props)
  let rows=[];
  course.students?.map((student) => ( rows.push(createData(student.email, student.name, deleteImg))))
  const classes = useStyles();

  const handleUnblock = (email) => {
    console.log(email,course.courseCode)
    fetch("http://localhost:4000/removeFromBlockList", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email,courseCode:course.courseCode }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.unblocked){
            alert(`Successfully unblocked ${email} from the course!`)
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }


  return (
    <div>
      <h1 className="w-100 p-2 bg-primary text-white text-center rounded">MANAGE STUDENTS</h1>
      {
        rows.length >0 ?
        <div>
          <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell align="right">Name</StyledTableCell>
                      <StyledTableCell align="right">Remove</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.email}>
                        <StyledTableCell component="th" scope="row">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.name}</StyledTableCell>
                        <StyledTableCell align="right"> <img onClick={()=>deleteStudent(course.courseCode,row.email)} style={{width: '50px', borderRadius:'25%'}} src={row.deleteImg} alt='{row.deleteImg}'></img> </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
            </TableContainer>
        </div>
        :
        <div>
          <p className= 'p-2 m-2 rounded text-center w-25 m-auto btn-success'>No students have joined yet!</p>
        </div>
      }
      

    <div style={{ marginTop:'150px'}}>
    <h1 className="w-100 p-2 bg-primary text-white text-center rounded">BLOCKED STUDENTS</h1>
    {
      course.blockList?.length>0?
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell align="right">UnBlock</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
               course.blockList.map((student) => ((<StyledTableRow key={student.email}> 
                <StyledTableCell component="th" scope="row">{student.email}</StyledTableCell> 
                <StyledTableCell align="right"> <Link onClick={()=>handleUnblock(student.email)} className='btn btn-danger' to='/dashboard'>UnBlock</Link> </StyledTableCell>
                </StyledTableRow>)))
               }
            </TableBody>
          </Table>
        </TableContainer>
      :
      <div>
        <p className= 'p-2 m-2 rounded text-center w-25 m-auto btn-success'>No students to unblock!</p>
      </div>
    }
    </div>
    </div>
  );
}

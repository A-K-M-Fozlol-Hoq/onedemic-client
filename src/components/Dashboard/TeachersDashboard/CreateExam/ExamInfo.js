
  import React from 'react';
  import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from "@material-ui/pickers";
  import { Grid } from "@material-ui/core";
  import DateFnsUtils from "@date-io/date-fns";
  
const ExamInfo = (props) => {
    const { selectedDate, setSelectedDate, startTime, setStartTime, endTime, setEndTime, setExamName } = props;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Choose Exam Date"
                value={selectedDate}
                onChange={setSelectedDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="start-time-picker"
                label="Start Time"
                value={startTime}
                onChange={(t) => setStartTime(t.getTime())}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="end-time-picker"
                label="End Time"
                value={endTime}
                onChange={(t) => setEndTime(t.getTime())}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />{" "}
              <br />
              <div>
                <h2>
                  <span className="badge bg-secondary m-3">
                    Start time: {new Date(startTime).getHours()}:
                    {new Date(startTime).getMinutes()}
                  </span>
                </h2>
                <h2>
                  <span className="badge bg-secondary m-3">
                    End Time: {new Date(endTime).getHours()}:
                    {new Date(endTime).getMinutes()}
                  </span>
                </h2>
              </div>
              <div>
              <input className="form-control" placeholder="Enter Exam name" onChange={(e)=>setExamName(e.target.value)} type="text" />
              </div>
            </Grid>
          </MuiPickersUtilsProvider>
    );
};

export default ExamInfo;
import React from 'react';
import classes from './addInput.module.css'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddInput = ({onInputChanged, onAddBtnClicked, inputValue}) => {

    return (
        <div className={classes.header}>
            <TextField data-test-id={"add-input"} id="standard-basic" label="Tag name"
                       onChange={onInputChanged}
                       value={inputValue} variant="standard"
                       className={classes.add_input}/>

            <Button data-test-id={"add-button"} variant="contained" onClick={onAddBtnClicked} className={classes.add_btn}>Add</Button>
        </div>
    );
};

export default AddInput;

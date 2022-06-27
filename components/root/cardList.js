import React, {useEffect, useState} from 'react';
import classes from './cardList.module.css'
import Card from '@mui/material/Card';
import List from "@mui/material/List";
import AddInput from "./AddInput";
import Item from "./item";
import {Scrollbars} from 'react-custom-scrollbars';
import Alert from "@mui/material/Alert";
import {useRouter} from "next/router";
import Snackbar from "@mui/material/Snackbar";

export const CardList = () => {
    const {asPath} = useRouter();

    const [listItems, setListItems] = useState([]);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        // After component mounted on client side, (not server side)
        const hashes = asPath.replace("/#tags=", "").replace("/", "")
        if (hashes !== "") {
            setListItems(hashes.split(","))
        }
    }, [])

    useEffect(() => {
        setInputValue("")
        window.location.hash = "tags=" + listItems.join(",");
    }, [listItems])

    useEffect(() => {
        console.log(openSnackBar);
    }, [openSnackBar])

    const onInputChanged = (e) => {
        setInputValue(e.target.value)
    };

    const onAddBtnClicked = () => {
        if (inputValue === "") {
            return
        }
        setOpenSnackBar(true)
        setListItems(prevList => [...prevList, inputValue])
    };

    const onRemoveClicked = (id) => {
        const array = [...listItems]; // make a separate copy of the array
        if (id !== -1) {
            array.splice(id, 1);
            setListItems(array)
        }
    };

    const handleClose = () => {
        setOpenSnackBar(false)
    };

    return (
        <div className={classes.container}>
            <Card data-test-id={"card"} sx={{maxWidth: 345, maxHeight: 400, height: 400}} className={classes.card}>
                <AddInput onInputChanged={onInputChanged} onAddBtnClicked={onAddBtnClicked} inputValue={inputValue}/>

                <Scrollbars style={{width: 345, height: 400}} universal={true}>

                    {listItems.length > 0 ? <List data-test-id={"list"} className={classes.list}>
                        {listItems.map((tag, index) => {
                            return <Item tag={tag} data-test-id={`list-item-${index}`} index={index} key={index + tag} onRemoveClicked={onRemoveClicked}/>
                        })}
                    </List> : <Alert severity="info" className={classes.alert}>please add a tag</Alert>}


                </Scrollbars>
            </Card>


            <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Tag added successfully!
                </Alert>
            </Snackbar>

        </div>
    );
};

export default Card;

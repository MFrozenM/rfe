import React from 'react';
import classes from './item.module.css'
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import RemoveIcon from "../../public/icons/remove.svg";
import ListItem from "@mui/material/ListItem";

const Item = ({tag, onRemoveClicked, index}) => {
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemText primary={tag}/>
                <RemoveIcon data-test-id={`remove-icon-${index}`} onClick={() => onRemoveClicked(index)} className={classes.remove_icon}/>
            </ListItemButton>
        </ListItem>
    );
};

export default Item;

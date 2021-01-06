import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import * as M from '@material-ui/core';

export default function EmptyState(props) {
    return (
        <div className="EmptyState">
            <SearchIcon style={{ fontSize: 200 }}/>
            <M.Typography
                variant="h6"
            >
                {props.children}
            </M.Typography>
            <M.Button 
                variant="contained" 
                onClick={props.onClick}
                color="primary"
                startIcon={props.buttonIcon}
            >
                {props.button}
            </M.Button>
        </div>
    );
}
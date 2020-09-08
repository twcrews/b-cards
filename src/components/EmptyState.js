import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';

export default function EmptyState(props) {
    return (
        <div className="EmptyState">
            <SearchIcon style={{ fontSize: 200 }}/>
            <Typography variant="h6">{props.children}</Typography>
        </div>
    );
}
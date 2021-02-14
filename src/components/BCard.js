import React from 'react';
import Card from '@material-ui/core/Card';
import { Button, Typography } from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import ReactHtmlParser from 'react-html-parser';

export default function BCard(props) {
    const handleFlagToggle = () => { props.onFlag(); }

    return (
        <Card elevation={3} square className="Card">
            <div className="CardHeader BorderBox CenterVertical">
                <div className="LeftAlign">
                    <Typography variant="h6">
                        {props.flipped ? "Back" : "Front"}
                    </Typography>
                </div>
                <div className="CenterAlign">
                    <Typography variant="h6">
                        {props.number + " of " + props.count}
                    </Typography>
                </div>
                <div className="RightAlign"/>
            </div>
            <div className="CardContent">
                <div>{ReactHtmlParser(props.content)}</div>
            </div>
            <div className="CardTools CenterVertical BorderBox">
                <span className="AutoWidth LeftAlign">
                    <Button
                        onClick={props.onDuplicate}
                        size="large"
                        startIcon={<Icon.FilterNone />}
                        disabled={props.flaggedOnly}
                    >
                        Duplicate
                    </Button>
                </span>
                <span className="AutoWidth CenterAlign">
                    <Button
                        className={props.flagged ? "FlagButtonActive" : ""}
                        variant={props.flagged ? "contained" : "text"}
                        startIcon={<Icon.Flag color="inherit" />}
                        onClick={handleFlagToggle}
                        size="large"
                        disableElevation
                    >
                        {props.flagged ? "Flagged" : "Flag"}
                    </Button>
                </span>
                <div className="FlexGap RightAlign">
                    <Button
                        onClick={props.onFlip}
                        startIcon={<Icon.Refresh />}
                        size="large"
                    >
                        Flip
                    </Button>
                </div>
            </div>
        </Card>
    );
}
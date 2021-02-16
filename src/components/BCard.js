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
                <div className="EvenFlex LeftAlign">
                    <span>
                        <Typography variant="subtitle1" className="GrayText">
                            {props.flipped ? "BACK" : "FRONT"}
                        </Typography>
                    </span>
                </div>
                <div className="EvenFlex CenterAlign">
                    <span>
                        <Typography variant="h6">
                            {props.number + " of " + props.count}
                        </Typography>
                    </span>
                </div>
                <div className="EvenFlex RightAlign">
                    <span>
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
                </div>
            </div>
            <div className="CardContent">
                <div>{ReactHtmlParser(props.content)}</div>
            </div>
            <div style={{
                borderTop: "1px solid #ddd",
                padding: "20px 40px",
                textAlign: "center"
            }}>
                <Button
                    onClick={props.onFlip}
                    startIcon={<Icon.Refresh />}
                    size="large"
                >
                    Flip
                    </Button>
            </div>
        </Card>
    );
}
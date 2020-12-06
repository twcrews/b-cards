import React from 'react';
import Card from '@material-ui/core/Card';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Typography } from '@material-ui/core';
import * as Icon from '@material-ui/icons';

export default function BCard(props) {
    const handleEditorChange = (content, _editor) => {
        if (content !== "" && content !== props.content) {
            props.onEditorChange(content);
        }
    };
    const handleFlagToggle = () => { props.onFlag(); }

    return (
        <Card elevation={3} square className="Card">
            <div className="CardHeader BorderBox CenterVertical ThreeColumn">
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
                <div className="RightAlign">
                    <Button
                        className="AutoWidth"
                        color="inherit"
                        startIcon={<Icon.Add />}
                        size="large"
                        onClick={props.onAddCard}
                    >
                        Add Card
                    </Button>
                </div>
            </div>
            <div className="CardContent">
                <div>
                    <Editor
                        id={props.id}
                        inline
                        onEditorChange={handleEditorChange}
                        onKeyUp={(event) => event.preventDefault()}
                        value={props.content}
                        init={{
                            menubar: false,
                            toolbar: 'undo redo | fontsizeselect | bold italic backcolor | ' +
                                'alignleft aligncenter alignright alignjustify | ' +
                                'bullist numlist outdent indent | removeformat',
                            content_style: 'body { font-family: Roboto; font-size: 1.5em; text-align: center}'
                        }}
                    />
                </div>
            </div>
            <div className="CardTools ThreeColumn CenterVertical BorderBox">
                <span className="AutoWidth LeftAlign">
                    <Button
                        onClick={props.onDuplicate}
                        size="large"
                        startIcon={<Icon.FilterNone />}
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
                        disabled={props.flagLock}
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
                    <Button
                        onClick={props.onDelete}
                        startIcon={<Icon.Delete />}
                        size="large"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Card>
    );
}
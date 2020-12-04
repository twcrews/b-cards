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

    return (
        <Card elevation={3} square className="Card">
            <div className="CardHeader">
                <Typography variant="h6">
                    {props.flipped ? "Back" : "Front"}
                </Typography>
                <Typography variant="h6">
                    {props.number + " of " + props.count}
                </Typography>
                <Button
                    color="inherit"
                    startIcon={<Icon.Add/>}
                    size="large"
                    onClick={props.onAddCard}
                >
                    Add Card
                </Button>
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
            <div className="CardTools">
                <div className="ButtonContainer">
                    <Button
                        onClick={props.onDuplicate}
                        size="large"
                    >
                        Duplicate
                    </Button>
                </div>
                <Button 
                    onClick={props.onFlip}
                    startIcon={ <Icon.Refresh /> }
                    size="large"
                >
                    Flip
                </Button>
                <Button 
                    onClick={props.onDelete}
                    startIcon={ <Icon.Delete /> }
                    size="large"
                >
                    Delete
                </Button>
            </div>
        </Card>
    );
}
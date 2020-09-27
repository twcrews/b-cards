import React from 'react';
import Card from '@material-ui/core/Card';
import { Editor } from '@tinymce/tinymce-react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

export default function BCard(props) {

    return (
        <Card elevation={3} square className="Card">
            <div className="CardHeader">
                <Typography variant="h6">
                    {props.flipped ? "Back" : "Front"}
                </Typography>
                <Typography variant="h6">
                    {props.number + " of " + props.count}
                </Typography>
            </div>
            <div className="CardContent">
                <div>
                    <Editor
                        id={props.id}
                        inline
                        onEditorChange={props.onChange}
                        value={props.children}
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
                <IconButton onClick={props.onFlip}>
                    <RefreshIcon
                        fontSize="large"
                    />
                </IconButton>
                <IconButton onClick={props.onDelete}>
                    <DeleteIcon
                        fontSize="large"
                    />
                </IconButton>
            </div>
        </Card>
    );
}
import { Editor } from '@tinymce/tinymce-react';
import * as Material from '@material-ui/core';
import React from 'react';

export function CardEdit(props) {
    const handleEditorChange = (content, _editor, side) => {
        if (content !== "" && content !== props.content) {
            props.onChange(content, side);
        }
    };
    return (
        <div className="EditCardContainer">
            <div className="EditCardFlex">
                {["front", "back"].map(side =>
                    <Material.Card
                        key={side}
                        square
                        elevation={3}
                        className="EditCard"
                    >
                        <Material.Typography 
                            style={{ color: "#888" }}
                            variant="caption"
                        >
                            {side.toUpperCase()}
                        </Material.Typography>
                        <div className="EditCardContent">
                        <Editor
                            id={props.card.id + "-" + side}
                            inline
                            onEditorChange={(content, editor) => handleEditorChange(content, editor, side)}
                            onKeyDown={(event) => event.stopPropagation()}
                            onKeyUp={(event) => event.preventDefault()}
                            value={props.card[side]}
                            init={{
                                menubar: false,
                                toolbar: 'undo redo | fontsizeselect | bold italic backcolor | ' +
                                    'alignleft aligncenter alignright alignjustify | ' +
                                    'bullist numlist outdent indent | removeformat',
                                content_style: 'body { font-family: Roboto; font-size: 1.5em; text-align: center}'
                            }}
                        />
                        </div>
                    </Material.Card>
                )}
            </div>
            <div className="EditControls">
                
            </div>
        </div>
    );
}
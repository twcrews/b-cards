import { Editor } from '@tinymce/tinymce-react';
import * as Material from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';

export function CardEdit(props) {
    const [focused, setFocused] = useState(null);

    const handleFocusOut = (event) => { 
        if (event.target.id === props.card.id) {
            setFocused(null); 
        }
    };
    const handleFocusSide = (side) => { setFocused(side); };
    const handleDummyFocus = () => { setFocused("front"); }
    const handleButtonsFocus = () => { setFocused(null); };
    const handleEditorChange = (content, _editor, side) => {
        if (content !== "" && content !== props.content) {
            props.onChange(content, side);
        }
    };
    const handleFlag = () => { props.onFlag(props.card.id); };
    const handleClear = () => {
        props.onChange("", "front");
        props.onChange("", "back");
    }
    const handleDelete = () => { props.onDelete(props.card.id); };

    useEffect(() => {
        if (focused) {
            try {
            document.getElementById(props.card.id + "-" + focused)
                .focus();
            } catch (e) {}
        }
    }, [focused]);

    useEffect(() => {
        setFocused(null);
    }, []);

    return (
        <div 
           className="EditCardContainer"
           onBlur={handleFocusOut}
        >
            <div id={props.card.id} className="EditCardFlex">
                <input 
                    id={props.card.id + "-dummy"} 
                    style={{position: 'absolute', opacity: 0}} 
                    onFocus={handleDummyFocus}
                />
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
                        <div 
                            className="EditCardContent"
                            onClick={() => handleFocusSide(side)}
                        >
                            {focused ?
                                <Editor
                                    style={{ textAlign: "center" }}
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
                                        content_style: 'body { font-family: Roboto; font-size: 18pt; text-align: center}'
                                    }}
                                /> :
                                <div>
                                    {ReactHtmlParser(props.card[side] || '<p style="color: #888;">No content</p>')}
                                </div>
                            }
                        </div>
                    </Material.Card>
                )}
            </div>
            <div 
                className="EditControls"
                onFocus={handleButtonsFocus}
            >
                <Material.IconButton
                    onClick={handleFlag}
                    className={props.card.flagged ? "FlagButtonActive" : null}
                >
                    <Icon.Flag />
                </Material.IconButton>
                <Material.IconButton
                    onClick={handleClear}
                >
                    <Icon.Backspace />
                </Material.IconButton>
                <Material.IconButton
                    onClick={handleDelete}
                >
                    <Icon.Delete />
                </Material.IconButton>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import * as Material from '@material-ui/core';
import * as Icon from '@material-ui/icons';

export function CardEdit(props) {
    const [focused, setFocused] = useState(null);

    const handleEditorChange = (content, _editor, side) => {
        props.onChange(content, side);
    };
    const handleFlag = () => { props.onFlag(props.card.id); };
    const handleClear = () => {
        props.onChange("", "front");
        props.onChange("", "back");
    }
    const handleDelete = () => { props.onDelete(props.card.id); };
    const handleFocus = (side) => { setFocused(side); };
    const handleBlur = (side) => {
        if (focused === side) {
            setFocused(null);
        }
    };
    const handleSwap = () => {
        let tmpVal = props.card["front"];
        props.onChange(props.card["back"], "front");
        props.onChange(tmpVal, "back");
    }

    useEffect(() => {
        if (focused) {
            document.getElementById(props.card.id + "-" + focused).focus();
        }
    }, [focused, props.card.id]);

    return (
        <div className="EditCardContainer">
            <div id={props.card.id} className="EditCardFlex">
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
                            onClick={() => handleFocus(side)}
                        >
                            {focused !== side && (!props.card[side] || props.card[side] === "") ?
                                <Material.Typography
                                    variant="h5"
                                    className="CenterAbsolute GrayText"
                                >
                                    No content
                                </Material.Typography> :
                                null}
                            <Editor
                                style={{ textAlign: "center" }}
                                id={props.card.id + "-" + side}
                                inline
                                onEditorChange={(content, editor) => handleEditorChange(content, editor, side)}
                                onKeyDown={(event) => event.stopPropagation()}
                                onKeyUp={(event) => event.preventDefault()}
                                onFocus={() => handleFocus(side)}
                                onBlur={() => handleBlur(side)}
                                value={props.card[side]}
                                init={{
                                    menubar: false,
                                    toolbar: 'undo redo | fontsizeselect | bold italic backcolor | ' +
                                        'alignleft aligncenter alignright alignjustify | ' +
                                        'bullist numlist outdent indent | removeformat',
                                    content_style: 'body { font-family: Roboto; font-size: 18pt; text-align: center}'
                                }}
                            />
                        </div>
                    </Material.Card>
                )}
            </div>
            <div className="EditControls">
                <Material.Tooltip title="Flag card">
                    <Material.IconButton
                        onClick={handleFlag}
                        className={props.card.flagged ? "FlagButtonActive" : null}
                    >
                        <Icon.Flag />
                    </Material.IconButton>
                </Material.Tooltip>
                <Material.Tooltip title="Swap content">
                    <Material.IconButton
                        onClick={handleSwap}
                    >
                        <Icon.SwapHoriz />
                    </Material.IconButton>
                </Material.Tooltip>
                <Material.Tooltip title="Clear content">
                    <Material.IconButton
                        onClick={handleClear}
                    >
                        <Icon.Backspace />
                    </Material.IconButton>
                </Material.Tooltip>
                <Material.Tooltip title="Delete card">
                    <Material.IconButton
                        onClick={handleDelete}
                    >
                        <Icon.Delete />
                    </Material.IconButton>
                </Material.Tooltip> 
            </div>
        </div>
    );
}
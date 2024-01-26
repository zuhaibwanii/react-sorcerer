import React, { useContext, useEffect, useState, useRef } from 'react'
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw
} from 'draft-js';


//mui
import { Box } from '@mui/material'

//components
import CustomButton from '../custom/button'
import Title from '../custom/title'

//constants
import { TOAST_SEVERITY } from '../../constants'

//styles
import useStyles from './index.styles'

//global-context
import { GlobalStates } from '../../App'

const ReactSocrerer = () => {
    const classes = useStyles();
    const { globalStates } = useContext(GlobalStates);

    const editorRef = useRef(null);

    const focusEditor = () => {
        editorRef.current.focus();
    }

    useEffect(() => {
        focusEditor()
    }, []);

    const [editorState, setEditorState] = useState(() => {
        const savedContent = localStorage.getItem('editorContent');
        if (savedContent) {
            return EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)));
        }
        return EditorState.createEmpty();
    });

    const [prevKeyCodes, setPrevKeyCodes] = useState([]);

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const handleChange = (editorState) => {
        setEditorState(editorState);
    };


    const handleBeforeInput = (chars) => {
        const charCode = chars.charCodeAt(0);
        const currentContent = editorState.getCurrentContent();
        const selection = editorState.getSelection();
        const startKey = selection.getStartKey();
        const startOffset = selection.getStartOffset();
        const block = currentContent.getBlockForKey(startKey);
        // const text = block.getText();

        setPrevKeyCodes([...prevKeyCodes, charCode])

        //ASCII VALUE FOR SPACE = 32
        //ASCII VALUE FOR # = 35
        //ASCII VALUE FOR * = 42

        if (startOffset === 0 && charCode === 35) return 'handled';
        if (startOffset === 0 && charCode === 42) return 'handled';

        // Typing # as the first string in a line & pressing space should make anything you type afterwards on the same line be in a “Heading” format.
        if (charCode === 32 && startOffset === 0 && prevKeyCodes.at(-1) === 35) {
            setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
            return 'handled';
        }

        // On pressing space the aforementioned # should disappear. 
        if (prevKeyCodes.at(-1) === 32 && chars === '#') {
            setEditorState(RichUtils.toggleBlockType(editorState, 'unstyled'));
            return 'handled';
        }

        //*** and space = underline
        if (charCode === 32 && startOffset === 0 && prevKeyCodes.at(-1) === 42 && prevKeyCodes.at(-2) === 42 && prevKeyCodes.at(-3) === 42) {
            setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
            return 'handled';
        }

        //** and space = red-line - assuming red-line = STRIKETHROUGH with text color as red
        if (charCode === 32 && startOffset === 0 && prevKeyCodes.at(-1) === 42 && prevKeyCodes.at(-2) === 42) {
            setEditorState(RichUtils.toggleInlineStyle(editorState, 'RED-LINE'));
            return 'handled';
        }

        // Similarly, typing * as the first string in a line and pressing space should correspond to “bold” format
        if (charCode === 32 && startOffset === 0 && prevKeyCodes.at(-1) === 42) {
            setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
            return 'handled';
        }

        return 'not-handled';
    };

    const handleSave = () => {
        localStorage.setItem('editorContent', JSON.stringify(convertToRaw(editorState.getCurrentContent())));
        const toast = {
            open: true,
            severity: TOAST_SEVERITY.success,
            message: 'Saved successfully!'
        }
        globalStates.handleToast(toast);
    }

    const styleMap = {
        'RED-LINE': {
            color: 'red',
            textDecoration: 'line-through',
        },
    };


    return (
        <Box
            className={classes.main}
            sx={{
                minHeight: `100vh`,
            }}>
            <div className={classes.header}>
                <Title titleText={'Demo editor by Zuhaib wani'} fs='1.5rem' padding='0.5rem 2rem' />
                <span>
                    <CustomButton btnText='Save' handleClick={handleSave} />
                </span>
            </div>
            <div className={classes.editorWrapper}>
                <Editor
                    ref={editorRef}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={handleChange}
                    handleBeforeInput={handleBeforeInput}
                    customStyleMap={styleMap}
                />
            </div>
        </Box>
    )
}

export default ReactSocrerer;
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    main: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 8rem',
        position: 'relative',
        gap: '1rem'
    },
    header: {
        position: 'relative',
        height: '3rem',
        '& > span': {
            position: 'absolute',
            right: 0,
            top: '0.2rem',
            display: 'flex',
            gap: '1.5rem',
        }

    },
    editorWrapper:{
        border: '1px solid',
        '& .public-DraftEditor-content':{
            minHeight: 'calc(100vh - 6.1rem)',

        }
    }
   
}));

export default useStyles;
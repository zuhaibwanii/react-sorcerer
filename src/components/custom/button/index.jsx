import React from 'react'

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const CustomButton = ({
    type = 'submit',
    variant = 'outlined',
    textColor = '#000',
    borderColor = '#000',
    bgcolor = '#fff',
    width = '8rem',
    height = '2.5rem',
    fs = "0.8rem",
    fw = 800,
    ls = 0,
    btnText = '',
    handleClick,
    disabled = false,
    alignSelf = 'center',
    margin = 0,
    loading = false,
    padding = '6px 16px'
}) => {
    return (
        <>
            {
                loading ?
                    <Button
                        variant={'outlined'}
                        disabled={disabled}
                        sx={{
                            width,
                            height,
                            color: textColor,
                            border: `2px solid #6e6e6e`,
                            bgcolor: '#6e6e6e',
                            fontSize: fs,
                            cursor: "pointer",
                            alignSelf,
                            padding,
                            margin,
                            ':hover': {
                                cursor: 'not-allowed',
                                bgcolor: '#6e6e6e',
                                color: textColor,
                            },
                            '& .MuiCircularProgress-root': {
                                width: '1.2rem !important',
                                height: '1.2rem !important'
                            }
                        }}>
                        <CircularProgress color="inherit" />
                    </Button> :
                    <Button
                        type={type}
                        variant={variant}
                        onClick={handleClick}
                        disabled={disabled}
                        sx={{
                            width,
                            height,
                            color: textColor,
                            border: `2px solid ${borderColor}`,
                            bgcolor,
                            fontFamily: "Montserrat",
                            fontSize: fs,
                            fontWeight: fw,
                            letterSpacing: ls,
                            cursor: "pointer",
                            alignSelf,
                            margin,
                            padding,
                            ':hover': {
                                border: `2px solid ${borderColor}`,
                                bgcolor: bgcolor,
                                color: textColor,
                                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px'
                            },
                            ':disabled': {
                                backgroundColor: '#cccccc', /* Grey */
                                color: '#666666', /* Dark grey */
                                cursor: 'not-allowed',
                                borderColor: '#cccccc',
                            }
                        }}>
                        {btnText}
                    </Button>
            }


        </>
    )
}

export default CustomButton;




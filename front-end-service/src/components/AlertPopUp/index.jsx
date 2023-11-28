import { Alert } from '@mui/material'
import React, { useEffect } from 'react'

const AlertPopUp = ({ show, severity, message, setShow }) => {

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setShow(false);
    }, 3000)

    return () => {
      clearTimeout(timeOut)
    }
  }, [show]);

  return (
    <div>
      {
        show && <Alert severity={severity}> {message} </Alert>
      }
    </div>
  )
}

export default AlertPopUp
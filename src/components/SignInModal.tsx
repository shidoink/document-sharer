import React from 'react'
import Modal from '@mui/material/modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {useState} from 'react'

const SignInModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen=()=>{
        setIsOpen(true)
    }
    const handleClose=()=>{
        setIsOpen(false)
    }


  return (
    <div>
        <Button onClick={handleOpen}>Open modal</Button>
<Modal
  open={isOpen}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{
        position: 'fixed',
        top: 1/2,
        left: 50,
        width: 300,
        height: 300,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Text in a modal
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
  </Box>
</Modal>
      
    </div>
  )
}

export default SignInModal


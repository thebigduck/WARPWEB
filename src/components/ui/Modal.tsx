import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton
  // Box, // Removed unused Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        className: 'bg-[#2D6A4F] text-[#D8F3DC] border border-[#1B4332] shadow-2xl',
        sx: {
          maxWidth: '448px',
          width: '100%',
          borderRadius: '8px',
        }
      }}
      sx={{ zIndex: 100 }}
    >
      <DialogTitle 
        className="text-xl font-bold text-[#74C69D]"
        sx={{ pb: 1, pt: 3, px:3  }}
      >
        {title || "Notification"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: '#D8F3DC',
            '&:hover': {
              color: '#95D5B2',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{px:3}}>
        <DialogContentText className="text-[#D8F3DC]/90 leading-relaxed">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{p:3, pt:1}}>
        <Button
          onClick={onClose}
          variant="contained"
          fullWidth
          className="bg-[#74C69D] hover:bg-[#95D5B2] text-[#081C15] font-bold shadow-md hover:shadow-[#74C69D]/40"
          sx={{
            py: 1.25, 
            textTransform: 'none',
            '&.MuiButton-contained': { 
                backgroundColor: '#74C69D',
                color: '#081C15',
            },
            '&:hover': {
                backgroundColor: '#95D5B2',
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;

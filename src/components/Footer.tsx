import React from 'react';
import {
  Box,
  Container,
  Typography
} from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      className="bg-[#1B4332] border-t border-[#2D6A4F]/50 mt-16" // Tailwind classes from refactor.tsx
    >
      <Container maxWidth="lg" className="py-10 text-center text-[#D8F3DC]/70"> {/* Tailwind classes */}
        <Typography variant="body2" component="p">
          &copy; {new Date().getFullYear()} Unreal FPS Systems. All rights reserved.
        </Typography>
        <Typography variant="caption" component="p" className="text-sm mt-1">
          Advanced Gameplay Solutions for Unreal Engine.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

const PriceAccordion = ({ title, price, children }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<span>+</span>} aria-controls="panel1a-content" id="panel1a-header">
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h6" style={{ marginLeft: 'auto' }}>${price}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default PriceAccordion;
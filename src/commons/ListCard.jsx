import React from 'react';
import { Card, Grid, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ListCard({ data, columns, columnMappings, buttonLabel, onButtonClick, buttonIcon, buttonType, dropdownOptions }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const columnWidth = Math.floor(12 / columns.length);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ my: 4, py: 5, px: 8 }} elevation={3}>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        {columns.map((column, index) => (
          <Grid item xs={columnWidth-1} key={index}>
            <Typography variant="body2">{column}</Typography>            
            <Typography>
              {data[columnMappings[column]] || 'No informado'}
            </Typography>
          </Grid>
        ))}
        <Grid item xs={1}>
          {buttonType === 'dropdown' ? (
            <>
              <Button variant="contained" onClick={handleClick} startIcon={<MoreVertIcon />}>
                  {buttonLabel}
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {dropdownOptions(data).map((option, index) => (
                  <MenuItem 
                    key={index} 
                    onClick={() => { option.action(); handleClose(); }} 
                    sx={option.style}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {option.icon}
                      <Typography variant="inherit">{option.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Button variant="contained" onClick={() => onButtonClick(data)} startIcon={buttonIcon}>
              {buttonLabel}
            </Button>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}

export default ListCard;



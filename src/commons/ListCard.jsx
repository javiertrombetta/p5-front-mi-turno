import React from 'react';
import { Card, Grid, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ListCard({ data, columns, columnMappings, buttonLabel, onButtonClick, buttonIcon, buttonType, dropdownOptions }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ m: 6, p: 7 }} elevation={3}>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        {columns.map((column, index) => (
          <Grid item xs={12} sm={2} key={index}>
            <Typography variant="body2" noWrap>{column}</Typography>
            <Typography noWrap>
              {data[columnMappings[column]] || 'No informado'}
            </Typography>
          </Grid>
        ))}
        <Grid item xs={12} sm={'auto'}>
          {buttonType === 'dropdown' ? (
            <>
              <Button variant="contained" onClick={handleClick} startIcon={<MoreVertIcon />}>
                {buttonLabel}
              </Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {dropdownOptions(data).map((option, index) => (
                  <MenuItem key={index} onClick={() => { option.action(); handleClose(); }} sx={option.style}>
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



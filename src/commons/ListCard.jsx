import { Card, Grid, Typography, Checkbox } from '@mui/material';

function ListCard({ data, columns, columnMappings, onRowClick, isSelected, onCheckboxChange, showCheckbox = true }) {
  const handleClickCheckbox = (event) => {
    event.stopPropagation();
    onCheckboxChange && onCheckboxChange();
  };

  const handleClickCard = () => {
    onRowClick && onRowClick();
  };

  const renderData = (key) => {
    const value = data[columnMappings[key]];
    if (value === null || value === undefined) {
      return 'N/A';
    } else if (typeof value === 'object') {     
      return JSON.stringify(value);
    } else {
      return value.toString();
    }
  };

  return (
    <Card 
      sx={{ m: 6, p: 7, transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", cursor: 'pointer', "&:hover": { transform: "scale(1.05)", boxShadow: 10 } }} 
      onClick={handleClickCard}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        {showCheckbox && (
          <Grid item xs={1}>
            <Checkbox
              checked={isSelected}
              onChange={handleClickCheckbox}
              onClick={(e) => e.stopPropagation()}
              sx={{ transform: "scale(1.5)" }}
            />
          </Grid>
        )}
        {columns.map((column, index) => (
          <Grid item xs={12} sm={showCheckbox ? 2 : Math.floor(12 / columns.length)} key={index}>
            <Typography variant="body2" noWrap>{column}</Typography>
            <Typography noWrap>
              {renderData(column)}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}

export default ListCard;
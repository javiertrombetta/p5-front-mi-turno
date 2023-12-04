import React, { useState } from 'react';
import { Box, Pagination, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ListCard from '@/commons/ListCard';

function Lists({ data, columns, columnMappings, onRowClick, selectedUsers, onCheckboxChange, showCheckboxAndControls }) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const paginatedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleItemClick = (item) => {
    console.log('Item clicked:', item);
    const identifier = item.dni || item.id;
    if (onRowClick && identifier) {
      onRowClick(identifier);
    }
  };
  const isItemSelected = (item) => {
    const identifier = item.dni || item.id;
    return selectedUsers ? selectedUsers.includes(identifier) : false;
  };
  return (
    <Box>
      {paginatedData.map((item) => (
       <ListCard
          key={item.dni || item.id}
          data={item}
          columns={columns}
          columnMappings={columnMappings}
          onRowClick={() => handleItemClick(item)}
          isSelected={isItemSelected(item)}
          onCheckboxChange={showCheckboxAndControls ? () => onCheckboxChange(item.dni || item.id) : undefined}
          showCheckbox={showCheckboxAndControls}
        />
      ))}

      {data.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Pagination 
            count={Math.ceil(data.length / rowsPerPage)} 
            page={page} 
            onChange={handleChangePage} 
          />

          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Por página</InputLabel>
            <Select
              label="Por página"
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
            >
              {[5, 10, 15, 20].map((number) => (
                <MenuItem key={number} value={number}>
                  {number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
}

export default Lists;

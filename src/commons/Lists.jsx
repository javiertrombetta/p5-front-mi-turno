import React from 'react';
import { Box } from '@mui/material';
import ListCard from '@/commons/ListCard';

function Lists({ data, columns, columnMappings, buttonLabel, onButtonClick, buttonIcon, buttonType, dropdownOptions }) {
  return (
    <Box>
      {data.map((item) => (
        <ListCard
          key={item.id}
          data={item}
          columns={columns}
          columnMappings={columnMappings}
          buttonLabel={buttonLabel} 
          onButtonClick={onButtonClick}
          buttonIcon={buttonIcon}
          buttonType={buttonType}
          dropdownOptions={dropdownOptions}
        />
      ))}
    </Box>
  );
}

export default Lists;

import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getMetricsData } from '@/services/dataMetrics';

const CardPeakTimes = ({ metrics, selectedBranchId, selectedDate }) => {
  const [peakTime, setPeakTime] = useState(null);

  useEffect(() => {
    const fetchMetricsData = async () => {
      try {
        if (selectedBranchId && metrics?.peakTimes?.[selectedBranchId]) {
          setPeakTime(metrics.peakTimes[selectedBranchId]);
        } else if (selectedBranchId && selectedDate) {
          const metricsData = await getMetricsData(selectedBranchId, selectedDate);
          setPeakTime(metricsData?.peakTimes?.[selectedBranchId] ?? null);
        }
      } catch (error) {
        console.error('Error al obtener métricas: ', error);
      }
    };

    fetchMetricsData();
  }, [selectedBranchId, selectedDate, metrics]);

  const formattedPeakTime = peakTime !== null ? `${peakTime} hs.` : 'N/A';

  return (
    <Card
      style={{
        borderRadius: '15px',
        borderBottom: '30px solid #9421C3',
      }}
      sx={{ backgroundColor: '#CC6AFF' }}
    >
      <CardContent style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1, color: 'white' }}>
          <Typography variant='h3' component='div'>
            {formattedPeakTime}
          </Typography>
          <Typography
            variant='h6'
            component='p'
            style={{ color: 'white', fontSize: '1rem' }}
          >
            Hora pico de asistencia
          </Typography>
        </div>
        <div>
          <IconButton
            style={{
              fontSize: '4rem',
              border: 'none',
            }}
            sx={{ color: 'primary.main' }}
          >
            <AccessTimeIcon style={{ fontSize: '4rem' }} />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPeakTimes;


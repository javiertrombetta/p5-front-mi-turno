import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/material';

const Loader = () => {
  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export default Loader;

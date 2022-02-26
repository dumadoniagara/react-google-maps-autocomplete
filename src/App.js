import { withScriptjs, withGoogleMap } from 'react-google-maps';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Map from './components/Map';
import SearchBox from './components/Searchbox';
import Location from './components/Location';

function App() {

  const MapLayout = () => {
    return (
      <Box sx={{ bgcolor: '#f35c27', height: '100vh', p: 2 }}>
        <Typography variant="h3" color="#eaeaea" sx={{ textAlign: 'center' }} >
          Google Place Autocomplete
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
          <Box
            sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ marginRight: 5 }}>
              <SearchBox />
              <Location />
            </Box>
            <Box sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Map
                containerElement={<div style={{ height: '500px', width: '700px' }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }

  const MapLoader = withScriptjs(withGoogleMap(MapLayout));

  return (
    <MapLoader
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}

export default App;

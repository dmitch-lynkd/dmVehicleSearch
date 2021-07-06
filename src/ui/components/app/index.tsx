import React from 'react';
import VehicleSearch from '../vehicle-search/vehicle-search';
import VehicleSearchProvider from '../../../ui/VehicleSearchContext';

document.title = 'Vehicle Search';

const App: React.FC = () => {

  return (
    <>
      <VehicleSearchProvider>
        <VehicleSearch />
      </VehicleSearchProvider>
    </>
  );
};

export default App;
import React, {
  useContext,
  useEffect,
} from 'react';
import axios from 'axios';
import { Vehicle } from './models/vehicle';
import useVehicleActions from './actions';

type ContextType = ReturnType<(typeof useVehicleActions)>;
const VehicleSearchContext = React.createContext<Partial<ContextType>>({});

export const useVehicleSearchContext = () => {
  return useContext(VehicleSearchContext);
}

const VehicleSearchProvider: React.FC = ({ children }) => {
  const state = useVehicleActions();

  const getVehicles = () => {
    //axios.get('https://api.fake.rest/b5582d3c-9e60-4ffb-b977-c330e1860916/GetVehicles')
    axios.get('https://localhost:5001/vehicle')
      .then((resp) => {
        state.setVehiclesFetched(resp.data as Vehicle[]);
      })
      .catch((err) => {
        state.setVehicleFetchedError(err.response.data);
        console.log('Error', err)
      });
  }

  useEffect(() => {
    getVehicles();
  }, [,state.VehiclesState.pageSize]);

  return (
    <VehicleSearchContext.Provider value={state}>
      {children}
    </VehicleSearchContext.Provider>
  );
};

export default VehicleSearchProvider;
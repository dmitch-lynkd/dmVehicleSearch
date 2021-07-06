import { useReducer } from 'react';
import { Vehicle } from './models/vehicle';
import VehicleSearch, {
  initialVehicleSearchState,
  VehicleSearchActionTypes,
  VehicleSearchState
} from './reducer';

const useVehicleActions = () => {
  const [VehiclesState, dispatch] = useReducer(VehicleSearch, initialVehicleSearchState);

  const bindAction = (type: VehicleSearchActionTypes, payload: Partial<VehicleSearchState>) => {
    dispatch({
      type: VehicleSearchActionTypes[type],
      payload,
    });
  };

  const setVehiclesFetched = (vehicles: Vehicle[]) => {
    bindAction(VehicleSearchActionTypes.VEHICLES_FETCHED, {
      isError: false,
      vehicles,
    });
  };

  const setVehicleFetchedError = (error: any) => {
    bindAction(VehicleSearchActionTypes.VEHICLE_FETCH_ERROR, {
      isError: true,
      error,
    });
  };

  const setPageSize = (pageSize: number) => {
    bindAction(VehicleSearchActionTypes.SET_PAGE_SIZE, {
      pageSize,
    });
  }

  return {
    VehiclesState,
    setVehiclesFetched,
    setVehicleFetchedError,
    setPageSize,
  }
};

export default useVehicleActions;
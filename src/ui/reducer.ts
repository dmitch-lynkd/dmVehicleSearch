import { Vehicle } from './models/vehicle';
import { DEFAULT_PAGE_SIZE } from '../ui/constants/constants';

export const initialVehicleSearchState = {
  vehicles: [] as Vehicle[],
  isError: false,
  error: {},
  pageSize: DEFAULT_PAGE_SIZE,
};

export type VehicleSearchState = typeof initialVehicleSearchState;

export enum VehicleSearchActionTypes {
  VEHICLES_FETCHED = "VEHICLES_FETCHED",
  VEHICLE_FETCH_ERROR = "VEHICLE_FETCH_ERROR",
  SET_PAGE_SIZE = "SET_PAGE_SIZE",
};

export type VehicleSearchAction = {
  type: keyof typeof VehicleSearchActionTypes;
  payload: Partial<VehicleSearchState>;
}

//define reducer
const VehicleSearch = (
  state: VehicleSearchState = initialVehicleSearchState,
  action: VehicleSearchAction
) => {
  const type = VehicleSearchActionTypes[action.type] as VehicleSearchActionTypes;

  if (type !== undefined){
    switch (action.type) {
      default:
        return action.payload ?
        {
          ...state,
          ...action.payload,
        } : state;
    }
  } else {
    return state;
  }
};

export default VehicleSearch;
import React, { useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Vehicle } from '../../models/vehicle';
import DataGrid, { DataGridColumn } from '../data-grid/data-grid';
import { useVehicleSearchContext } from '../../../ui/VehicleSearchContext';
import logo from '../../assets/img/logo-brand-stacked.svg';

const VehicleSearch = () => {
  const state = useVehicleSearchContext();
  const columns: DataGridColumn[] = useMemo(
    () =>
    [
      {
        name: 'vin',
        text: 'VIN'
      },
      {
        name: 'year',
        text: 'YEAR'
      },
      {
        name: 'make',
        text: 'MAKE'
      },
      {
        name: 'model',
        text: 'MODEL'
      },
      {
        name: 'trim',
        text: 'TRIM'
      }
    ],
    []
  );

  return (
    <div style={{ margin: '10px' }}>
      <Row>
        <Col>
          <div style={{ display: 'inline-block', float: 'left' }}>
            <img src={logo} style={{ height: '40px' }} />
          </div>
          <div>
            <h4>Vehicle Search</h4>
          </div>
        </Col>
      </Row>
      <Row className="pt-4">
        <Col>
          <DataGrid
            items={state.VehiclesState?.vehicles as Vehicle[]}
            columns={columns}
          />
        </Col>
      </Row>
    </div>
  );
};

export default VehicleSearch;
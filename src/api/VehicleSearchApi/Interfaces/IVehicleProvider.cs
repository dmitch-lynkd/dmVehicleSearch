using System.Collections.Generic;
using VehicleSearchApi.Models;

namespace VehicleSearchApi.Interfaces
{
    public interface IVehicleProvider
    {
        IEnumerable<Vehicle> Get();
    }
}

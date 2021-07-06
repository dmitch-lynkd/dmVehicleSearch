using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using VehicleSearchApi.Interfaces;
using VehicleSearchApi.Models;

namespace VehicleSearchApi.Providers
{
    public class VehicleProvider : IVehicleProvider
    {
        private readonly string _rawData;
        private readonly List<Vehicle> _data;

        public VehicleProvider(string rawDataPath)
        {
            try
            {
                _rawData = File.ReadAllText(rawDataPath);
                _data = JsonConvert.DeserializeObject<List<Vehicle>>(_rawData);
            }
            catch (Exception)
            {

            }
        }

        public IEnumerable<Vehicle> Get()
        {
            return _data;
        }
    }
}

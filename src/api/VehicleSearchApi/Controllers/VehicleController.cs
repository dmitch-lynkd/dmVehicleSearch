using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VehicleSearchApi.Interfaces;

namespace VehicleSearchApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleController : ControllerBase
    {
        private readonly ILogger<VehicleController> _logger;
        private readonly IVehicleProvider _vehicleProvider;

        public VehicleController(ILogger<VehicleController> logger, IVehicleProvider vehicleProvider)
        {
            _logger = logger;
            _vehicleProvider = vehicleProvider;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_vehicleProvider.Get());
        }
    }
}

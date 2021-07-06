using Newtonsoft.Json;

namespace VehicleSearchApi.Models
{
    public class Vehicle
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("make")]
        public string Make { get; set; }

        [JsonProperty("model")]
        public string Model { get; set; }

        [JsonProperty("year")]
        public string Year { get; set; }

        [JsonProperty("vin")]
        public string Vin { get; set; }

        [JsonProperty("trim")]
        public string Trim { get; set; }
    }
}

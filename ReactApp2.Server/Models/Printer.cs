namespace ReactApp2.Server.Models
{
    public class Printer
    {
        public int PrinterAutoId { get; set; }
        public required string  PrinterName { get; set; }
        public required string Model { get; set; }
        public required string IPAddress { get; set; }
        public int Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}

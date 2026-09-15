using ReactApp2.Server.Models;
using System.Reflection;

namespace ReactApp2.Server.Repository
{
    public interface IPrinterRepository
    {
        Task<IEnumerable<Printer>> GetPrintersAsync();

        Task<Printer?> GetPrinterByIdAsync(int printerAutoId);

        Task<Printer?> CreatePrinterAsync(Printer printer);

        Task<Printer?> UpdatePrinterAsync(Printer printer);

        Task<bool> DeletePrinterAsync(int printerAutoId);
    }
}

using Dapper;
using ReactApp2.Server.Models;
using System.Data;

namespace ReactApp2.Server.Repository
{
    public class PrinterRepository : IPrinterRepository
    {
        private readonly IDbConnection _connection;

        public PrinterRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<Printer>> GetPrintersAsync()
        {
            return await _connection.QueryAsync<Printer>(
                "sp_PrinterMaster",
                new
                {
                    Opcode = 1
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<Printer?> GetPrinterByIdAsync(int printerAutoId)
        {
            return await _connection.QueryFirstOrDefaultAsync<Printer>(
                "sp_PrinterMaster",
                new
                {
                    Opcode = 5,
                    PrinterAutoId = printerAutoId
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<Printer?> CreatePrinterAsync(Printer printer)
        {
            return await _connection.QueryFirstOrDefaultAsync<Printer>(
                "sp_PrinterMaster",
                new
                {
                    Opcode = 2,
                    PrinterName = printer.PrinterName,
                    Model = printer.Model,
                    IPAddress = printer.IPAddress,
                    Status = printer.Status
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<Printer?> UpdatePrinterAsync(Printer printer)
        {
            return await _connection.QueryFirstOrDefaultAsync<Printer>(
                "sp_PrinterMaster",
                new
                {
                    Opcode = 3,
                    PrinterAutoId = printer.PrinterAutoId,
                    PrinterName = printer.PrinterName,
                    Model = printer.Model,
                    IPAddress = printer.IPAddress,
                    Status = printer.Status
                },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<bool> DeletePrinterAsync(int printerAutoId)
        {
            var result = await _connection.QueryFirstOrDefaultAsync<int>(
                "sp_PrinterMaster",
                new
                {
                    Opcode = 4,
                    PrinterAutoId = printerAutoId
                },
                commandType: CommandType.StoredProcedure
            );

            return result == printerAutoId;
        }
    }
}
using Microsoft.Data.SqlClient;
using ReactApp2.Server.Repository;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy.WithOrigins("https://localhost:64610")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database Connection
builder.Services.AddScoped<IDbConnection>(sp =>
{
    var connectionString =
        builder.Configuration.GetConnectionString("connection");

    return new SqlConnection(connectionString);
});

// Repository
builder.Services.AddScoped<IPrinterRepository, PrinterRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("ReactPolicy");

app.UseAuthorization();

app.MapControllers();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapFallbackToFile("/index.html");

app.Run();
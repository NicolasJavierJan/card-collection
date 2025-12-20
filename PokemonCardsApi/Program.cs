using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using EFCore.NamingConventions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.FileProviders;
using System.IO;
using AutoMapper;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => 
{
    options.AddPolicy("AllowReactDevServer",
    policy => 
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
           .UseSnakeCaseNamingConvention());

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddControllers();

builder.Configuration.AddUserSecrets<Program>();

builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});


var app = builder.Build();

var imagePath = builder.Configuration["ImagePath"] ?? Environment.GetEnvironmentVariable("IMAGE_PATH");

if (string.IsNullOrEmpty(imagePath) || !Directory.Exists(imagePath))
{
    throw new Exception("Image Path is not available.");
} 

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(imagePath),
    RequestPath = "/static-images"
});

app.UseCors("AllowReactDevServer");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapCardEndpoints();
app.MapCardDex();
app.MapCardSetEndpoints();
app.MapCardFilters();
app.MapCardsEndpoints();
app.MapCardImageEndpoint();
app.MapCardRecommendationEndpoint();
app.MapLocationEndpoints();
app.MapCardSetLocationsEndpoints();
app.MapDashboardEndpoints();
app.MapControllers();

app.Run();

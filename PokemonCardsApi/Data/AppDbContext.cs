using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext 
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {

    }

    public DbSet<CardSet> CardSets { get; set; }
    public DbSet<CardType> CardTypes { get; set; }
    public DbSet<EnergySubtype> EnergySubtypes { get; set; }
    public DbSet<Language> Languages { get; set; }
    public DbSet<Location> Locations { get; set; } 
    public DbSet<PokemonCard> PokemonCards { get; set; }
    public DbSet<PokemonSpecies> PokemonSpecies { get; set; }
    public DbSet<PokemonTrainer> PokemonTrainers { get; set; }
    public DbSet<TrainerSubtype> TrainerSubtypes { get; set; }
    public DbSet<VariantType> VariantTypes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CardSet>().ToTable("card_sets");
        modelBuilder.Entity<CardType>().ToTable("card_types");
        modelBuilder.Entity<EnergySubtype>().ToTable("energy_subtypes");
        modelBuilder.Entity<Language>().ToTable("languages");
        modelBuilder.Entity<Location>().ToTable("locations");
        modelBuilder.Entity<PokemonCard>().ToTable("pokemon_cards");
        modelBuilder.Entity<PokemonSpecies>().ToTable("pokemon_species");
        modelBuilder.Entity<PokemonTrainer>().ToTable("pokemon_trainers");
        modelBuilder.Entity<TrainerSubtype>().ToTable("trainer_subtypes");
        modelBuilder.Entity<VariantType>().ToTable("variant_types");
    }
}
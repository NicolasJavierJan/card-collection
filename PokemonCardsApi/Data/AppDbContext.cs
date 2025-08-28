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
    public DbSet<CardLanguage> CardLanguages { get; set; }
    public DbSet<Location> Locations { get; set; } 
    public DbSet<PokemonCard> PokemonCards { get; set; }
    public DbSet<PokemonSpecies> PokemonSpecies { get; set; }
    public DbSet<PokemonTrainer> PokemonTrainers { get; set; }
    public DbSet<TrainerSubtype> TrainerSubtypes { get; set; }
    public DbSet<VariantType> VariantTypes { get; set; }
    public DbSet<CardSetLocation> CardSetLocations { get; set; }
    public DbSet<RecommendationsBlacklistedCard> RecommendationsBlacklistedCards { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<CardSet>().ToTable("card_sets");
        modelBuilder.Entity<CardType>().ToTable("card_types");
        modelBuilder.Entity<EnergySubtype>().ToTable("energy_subtypes");
        modelBuilder.Entity<CardLanguage>().ToTable("card_languages");
        modelBuilder.Entity<Location>().ToTable("locations");
        modelBuilder.Entity<Location>()
            .Property(l => l.Type)
            .HasConversion<string>();
        modelBuilder.Entity<PokemonCard>().ToTable("pokemon_cards");
        modelBuilder.Entity<PokemonSpecies>().ToTable("pokemon_species");
        modelBuilder.Entity<PokemonTrainer>().ToTable("pokemon_trainers");
        modelBuilder.Entity<TrainerSubtype>().ToTable("trainer_subtypes");
        modelBuilder.Entity<VariantType>().ToTable("variant_types");
        modelBuilder.Entity<CardSetLocation>().ToTable("card_set_locations");

        modelBuilder.Entity<RecommendationsBlacklistedCard>(entity =>
        {
            entity.ToTable("recommendations_blacklisted_cards");
            entity.HasKey(e => e.CardId);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("now()");
        });
    }
}
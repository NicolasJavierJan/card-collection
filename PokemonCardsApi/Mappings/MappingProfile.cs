// Mappings/MappingProfile.cs
using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<PokemonCard, PokemonCardDto>()
            .ForMember(d => d.PokemonSpeciesName,
                o => o.MapFrom(s => s.PokemonSpecies != null ? s.PokemonSpecies.Name : null))
            .ForMember(d => d.VariantTypeName,
            o => o.MapFrom(s => s.VariantType != null ? s.VariantType.Name : null))
            .ForMember(d => d.CardTypeName,
                o => o.MapFrom(s => s.CardType != null ? s.CardType.Name : null))
            .ForMember(d => d.CardSetName,
                o => o.MapFrom(s => s.CardSet != null ? s.CardSet.Name : null))
            .ForMember(d => d.LocationName,
                o => o.MapFrom(s => s.Location != null ? s.Location.Name : null))
            .ForMember(d => d.TrainerSubtypeName,
                o => o.MapFrom(s => s.TrainerSubtype != null ? s.TrainerSubtype.Name : null))
            .ForMember(d => d.EnergySubtypeName,
                o => o.MapFrom(s => s.EnergySubtype != null ? s.EnergySubtype.Name : null))
            .ForMember(d => d.PokemonTrainerName,
                o => o.MapFrom(s => s.PokemonTrainer != null ? s.PokemonTrainer.Name : null))
            .ForMember(d => d.CardLanguageName,
                o => o.MapFrom(s => s.CardLanguage != null ? s.CardLanguage.Name : string.Empty));
        
        CreateMap<PokemonCardCreateDto, PokemonCard>()
            .ForMember(d => d.Id, o => o.Ignore())
            .ForMember(d => d.AddedAt, o => o.Ignore());

        CreateMap<PokemonCardUpdateDto, PokemonCard>()
            .ForAllMembers(opts =>
                opts.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<PokemonCard, PokemonCardCollectionDto>()
            .ForMember(d => d.SetName,
                o => o.MapFrom(s => s.CardSet!.Name))
            .ForMember(d => d.LanguageName,
                o => o.MapFrom(s => s.CardLanguage!.Name))
            .ForMember(d => d.LocationName,
                o => o.MapFrom(s => s.Location!.Name));

        CreateMap<PokemonCard, CardDexEntryDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.PokemonSpeciesId))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.PokemonSpecies!.Name))
            .ForMember(dest => dest.ImagePath, opt => opt.MapFrom(src => src.ImagePath))
            .ForMember(dest => dest.IsMissing, opt => opt.Ignore());

        CreateMap<PokemonSpecies, PokemonSpeciesDto>();
        CreateMap<PokemonSpeciesCreateDto, PokemonSpecies>();
        CreateMap<PokemonSpeciesUpdateDto, PokemonSpecies>();

        CreateMap<VariantType, VariantTypeDto>();
        CreateMap<VariantTypeCreateDto, VariantType>();
        CreateMap<VariantTypeUpdateDto, VariantType>();

        CreateMap<CardType, CardTypeDto>();
        CreateMap<CardTypeCreateDto, CardType>();
        CreateMap<CardTypeUpdateDto, CardType>();

        CreateMap<CardSet, CardSetDto>();
        CreateMap<CardSetCreateDto, CardSet>();
        CreateMap<CardSetUpdateDto, CardSet>();

        CreateMap<Location, LocationDto>();
        CreateMap<LocationCreateDto, Location>();
        CreateMap<LocationUpdateDto, Location>();

        CreateMap<TrainerSubtype, TrainerSubtypeDto>();
        CreateMap<TrainerSubtypeCreateDto, TrainerSubtype>();
        CreateMap<TrainerSubtypeUpdateDto, TrainerSubtype>();

        CreateMap<EnergySubtype, EnergySubtypeDto>();
        CreateMap<EnergySubtypeCreateDto, EnergySubtype>();
        CreateMap<EnergySubtypeUpdateDto, EnergySubtype>();

        CreateMap<PokemonTrainer, PokemonTrainerDto>();
        CreateMap<PokemonTrainerCreateDto, PokemonTrainer>();
        CreateMap<PokemonTrainerUpdateDto, PokemonTrainer>();

        CreateMap<CardLanguage, CardLanguageDto>();
        CreateMap<CardLanguageCreateDto, CardLanguage>();
        CreateMap<CardLanguageUpdateDto, CardLanguage>();

        
    }
}

// Mappings/MappingProfile.cs
using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<PokemonCard, PokemonCardDto>()
            .ForMember(dest => dest.CardTypeName, opt => opt.MapFrom(src => src.CardType != null ? src.CardType.Name : null))
            .ForMember(dest => dest.SetName, opt => opt.MapFrom(src => src.CardSet != null ? src.CardSet.Name : null))
            .ForMember(dest => dest.LocationName, opt => opt.MapFrom(src => src.Location != null ? src.Location.Name : null))
            .ForMember(dest => dest.CardLanguageName, opt => opt.MapFrom(src => src.CardLanguage != null ? src.CardLanguage.Name : null));
        
        CreateMap<CardSet, CardSetDto>();

        CreateMap<CardType, CardTypeDto>();

        CreateMap<Location, LocationDto>();

        CreateMap<PokemonSpecies, PokemonSpeciesDto>();

        CreateMap<VariantType, VariantTypeDto>();

        CreateMap<CardLanguage, CardLanguageDto>();

        CreateMap<TrainerSubtype, TrainerSubtypeDto>();

        CreateMap<EnergySubtype, EnergySubtypeDto>();

        CreateMap<PokemonTrainer, PokemonTrainerDto>();
    }
}

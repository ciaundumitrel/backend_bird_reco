from django.core.management.base import BaseCommand
from server_licenta.bird.models import Family, Genus, Species, Observation, ConservationStatus


class Command(BaseCommand):
    help = 'Populates the database with initial bird data'
    def handle(self, *args, **options):
        populate()

def populate():
    family_laridae = Family.objects.create(name="Laridae", description="Gulls, terns, and skimmers")
    family_accipitridae = Family.objects.create(name="Accipitridae", description="Hawks, eagles, and kites")
    family_fringillidae = Family.objects.create(name="Fringillidae", description="Finches")
    family_rallidae = Family.objects.create(name="Rallidae", description="Rails, crakes, and coots")
    family_corvidae = Family.objects.create(name="Corvidae", description="Crows, ravens, and jays")
    family_ardeidae = Family.objects.create(name="Ardeidae", description="Herons and bitterns")
    family_passeridae = Family.objects.create(name="Passeridae", description="Old World sparrows")
    family_anatidae = Family.objects.create(name="Anatidae", description="Ducks, geese, and swans")
    family_motacillidae = Family.objects.create(name="Motacillidae", description="Wagtails and pipits")

    # Genera
    genus_chroicocephalus = Genus.objects.create(name="Chroicocephalus", family=family_laridae,
                                                 description="Small to medium-sized gulls")
    genus_buteo = Genus.objects.create(name="Buteo", family=family_accipitridae,
                                       description="Medium to large birds of prey")
    genus_fringilla = Genus.objects.create(name="Fringilla", family=family_fringillidae, description="Typical finches")
    genus_fulica = Genus.objects.create(name="Fulica", family=family_rallidae, description="Coots")
    genus_pica = Genus.objects.create(name="Pica", family=family_corvidae, description="Magpies")
    genus_ardea = Genus.objects.create(name="Ardea", family=family_ardeidae, description="Herons")
    genus_corvus = Genus.objects.create(name="Corvus", family=family_corvidae, description="Crows and ravens")
    genus_passer = Genus.objects.create(name="Passer", family=family_passeridae, description="Old World sparrows")
    genus_anas = Genus.objects.create(name="Anas", family=family_anatidae, description="Dabbling ducks")
    genus_motacilla = Genus.objects.create(name="Motacilla", family=family_motacillidae, description="Wagtails")

    # Species
    Species.objects.create(
        common_name='Black-headed Gull',
        scientific_name='Chroicocephalus ridibundus',
        genus=genus_chroicocephalus,
        description='A small gull with a distinctive dark head in breeding plumage and a white body.',
        habitat='Coastal and inland waters',
        population_status='Least Concern',
        image='https://inaturalist-open-data.s3.amazonaws.com/photos/198109587/medium.jpg'
    )

    Species.objects.create(
        common_name='Common Buzzard',
        scientific_name='Buteo buteo',
        genus=genus_buteo,
        description='A medium-to-large bird of prey with broad wings and a variety of color morphs.',
        habitat='Forests and open countryside',
        population_status='Least Concern',
        image='https://inaturalist-open-data.s3.amazonaws.com/photos/192398523/medium.jpeg'
    )

    Species.objects.create(
        common_name='Common Chaffinch',
        scientific_name='Fringilla coelebs',
        genus=genus_fringilla,
        description='A small bird with a strong voice, known for its colorful plumage in males.',
        habitat='Woodlands and gardens',
        population_status='Least Concern',
        image='https://inaturalist-open-data.s3.amazonaws.com/photos/151143058/medium.jpg'
    )

    Species.objects.create(
        common_name='Eurasian Coot',
        scientific_name='Fulica atra',
        genus=genus_fulica,
        description='A water bird with a distinctive white beak and forehead shield, mostly black body.',
        habitat='Lakes and ponds',
        population_status='Least Concern',
        image='https://inaturalist-open-data.s3.amazonaws.com/photos/123574818/medium.jpg'
    )

    Species.objects.create(
        common_name='Eurasian Magpie',
        scientific_name='Pica pica',
        genus=genus_pica,
        description='A striking black and white bird known for its intelligence and complex social behavior.',
        habitat='Woodlands and urban areas',
        population_status='Least Concern',
        image='https://inaturalist-open-data.s3.amazonaws.com/photos/103446096/medium.jpg'
    )

    Species.objects.create(
        common_name='Grey Heron',
        scientific_name='Ardea cinerea',
        genus=genus_ardea,
        description='A large wading bird with long legs and neck, grey plumage, and a powerful bill.',
        habitat='Wetlands',
        population_status='Least Concern',
        image='https://inaturalist-open-data.s3.amazonaws.com/photos/97939450/medium.jpg'
    )

    Species.objects.create(
        common_name='Hooded Crow',
        scientific_name='Corvus cornix',
        genus=genus_corvus,
        description='A member of the crow family with a grey body and black head, wings, and tail.',
        habitat='Urban areas and countryside',
        population_status='Least Concern',
        image='https://inaturalist-open-data.s3.amazonaws.com/photos/114176979/medium.jpg'
    )

    Species.objects.create(
        common_name='House Sparrow',
        scientific_name='Passer domesticus',
        genus=genus_passer,
        description='A small bird with a stout body, known for its adaptability to urban environments.',
        habitat='Urban areas',
        population_status='Least Concern',
        image='https://inaturalist-open-data.s3.amazonaws.com/photos/4608133/medium.jpg'
    )

    Species.objects.create(
        common_name='Mallard',
        scientific_name='Anas platyrhynchos',
        genus=genus_anas,
        description='A common duck species with iridescent green head in males and mottled brown in females.',
        habitat='Wetlands',
        population_status='Least Concern',
        image='https://inaturalist-open-data.s3.amazonaws.com/photos/95268822/medium.jpg'
    )

    Species.objects.create(
        common_name='Rook',
        scientific_name='Corvus frugilegus',
        genus=genus_corvus,
        description='A social bird related to crows with a distinctive bare grey-white face and black plumage.',
        habitat='Countryside and urban areas',
        population_status='Least Concern',
        image='https://inaturalist-open-data.s3.amazonaws.com/photos/62108568/medium.jpg'
    )

    Species.objects.create(
        common_name='White Wagtail',
        scientific_name='Motacilla alba',
        genus=genus_motacilla,
        description='A slender bird with a distinctive black and white plumage and constantly wagging tail.',
        habitat='Open country and urban areas',
        population_status='Least Concern',
        image='https://inaturalist-open-data.s3.amazonaws.com/photos/39786089/medium.jpg'
    )

    self.stdout.write(self.style.SUCCESS('Successfully populated the database with initial bird data'))

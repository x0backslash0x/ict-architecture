# Opgave project ICT Architecture

## Inleiding

Jij en twee vrienden staan op het punt af te studeren, maar willen liever zelf iets oprichten dan te gaan solliciteren. Omdat jullie allemaal graag gamen, beslissen jullie daar iets rond te doen. Na een uitgebreide brainstorm concluderen jullie dat er ruimte is voor een "meta-winkel" waarop je games uit bestaande winkels kan terugvinden, prijzen vergelijken, je collectie beheren en browsen door een lijst met aanbevelingen.

## Requirements

Jullie noteren tijdens de brainstorm volgende requirements:

- Het systeem moet bruikbaar zijn voor zo veel mogelijk platformen en winkels. Minstens PC en de huidige generatie van consoles.
  - Gebruikers moeten kunnen aangeven in welke platformen en winkels ze wel/niet geïnteresseerd zijn.
- Het systeem ondersteunt zowel digitale downloads als het gebruik van fysieke media (discs en cartridges).
- Het systeem moet up-to-date zijn en zelfs games weergeven die in de nabije toekomst uitgebracht zullen worden.
- Titels kunnen deels automatisch ingeladen worden, maar een curator zal soms knopen moeten doorhakken om te vermijden dat er dubbele entries en "shovelware" verschijnen.
- Op de pagina voor een specifieke game vind je enkele screenshots, misschien een trailer, de metascore, de gemiddelde speeltijd en tags.
  - Promomateriaal kan aangeleverd worden door een erkende uitgever. Screenshots kunnen ook aangeleverd worden door regelmatige actieve eindgebruikers. In dat tweede geval moet de curator hun bijdragen nakijken voor ze op de site verschijnen.
- Gebruikers kunnen hun collectie games manueel beheren maar kunnen ook zorgen dat informatie automatisch ingeladen wordt van store fronts (zoals Steam, GOG, Epic, Nintendo eShop, PlayStation Store,...).
- Gebruikers kunnen games een rating geven (ook als die niet in hun persoonlijke collectie zitten).
- Het systeem volgt de prijsgeschiedenis van games op over alle ondersteunde winkels in alle regio's.
- Het systeem kan notifications sturen wanneer een specifieke game verkrijgbaar is aan een specifieke prijs.
- Het systeem kan aanbevelingen genereren op basis van de collectie en de ratings van de gebruiker.
- Jullie hopen op inkomsten uit het erkennen van uitgevers, affiliate links en vrijwillige bijdragen, waarbij een counter aangeeft hoe veel van jullie kosten jullie deze maand hebben kunnen recupereren.
- Het systeem moet goed overweg kunnen met storingen in specifieke winkels.
- Het systeem moet sales in de grote winkels in de verf zetten.

## Verwachtingen

- Dit is je eigen, individueel werk. Er is niet één ideale oplossing.
- Je levert één Markdown document in. Schema's werk je uit met [Mermaid](https://mermaid.js.org/intro/).
- Je zal sowieso één monolitische implementatie en één als microservices moeten voorzien. Hoewel je normaal kiest voor één benadering, zou dat te weinig je inzicht in de materie nagaan. Het is trouwens niet zo vreemd om enkele proofs-of-concept te maken.
- Je brengt de gewenste karakteristieken in kaart en kiest ook de "driving characteristics". Voor elke karakteristiek vermeld je expliciet waarom hij belangrijk is voor dit project. Je doet dat in degelijke, leesbare zinnen.
- Je identificeert met de workflow approach, actor/action approach *of* een combinatie van beide logische componenten voor je systeem.
- Je kiest én verantwoordt een monolitische architecturale stijl. Voor microservices lijst je gewoonweg de voor- en nadelen op om van het toepassen van deze stijl.
- Architecturale keuzes noteer je in ADR's. Er worden er zeker vijf verwacht, waarvan minstens drie voor de gedistribueerde benadering en twee voor de monolitische. Je noteert bij elk ADR op welke benadering het ADR betrekking heeft.
- Je maakt een voorstelling van de twee fysieke architecturen en licht in tekst toe hoe de logische architectuur hier op mapt.
- Je maakt een proof-of-concept van **alleen de microservices implementatie**. Je gebruikt hiervoor Kubernetes. Je hoeft geen volledig werkende applicatie te hebben, maar je maakt voor elke microservice een zo minimalistisch mogelijke placeholder met dummy data. Dat kan bijvoorbeeld een simpele NodeJS-applicatie zijn die JSON teruggeeft. Je voorziet wel bruikbare authenticatie, monitoring en resilience.

## Praktisch

- Je houdt je implementatie bij in versiebeheer. Hiervoor volgt nog een Github Classroom link, maar je kan de repository al lokaal aanmaken.
- In de laatste lesweek wordt een toelichting voorzien. Hiervoor boek je een tijdsslot in. De slots voor de theorieles en labo's worden hiervoor alvast gebruikt, maar zullen niet volstaan voor de volledige groep. Er zullen dus nog extra momenten voorzien worden.
- Puntenverdeling:
  - Een uitwerking die aan alle vereisten goed voldoet, krijgt 16/20. Als je al een geslaagd project hebt (10/20 of meer), kan je meer halen door verder te gaan met je microservices en Kubernetes. Dat kan bijvoorbeeld door extra features te voorzien, de applicatie (gedeeltelijk) echt functioneel te maken,...
  - Om 16/20 te halen is de verdeling:
    - 30% analyse, waarvan:
      - achterhalen en verantwoorden karakteristieken: 5%
      - achterhalen logische componenten: 10%
      - ADR's: 10%
      - verantwoording geselecteerde monolitische stijl: 5%
    - 60% implementatie, waarvan:
      - mapping logische op fysieke architectuur: 10%
      - goed gebruik concepten Kubernetes: 20%
      - authenticatie: 10%
      - monitoring: 10%
      - resilience: 10%
    - 10% toelichting

## Inspiratiebronnen
- [Developer to Architect](https://developertoarchitect.com/lessons/)
- [Deku Deals](https://www.dekudeals.com/)
- [Backloggery](https://www.backloggery.com/)
- [Quantic Foundry](https://apps.quanticfoundry.com/recommendations/gamerprofile/videogame/)

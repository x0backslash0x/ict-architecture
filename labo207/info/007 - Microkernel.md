# inleiding
Een applicatie die een "microkernel" is wat betreft architecturale stijl steunt intrinsiek op plugins. In de theorieles hebben we gezien dat plugins lokaal ingeladen kunnen worden of via een netwerkprotocol gecontacteerd kunnen worden. Die laatste aanpak is niets nieuws, dus we focussen dit labo op het lokaal inladen van plugins.

# vereiste theorie
- architecturale stijl: microkernel

# oefeningen

## custom functies voor een spreadsheetapplicatie
In de Git repository voor de labo's vind je een spreadsheetapplicatie genaamd "TextCell" terug. Deze is geschreven in C♯. Ze gebruikt geen "cutting edge" features, dus zo nodig mag je de versie van .NET aanpassen naar wat je op je systeem hebt. Als je geen .NET op je systeem hebt, kan je ze ook in een container uitvoeren.

De bedoeling is dat je deze simpele applicatie voorziet van custom functies. Excel en Calc voorzien een heleboel ingebouwde functies, maar TextCell steunt dus op functies die je zelf programmeert. Dit haalt heel veel code weg uit de applicatie en maakt de applicatie vrijwel onbruikbaar zonder plugins, wat typisch is voor microkernels.

### werking applicatie

Je hoeft het systeem niet door en door te kennen. Wat je wel moet weten:

- een spreadsheet wordt intern voorgesteld als een tweedimensionale array van strings
  - een celwaarde heeft een type: `INT`, `STRING` of `ERROR`
  - je kan cellen invullen met referenties zoals `A1`, string literals zoals `"hallo"`, integer literals zoals `3` of functiecalls zoals `plus(A1,5)`
- er is geen ondersteuning voor operatoren zoals `+`, `-`, `*`, `/` (maar je zou deze dus als functies kunnen definiëren)
- er is geen ondersteuning voor ranges (zoals `A1:A10` of `A1:Z1`)
- als een expressie als functieoproep wordt herkend, moet de gebruikte functie opgezocht worden in de reeks ingeladen plugins
  - dit gebeurt in `EvalVisitor.cs` en er is één "ingebakken" functie, namelijk plus


### implementatiehulp

Je vindt alle nodige implementatiehulp in [deze chat](https://chatgpt.com/share/67d150da-b748-800b-a62e-7016055db254) (de stappen zijn nagekeken en getest). Je vindt [hier](https://ap.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=67bbce3d-da9d-4b0c-8537-b29e00a876bc) een demonstratie van het eindproduct en je gaat best als volgt te werk (en je maakt best commits na elke tussenstap):

1. Definieer de interface voor plugins. Let op: deze is niet identiek aan die in de chat. Definieer ook een klasse `PlusPlugin` die de interface implementeert. Pas de `EvalVisitor` aan zodat hij bij constructie een lijst met objecten met deze interface meekrijgt. Geef bij constructie een hardgecodeerde lijst mee met daarin enkel een instantie van `PlusPlugin`. Test dat je code zich hetzelfde gedraagt als de originele code. Merk op dat er overal in `EvalVisitor` "TODO"-comments staan die aangeven wat je moet doen.
2. Maak een nieuwe shared library en verplaats de interface naar deze shared library. Verplaats ook eventuele andere datatypes die bij deze interface horen. Compileer een .dll en gebruik deze in het oorspronkelijke project. Op dit punt ben je de plugins nog niet dynamisch aan het inladen!
3. Verplaats nu de `PlusPlugin` naar een eigen shared library die afhankelijk is van de shared library uit de vorige stap. Compileer een .dll en plaats deze in een plugins directory voor het oorspronkelijke project. Zorg ervoor (gebruik de code uit de chat) dat alle .dll's uit deze map worden ingeladen en dat er geen hardgecodeerde lijst met plugins meer is.
4. Implementeer ook `min(getalwaarde1, getalwaarde2,... getalwaardeN)`, `concat(tekstwaarde1, tekstwaarde2,...)` en `upperCase(tekstwaarde)` en test dat je ook deze kan gebruiken. Test de spreadsheet met complexere expressies zoals `plus(4,min(7,1),5)` of `concat(uppercase("hello"), " ", "world")`. Gedraagt alles zich zoals je zou verwachten?

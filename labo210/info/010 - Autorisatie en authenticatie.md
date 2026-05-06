# Inleiding

In dit labo bekijken we hoe je een eigen applicatie toegang kan laten vragen tot gegevens bij een externe provider.

# Vereiste theorie

- kennis Docker Compose van DevOps of Cloudsystemen
- les 9 rond OAuth

# Opdrachten

## Informatie opvragen via Github
Voor deze opdracht zorg je dat een gebruiker kan "inloggen" op een zelf geschreven applicatie via Github. "Inloggen" staat tussen aanhalingstekens omdat we geen database voorzien.

Je vindt [hier](https://ap.cloud.panopto.eu/Panopto/Pages/Viewer.aspx?id=e6cc7709-e6fe-4366-8d56-b43f008d4d16) een voorbeeld van wat er uiteindelijk moet gebeuren.

### Oefening
Bouw de flow uit het filmpje na op je eigen machine. Om dit te realiseren, volg je [de officiële documentatie](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps). Je doet dit via een kleine Express.js applicatie. Je voorziet geen "device flow" (de standaardflow is in orde). Github laat toe dat je `http://localhost:3000` meegeeft als domein.

De snelste manier om dit uit te testen is met een lokale Node.js installatie, zonder gebruik van Docker. Je moet ook het een en het ander invullen als query parameters in URL's. Die stukken encodeer je best, bv. via [deze tool](https://www.urlencoder.org/). Je hoeft geen omgevingsvariabelen,... te voorzien. Test gewoon het concept.

Je mag je beperken tot de query parameters die volgens de documentatie verplicht zijn en de `redirect_uri`. De scopes die je vraagt zijn `user`, `public_repo` en `openid`.

Je zou dit moeten kunnen zonder extra guides en zonder LLM's. De Github documentatie is volledig genoeg. Je kan ook observeren wat er gebeurt als je requests uitvoert via de browser of via `curl`.

#### Aanvullend
In werkelijkheid zou je aan de hand van het `id_token` dat je via de `openid` scope krijgt een `INSERT` of `UPDATE` in de databasetabel met gebruikers doen. Dat is niet noodzakelijk voor deze opdracht.

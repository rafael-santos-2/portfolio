export const projects = [
  {
    id: "01",
    name: "Helios Analytics",
    tagline: "Real-time data observability platform",
    category: "Fullstack SaaS",
    description:
      "Een observability-platform dat miljoenen events per dag verwerkt en engineers real-time inzicht geeft in systeemgedrag, latency-pieken en anomalieën — van ingest tot dashboard in milliseconden.",
    stack: ["React", "Node.js", "PostgreSQL", "Kafka", "Redis", "Docker"],
    endpoints: ["POST /api/v1/ingest", "GET /api/v1/metrics", "WS /stream/live"],
    metric: "2.4M events/dag",
    caseStudy: {
      overview:
        "Helios Analytics is een observability-platform gebouwd voor engineering-teams die inzicht nodig hebben in het gedrag van gedistribueerde systemen. Het verwerkt dagelijks 2.4 miljoen events, aggregeert ze tot bruikbare metrics en toont afwijkingen binnen enkele seconden op een live dashboard.",
      problem:
        "Het bestaande monitoring-stack van de klant bestond uit losse tools die niet met elkaar praatten: logs in één systeem, metrics in een ander, en alerts die te laat kwamen om incidenten te voorkomen. Engineers verloren kostbare tijd met het correleren van signalen tijdens een incident, terwijl latency-pieken vaak pas achteraf werden opgemerkt.",
      architecture:
        "De ingest-laag ontvangt events via een REST-endpoint en publiceert ze naar Kafka, waar meerdere consumers ze parallel verwerken. Redis dient als deduplicatie- en snelheidsbuffer tussen ingest en de PostgreSQL-tijdreeksopslag, terwijl een aparte WebSocket-laag geaggregeerde metrics naar het dashboard streamt zodra ze beschikbaar zijn. Elke component is horizontaal schaalbaar en gescheiden door duidelijke queues, zodat een piek in ingest nooit de leesprestaties van het dashboard beïnvloedt.",
      implementation:
        "De React-frontend abonneert zich op een WebSocket-stream en rendert metrics met een virtuele lijst zodat duizenden datapunten soepel blijven scrollen. Aan de backend zorgt een batching-laag ervoor dat Postgres nooit meer dan één schrijfactie per honderd events krijgt, met een Redis-set om duplicate event-ID's tijdens retries te weren.",
      code: `async function processBatch(events) {
  const seen = await redis.smismember("ingest:dedupe", events.map(e => e.id));
  const fresh = events.filter((_, i) => seen[i] === 0);

  await db.query(
    \`INSERT INTO metrics (id, service, latency_ms, ts)
     SELECT * FROM UNNEST($1::text[], $2::text[], $3::int[], $4::timestamptz[])
     ON CONFLICT (id) DO NOTHING\`,
    unzip(fresh)
  );

  if (fresh.length) {
    await redis.sadd("ingest:dedupe", fresh.map(e => e.id));
    await redis.expire("ingest:dedupe", 3600);
  }
}`,
    },
  },
  {
    id: "02",
    name: "Atlas Commerce",
    tagline: "Headless e-commerce engine",
    category: "Backend API",
    description:
      "Een headless commerce-backend met een GraphQL-first API, betrouwbare betaalverwerking en serverless afhandeling die pieken in verkeer moeiteloos opvangt.",
    stack: ["TypeScript", "GraphQL", "PostgreSQL", "Stripe", "AWS Lambda"],
    endpoints: ["POST /graphql", "POST /webhooks/pay", "GET /catalog/:id"],
    metric: "p99 < 80ms",
    caseStudy: {
      overview:
        "Atlas Commerce is een headless commerce-engine die merken een volledig aanpasbare storefront-ervaring geeft, terwijl de gehele catalogus-, checkout- en betaallogica via een enkele GraphQL-API wordt aangeboden.",
      problem:
        "Traditionele e-commerce platforms dwingen merken in een vaste frontend-template. De klant had een unieke merkbeleving nodig zonder zelf een betaal- en voorraadsysteem te bouwen, en de bestaande oplossing brak telkens onder piekbelasting rond releases en sales.",
      architecture:
        "GraphQL vormt de enige ingang voor zowel de storefront als interne tools, met gerichte resolvers per domein (catalogus, orders, betalingen). Betaalverwerking loopt via Stripe met webhook-gebaseerde statusupdates, en piekverkeer wordt opgevangen door AWS Lambda dat volledig stateless en on-demand meeschaalt zonder vaste server-capaciteit te reserveren.",
      implementation:
        "Elke resolver gebruikt een DataLoader om database-aanroepen te bundelen, wat de klassieke N+1-valkuil bij geneste queries voorkomt. Stripe-webhooks worden geverifieerd op signature voordat een order-status wijzigt, en de volledige betaalflow blijft onder de 80ms p99-latency door zware validaties asynchroon na de response af te handelen.",
      code: `const productLoader = new DataLoader(async (ids) => {
  const rows = await db.query(
    "SELECT * FROM products WHERE id = ANY($1)",
    [ids]
  );
  const byId = new Map(rows.map((row) => [row.id, row]));
  return ids.map((id) => byId.get(id) ?? null);
});

const resolvers = {
  OrderLine: {
    product: (line, _args, ctx) => ctx.loaders.product.load(line.productId),
  },
};`,
    },
  },
  {
    id: "03",
    name: "Vela Studio",
    tagline: "Collaborative design canvas",
    category: "Frontend Realtime",
    description:
      "Een real-time samenwerkings-canvas met conflict-free replicated data types voor naadloze multi-user editing en een WebGL-renderer die op elke schaal soepel blijft.",
    stack: ["React", "WebGL", "CRDT", "WebSockets", "Rust/WASM"],
    endpoints: ["WS /collab/room", "GET /snapshot", "POST /presence"],
    metric: "60fps @ 4K",
    caseStudy: {
      overview:
        "Vela Studio is een collaboratief ontwerp-canvas waarop meerdere gebruikers tegelijk kunnen tekenen, verplaatsen en annoteren, vergelijkbaar met Figma maar toegespitst op technische diagrammen.",
      problem:
        "Real-time samenwerken op hetzelfde canvas botst al snel met conflicterende wijzigingen: twee gebruikers die tegelijk hetzelfde object verplaatsen mogen nooit tot een inconsistente staat leiden, en de renderer moest soepel blijven presteren, zelfs met honderden objecten op een 4K-scherm.",
      architecture:
        "Elke wijziging wordt gemodelleerd als een CRDT-operatie met een logische klok en site-ID, zodat gelijktijdige edits deterministisch samenvoegen zonder centrale lock. WebSockets synchroniseren operaties tussen clients, terwijl een Rust/WASM-module de conflict-resolutie uitvoert buiten de JavaScript main thread om de UI responsief te houden.",
      implementation:
        "De canvas zelf rendert via WebGL met een aparte render-laag per gebruiker-cursor, zodat presence-updates nooit een volledige re-render van het canvas triggeren. Inkomende CRDT-operaties worden gebatcht per animatieframe verwerkt, wat een stabiele 60fps garandeert, zelfs bij tientallen gelijktijdige bewerkers.",
      code: `function mergeOp(local, remote) {
  if (remote.clock > local.clock) return remote;
  if (remote.clock < local.clock) return local;
  return remote.siteId > local.siteId ? remote : local;
}

function applyRemoteOps(state, ops) {
  for (const op of ops) {
    const current = state.get(op.key);
    state.set(op.key, current ? mergeOp(current, op) : op);
  }
  return state;
}`,
    },
  },
  {
    id: "04",
    name: "Orbit Auth",
    tagline: "Identity & access microservice",
    category: "Backend Security",
    description:
      "Een zero-trust identity-microservice met tokenrotatie, multi-factor verificatie en WebAuthn-ondersteuning, gebouwd om als onafhankelijke bouwsteen in elk systeem te draaien.",
    stack: ["Go", "Redis", "PostgreSQL", "JWT", "WebAuthn"],
    endpoints: ["POST /oauth/token", "GET /userinfo", "POST /mfa/verify"],
    metric: "Zero-trust",
    caseStudy: {
      overview:
        "Orbit Auth is een zelfstandige identity-microservice die authenticatie, autorisatie en multi-factor verificatie als herbruikbare bouwsteen aanbiedt aan andere services binnen het platform.",
      problem:
        "Meerdere interne teams bouwden telkens hun eigen auth-logica, met wisselende kwaliteit en beveiligingsniveaus. Er was behoefte aan één zero-trust identity-laag die tokens kort geldig houdt, sessies actief kan intrekken en moderne verificatie zoals WebAuthn ondersteunt zonder dat elk team dit zelf hoeft te implementeren.",
      architecture:
        "Elke request draagt een kortlevend JWT dat bij elke aanroep wordt geverifieerd tegen de public key van de service, zonder een database-round-trip voor de standaardflow. Ingetrokken tokens staan in een Redis-set met korte TTL zodat een intrekking direct effect heeft, terwijl PostgreSQL de langlevende gebruikers- en credential-data bewaart.",
      implementation:
        "In Go is de verificatie-laag een enkele middleware die claims decodeert, expiry en scope controleert, en pas daarna de request doorlaat naar de eigenlijke handler. WebAuthn-verificatie draait als losse stap vóór tokenuitgifte, zodat een gestolen wachtwoord alleen nooit voldoende is om toegang te krijgen.",
      code: `func Authorize(ctx context.Context, token string, required Scope) error {
	claims, err := verifyJWT(token, publicKey)
	if err != nil {
		return ErrInvalidToken
	}
	if time.Now().After(claims.ExpiresAt) {
		return ErrTokenExpired
	}
	if !claims.Scopes.Contains(required) {
		return ErrInsufficientScope
	}
	if revoked, _ := redis.SIsMember(ctx, "revoked", claims.ID); revoked {
		return ErrTokenRevoked
	}
	return nil
}`,
    },
  },
];

export const techStack = [
  {
    group: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind", "WebGL", "Framer Motion"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Go", "Python", "GraphQL", "REST", "gRPC"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "Redis", "MongoDB", "Kafka", "Elasticsearch"],
  },
  {
    group: "Infra",
    items: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
  },
];

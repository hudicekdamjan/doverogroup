import type { Locale, RouteKey } from '@/i18n/routes';
import type { ServiceKey } from '@/i18n/ui';
import type { PhotoKey } from './media';

type L<T = string> = Record<Locale, T>;

export interface ServiceContent {
  key: ServiceKey;
  route: RouteKey;
  number: string;
  /** Short name used in navigation, cards and the form select. */
  name: L;
  /** One-sentence summary for cards and listings. */
  summary: L;
  heroPhoto: PhotoKey;
  detailPhoto: PhotoKey;
  /** schema.org serviceType */
  serviceType: string;
  seo: L<{ title: string; description: string }>;
  eyebrow: L;
  h1: L;
  lead: L;
  overview: L<{ heading: string; paragraphs: string[] }>;
  scope: L<{ heading: string; items: { title: string; text: string }[] }>;
  process: L<{ heading: string; steps: { title: string; text: string }[] }>;
  highlight: L<{ heading: string; text: string }>;
  faq: L<{ q: string; a: string }[]>;
  related: ServiceKey[];
}

export const SERVICES: Record<ServiceKey, ServiceContent> = {
  /* ─────────────────────────────── 01 DETAILING ─────────────────────────────── */
  detailing: {
    key: 'detailing',
    route: 'detailing',
    number: '01',
    name: { en: 'Yacht Detailing & Polishing', me: 'Detailing i poliranje jahti' },
    summary: {
      en: 'Cleaning, polishing and detailing that restores, protects and maintains the appearance of your yacht.',
      me: 'Pranje, poliranje i detailing koji vraćaju, štite i čuvaju izgled vaše jahte.',
    },
    heroPhoto: 'polishedHull',
    detailPhoto: 'teakBow',
    serviceType: 'Yacht detailing and polishing',
    seo: {
      en: {
        title: 'Yacht Detailing & Polishing in Montenegro | DOVERO GROUP',
        description:
          'Professional yacht detailing, hull polishing and protective finishes in Tivat, Porto Montenegro, Kotor, Herceg Novi and Budva. Request a quote today.',
      },
      me: {
        title: 'Poliranje i detailing jahti — Tivat, Kotor | DOVERO GROUP',
        description:
          'Profesionalno poliranje trupa, detailing i zaštita površina jahti i plovila u Tivtu, Porto Montenegru, Kotoru, Herceg Novom i Budvi. Zatražite ponudu.',
      },
    },
    eyebrow: { en: 'Service 01 · Detailing & Polishing', me: 'Usluga 01 · Detailing i poliranje' },
    h1: { en: 'Yacht Detailing & Polishing', me: 'Detailing i poliranje jahti' },
    lead: {
      en: 'Hull, superstructure, stainless steel, teak and interior — cleaned, corrected and protected by hand, so your yacht looks the way it should every time you step aboard.',
      me: 'Trup, nadgrađe, inox, tikovina i enterijer — očišćeni, korigovani i zaštićeni ručno, da jahta izgleda onako kako treba svaki put kada se ukrcate.',
    },
    overview: {
      en: {
        heading: 'Restoring the finish. Protecting the investment.',
        paragraphs: [
          'Salt, sun and constant use take their toll on every surface of a yacht. Gelcoat loses its depth and starts to oxidise, stainless steel spots, and water marks settle into glass and paintwork. Left alone, small signs of wear become expensive to correct.',
          'Our detailing work starts with a proper look at the condition of your yacht. We then decide together what it needs — a thorough maintenance detail, machine polishing to bring back gloss and colour, or a protective finish that keeps it looking right for longer. Every surface is treated with products and techniques suited to it, not one approach for everything.',
        ],
      },
      me: {
        heading: 'Vraćamo sjaj. Čuvamo vrijednost.',
        paragraphs: [
          'So, sunce i svakodnevna upotreba ostavljaju trag na svakoj površini jahte. Gelcoat gubi dubinu i počinje da oksidira, inox dobija mrlje, a tragovi vode ostaju na staklu i lakiranim površinama. Ako se zanemare, sitni znaci habanja postaju skupi za popravku.',
          'Svaki detailing počinjemo pažljivim pregledom stanja jahte. Zatim zajedno odlučujemo šta joj je potrebno — temeljno održavajuće čišćenje, mašinsko poliranje koje vraća sjaj i boju ili zaštitni sloj koji duže čuva izgled. Svaku površinu tretiramo sredstvima i tehnikom koji joj odgovaraju, a ne jednim pristupom za sve.',
        ],
      },
    },
    scope: {
      en: {
        heading: 'What the service covers',
        items: [
          { title: 'Exterior wash & decontamination', text: 'Hull, decks and superstructure cleaned of salt, grime and residue before any polishing begins.' },
          { title: 'Hull & topside polishing', text: 'Machine polishing to reduce oxidation, light scratches and water spots and to bring back depth and gloss.' },
          { title: 'Protective finishes', text: 'Wax or sealant protection chosen for your yacht and how it is used, to keep the finish clean for longer.' },
          { title: 'Stainless steel & brightwork', text: 'Rails, cleats, fittings and trims cleaned and polished to remove spotting and tarnish.' },
          { title: 'Teak deck care & restoration', text: 'Cleaning, sanding and restoring weathered teak decks and steps, so the wood regains its warm, even colour.' },
          { title: 'Interior detailing', text: 'Upholstery, cabinetry, glass and hard surfaces cleaned and refreshed, cabin by cabin.' },
        ],
      },
      me: {
        heading: 'Šta usluga obuhvata',
        items: [
          { title: 'Spoljašnje pranje i dekontaminacija', text: 'Trup, palube i nadgrađe očišćeni od soli, prljavštine i naslaga prije bilo kakvog poliranja.' },
          { title: 'Poliranje trupa i nadgrađa', text: 'Mašinsko poliranje koje umanjuje oksidaciju, sitne ogrebotine i tragove vode i vraća dubinu i sjaj.' },
          { title: 'Zaštitni slojevi', text: 'Vosak ili sealant izabran prema jahti i načinu korišćenja, kako bi površina duže ostala čista.' },
          { title: 'Inox i metalni detalji', text: 'Ograde, bitve, okovi i lajsne očišćeni i ispolirani, bez mrlja i potamnjenja.' },
          { title: 'Njega i obnova tikovine', text: 'Čišćenje, brušenje i obnova izbljedjele tikovine na palubama i stepenicama, kako bi drvo vratilo topao, ujednačen ton.' },
          { title: 'Detailing enterijera', text: 'Tapacirung, namještaj, stakla i tvrde površine očišćeni i osvježeni, kabinu po kabinu.' },
        ],
      },
    },
    process: {
      en: {
        heading: 'How we work',
        steps: [
          { title: 'Inspection', text: 'We look at the yacht in person — or start from your photos — and note the condition of each surface.' },
          { title: 'Proposal', text: 'You receive a clear description of the work we recommend, with the timing and the price.' },
          { title: 'Detailing', text: 'The work is carried out carefully, section by section, with your yacht protected throughout.' },
          { title: 'Handover', text: 'We walk through the result with you or your captain before the job is closed.' },
        ],
      },
      me: {
        heading: 'Kako radimo',
        steps: [
          { title: 'Pregled', text: 'Jahtu pregledamo uživo — ili krenemo od vaših fotografija — i bilježimo stanje svake površine.' },
          { title: 'Ponuda', text: 'Dobijate jasan opis preporučenih radova, sa rokom i cijenom.' },
          { title: 'Izvođenje', text: 'Radove izvodimo pažljivo, dio po dio, uz zaštitu jahte tokom cijelog procesa.' },
          { title: 'Primopredaja', text: 'Prije zatvaranja posla rezultat zajedno pregledamo sa vama ili vašim kapetanom.' },
        ],
      },
    },
    highlight: {
      en: {
        heading: 'When owners usually call us',
        text: 'Before the season opens, ahead of a sale, after winter storage — or simply when the yacht no longer looks the way you remember it.',
      },
      me: {
        heading: 'Kada nas vlasnici najčešće zovu',
        text: 'Pred početak sezone, prije prodaje, nakon zimskog smještaja — ili jednostavno kada jahta više ne izgleda onako kako je pamtite.',
      },
    },
    faq: {
      en: [
        { q: 'How often should a yacht be polished?', a: 'It depends on the colour of the hull, how much sun the yacht gets and how it is used. Many owners schedule a full polish once a year, usually before or after the season, with lighter maintenance details in between. After an inspection we can suggest a rhythm that suits your yacht.' },
        { q: 'Can the work be done while the yacht is at its berth?', a: 'Most cleaning and detailing work can be done at the berth, subject to the marina’s rules. Some hull work is better done with the yacht out of the water. We will tell you which applies before we start.' },
        { q: 'Do you also clean and detail the interior?', a: 'Yes. Interior detailing — upholstery, surfaces, glass and cabins — can be booked on its own or together with exterior work.' },
        { q: 'How do I get a price?', a: 'Send us a few photos and the length of your yacht through the inquiry form or WhatsApp. We will reply with next steps and, where needed, arrange an inspection.' },
      ],
      me: [
        { q: 'Koliko često treba polirati jahtu?', a: 'Zavisi od boje trupa, izloženosti suncu i načina korišćenja. Mnogi vlasnici planiraju kompletno poliranje jednom godišnje, najčešće prije ili poslije sezone, uz lakši održavajući detailing između. Nakon pregleda predložićemo ritam koji odgovara vašoj jahti.' },
        { q: 'Da li se radovi mogu izvoditi dok je jahta na vezu?', a: 'Većinu pranja i detailinga moguće je uraditi na vezu, u skladu s pravilima marine. Neke radove na trupu bolje je raditi kada je jahta van vode. Prije početka reći ćemo vam šta važi u vašem slučaju.' },
        { q: 'Da li radite i enterijer?', a: 'Da. Detailing enterijera — tapacirung, površine, stakla i kabine — možete zakazati zasebno ili zajedno sa spoljašnjim radovima.' },
        { q: 'Kako da dobijem cijenu?', a: 'Pošaljite nam nekoliko fotografija i dužinu jahte putem forme za upit ili WhatsApp-a. Odgovorićemo sa sljedećim koracima i, ako je potrebno, dogovoriti pregled.' },
      ],
    },
    related: ['repairs', 'maintenance', 'storage'],
  },

  /* ─────────────────────────────── 02 REPAIRS ─────────────────────────────── */
  repairs: {
    key: 'repairs',
    route: 'repairs',
    number: '02',
    name: { en: 'Fiberglass & Gelcoat Repairs', me: 'Popravke fiberglasa i gelcoata' },
    summary: {
      en: 'Professional fiberglass, gelcoat and marine surface repairs, finished to blend in with the surrounding surface.',
      me: 'Profesionalne popravke fiberglasa, gelcoata i površina plovila, završene tako da se stapaju sa okolinom.',
    },
    heroPhoto: 'fiberglassRepair',
    detailPhoto: 'keelDamage',
    serviceType: 'Fiberglass and gelcoat repair',
    seo: {
      en: {
        title: 'Fiberglass & Gelcoat Repair in Montenegro | DOVERO GROUP',
        description:
          'Gelcoat chips, scratches, cracks and fiberglass damage repaired and colour-matched on yachts in the Bay of Kotor — Tivat, Kotor, Herceg Novi, Budva.',
      },
      me: {
        title: 'Popravka gelcoata i fiberglasa na jahtama | DOVERO GROUP',
        description:
          'Sanacija oštećenja gelcoata, ogrebotina, pukotina i fiberglasa na jahtama i čamcima u Boki Kotorskoj — Tivat, Kotor, Herceg Novi, Budva. Zatražite ponudu.',
      },
    },
    eyebrow: { en: 'Service 02 · Surface Repairs', me: 'Usluga 02 · Popravke površina' },
    h1: { en: 'Fiberglass & Gelcoat Repairs', me: 'Popravke fiberglasa i gelcoata' },
    lead: {
      en: 'Chips, scratches, cracks and impact marks repaired with care — colour-matched and finished so the repair sits quietly within the surrounding surface.',
      me: 'Oštećenja, ogrebotine, pukotine i tragovi udaraca sanirani pažljivo — u boji originala i završeni tako da se popravka neprimjetno uklopi u okolnu površinu.',
    },
    overview: {
      en: {
        heading: 'Small damage, repaired properly.',
        paragraphs: [
          'A misjudged approach to the pontoon, a dropped anchor, a fender that slipped — damage to gelcoat and fiberglass is part of life at sea. What matters is how it is repaired. A rushed patch is visible from the dock; a good repair is hard to find.',
          'We assess the damage first, explain what is involved and only then start work. Damaged material is removed, the area is rebuilt and the surface is colour-matched, sanded and polished so it follows the line and gloss of the hull around it. Gelcoat also protects the laminate beneath it, so we recommend dealing with open damage early.',
        ],
      },
      me: {
        heading: 'Mala oštećenja, popravljena kako treba.',
        paragraphs: [
          'Loše procijenjen prilaz pontonu, sidro, bokobran koji je skliznuo — oštećenja gelcoata i fiberglasa dio su života na moru. Važno je kako se saniraju. Brzinska zakrpa vidi se sa mola; dobru popravku teško je pronaći.',
          'Prvo procijenimo oštećenje, objasnimo šta popravka podrazumijeva i tek onda počinjemo. Oštećeni materijal se uklanja, površina se obnavlja, a zatim usklađuje po boji, brusi i polira kako bi pratila liniju i sjaj trupa oko sebe. Gelcoat štiti i laminat ispod sebe, zato preporučujemo da se otvorena oštećenja saniraju na vrijeme.',
        ],
      },
    },
    scope: {
      en: {
        heading: 'Typical repairs',
        items: [
          { title: 'Damage assessment', text: 'A clear look at the extent of the damage and an honest view of what a repair can achieve.' },
          { title: 'Chips & scratches', text: 'Gelcoat chips, deep scratches and scuffs filled, levelled and refinished.' },
          { title: 'Cracks & stress cracks', text: 'Hairline and stress cracks opened, repaired and sealed so they do not return.' },
          { title: 'Fiberglass damage', text: 'Damaged fiberglass areas rebuilt before the finishing layers are applied.' },
          { title: 'Colour matching', text: 'Gelcoat tinted to match the existing surface, including hulls that have aged in the sun.' },
          { title: 'Finishing & polishing', text: 'Wet sanding and polishing so the repaired area follows the gloss of the hull around it.' },
        ],
      },
      me: {
        heading: 'Najčešće popravke',
        items: [
          { title: 'Procjena oštećenja', text: 'Jasan pregled obima oštećenja i iskren odgovor šta popravka može da postigne.' },
          { title: 'Udubljenja i ogrebotine', text: 'Oštećenja gelcoata, duboke ogrebotine i tragovi struganja popunjeni, izravnani i obnovljeni.' },
          { title: 'Pukotine', text: 'Sitne i naponske pukotine otvorene, sanirane i zatvorene kako se ne bi vraćale.' },
          { title: 'Oštećenja fiberglasa', text: 'Oštećeni djelovi fiberglasa obnovljeni prije nanošenja završnih slojeva.' },
          { title: 'Usklađivanje boje', text: 'Gelcoat toniran prema postojećoj površini, uključujući trupove koje je sunce već izbijelilo.' },
          { title: 'Završna obrada i poliranje', text: 'Mokro brušenje i poliranje kako bi popravljeni dio pratio sjaj ostatka trupa.' },
        ],
      },
    },
    process: {
      en: {
        heading: 'From damage to finish',
        steps: [
          { title: 'Assess', text: 'Photos or an inspection on board to understand the type and depth of the damage.' },
          { title: 'Explain', text: 'We tell you what the repair involves, how long it takes and what the result will look like.' },
          { title: 'Repair', text: 'Material is removed and rebuilt, then colour-matched in layers.' },
          { title: 'Refinish', text: 'Sanding and polishing until the repair blends into the surrounding surface.' },
        ],
      },
      me: {
        heading: 'Od oštećenja do završne obrade',
        steps: [
          { title: 'Procjena', text: 'Fotografije ili pregled na jahti, kako bismo razumjeli vrstu i dubinu oštećenja.' },
          { title: 'Objašnjenje', text: 'Kažemo vam šta popravka podrazumijeva, koliko traje i kakav će biti rezultat.' },
          { title: 'Popravka', text: 'Materijal se uklanja i obnavlja, a zatim se boja usklađuje u slojevima.' },
          { title: 'Završna obrada', text: 'Brušenje i poliranje dok se popravka ne stopi sa okolnom površinom.' },
        ],
      },
    },
    highlight: {
      en: {
        heading: 'Start with a photo',
        text: 'Send a close-up and a wider shot of the damaged area through WhatsApp. It is the fastest way for us to tell you what is involved.',
      },
      me: {
        heading: 'Počnite fotografijom',
        text: 'Pošaljite nam putem WhatsApp-a krupni plan i širi kadar oštećenog dijela. Tako najbrže možemo da vam kažemo šta popravka podrazumijeva.',
      },
    },
    faq: {
      en: [
        { q: 'Will the repair be visible?', a: 'The aim is always for the repair to blend in. How invisible it becomes depends on the age and condition of the surrounding gelcoat — we will tell you honestly what to expect before we start.' },
        { q: 'Can small chips wait until the end of the season?', a: 'Cosmetic scratches often can. Chips and cracks that expose the laminate beneath the gelcoat are better repaired early, before moisture has a chance to get in.' },
        { q: 'Does the yacht need to come out of the water?', a: 'Repairs above the waterline can often be done at the berth, depending on the marina. Damage at or below the waterline usually needs the yacht out of the water.' },
        { q: 'Can you combine a repair with polishing?', a: 'Yes. Many owners combine repairs with a full polish, so the whole hull is finished evenly.' },
      ],
      me: [
        { q: 'Da li će se popravka vidjeti?', a: 'Cilj je uvijek da se popravka uklopi. Koliko će biti neprimjetna zavisi od starosti i stanja okolnog gelcoata — prije početka iskreno ćemo vam reći šta da očekujete.' },
        { q: 'Mogu li sitna oštećenja da sačekaju kraj sezone?', a: 'Površinske ogrebotine često mogu. Oštećenja i pukotine koje otvaraju laminat ispod gelcoata bolje je sanirati odmah, prije nego što vlaga prodre.' },
        { q: 'Da li jahta mora van vode?', a: 'Popravke iznad vodene linije često se mogu raditi na vezu, zavisno od marine. Oštećenja na vodenoj liniji ili ispod nje obično zahtijevaju da jahta bude van vode.' },
        { q: 'Može li se popravka spojiti sa poliranjem?', a: 'Može. Mnogi vlasnici kombinuju popravku sa kompletnim poliranjem, kako bi cijeli trup bio ujednačeno završen.' },
      ],
    },
    related: ['detailing', 'maintenance', 'storage'],
  },

  /* ─────────────────────────────── 03 MAINTENANCE ─────────────────────────────── */
  maintenance: {
    key: 'maintenance',
    route: 'maintenance',
    number: '03',
    name: { en: 'Yacht Maintenance', me: 'Održavanje jahti' },
    summary: {
      en: 'Maintenance focused on preserving your yacht’s condition, appearance and functionality throughout the year.',
      me: 'Održavanje usmjereno na očuvanje stanja, izgleda i funkcionalnosti vaše jahte tokom cijele godine.',
    },
    heroPhoto: 'bow',
    detailPhoto: 'teakSanding',
    serviceType: 'Yacht maintenance',
    seo: {
      en: {
        title: 'Yacht Maintenance in Tivat & Bay of Kotor | DOVERO GROUP',
        description:
          'Planned yacht maintenance and care in Montenegro: regular cleaning, pre-season and end-of-season preparation, and care while you are away. Request a quote.',
      },
      me: {
        title: 'Održavanje jahti i plovila — Boka Kotorska | DOVERO GROUP',
        description:
          'Redovno održavanje jahti u Crnoj Gori: čišćenje, priprema pred sezonu i nakon nje, i briga o plovilu dok ste odsutni. Tivat, Kotor, Herceg Novi, Budva.',
      },
    },
    eyebrow: { en: 'Service 03 · Maintenance', me: 'Usluga 03 · Održavanje' },
    h1: { en: 'Yacht Maintenance', me: 'Održavanje jahti' },
    lead: {
      en: 'Regular, planned care that keeps your yacht presentable, functional and ready — whether you are on board every weekend or only a few weeks a year.',
      me: 'Redovna, planirana briga koja jahtu čuva urednom, funkcionalnom i spremnom — bilo da ste na njoj svakog vikenda ili samo nekoliko sedmica godišnje.',
    },
    overview: {
      en: {
        heading: 'Consistent care, not occasional rescue.',
        paragraphs: [
          'Yachts age fastest when they are left alone. Salt crystallises, moisture settles in cabins and small issues go unnoticed until they turn into bigger ones. Regular attention is what keeps a yacht in the condition its owner expects.',
          'We put together a maintenance plan around your yacht and the way you use it — how often we visit, what we check and clean, and what we prepare before you arrive. You always know what has been done. If something needs work outside our scope, we tell you clearly rather than improvise.',
        ],
      },
      me: {
        heading: 'Stalna briga, a ne povremeno spašavanje.',
        paragraphs: [
          'Jahte najbrže stare kada su prepuštene same sebi. So se kristališe, vlaga se zadržava u kabinama, a sitni problemi prolaze neprimijećeno dok ne postanu veći. Redovna pažnja je ono što jahtu čuva u stanju koje vlasnik očekuje.',
          'Plan održavanja pravimo prema vašoj jahti i načinu na koji je koristite — koliko često dolazimo, šta provjeravamo i čistimo i šta pripremamo prije vašeg dolaska. Uvijek znate šta je urađeno. Ako je potreban posao van našeg djelokruga, to vam jasno kažemo umjesto da improvizujemo.',
        ],
      },
    },
    scope: {
      en: {
        heading: 'A plan built around your yacht',
        items: [
          { title: 'Regular care visits', text: 'Scheduled visits to clean, ventilate and check the yacht at the frequency you choose.' },
          { title: 'Pre-season preparation', text: 'Cleaning and preparation so the yacht is ready the day the season — or your holiday — begins.' },
          { title: 'End-of-season preparation', text: 'A thorough clean and careful preparation before the yacht is laid up or stored.' },
          { title: 'Exterior protection', text: 'Washing, polishing and protective treatments planned across the year rather than all at once.' },
          { title: 'Interior upkeep', text: 'Cabins, upholstery and surfaces kept clean, fresh and dry between your visits.' },
          { title: 'Clear reporting', text: 'You are kept informed about what was done and about anything that needs your attention.' },
        ],
      },
      me: {
        heading: 'Plan prilagođen vašoj jahti',
        items: [
          { title: 'Redovne posjete', text: 'Planirane posjete radi čišćenja, provjetravanja i provjere jahte, onoliko često koliko odlučite.' },
          { title: 'Priprema pred sezonu', text: 'Čišćenje i priprema kako bi jahta bila spremna od prvog dana sezone — ili vašeg odmora.' },
          { title: 'Priprema po završetku sezone', text: 'Temeljno čišćenje i pažljiva priprema prije nego što jahta ode na zimovanje ili u smještaj.' },
          { title: 'Zaštita spoljašnjosti', text: 'Pranje, poliranje i zaštitni tretmani raspoređeni kroz godinu, a ne svi odjednom.' },
          { title: 'Njega enterijera', text: 'Kabine, tapacirung i površine čisti, svježi i suvi između vaših dolazaka.' },
          { title: 'Jasno izvještavanje', text: 'Obavještavamo vas šta je urađeno i šta zahtijeva vašu pažnju.' },
        ],
      },
    },
    process: {
      en: {
        heading: 'Setting up your plan',
        steps: [
          { title: 'Conversation', text: 'We learn how and when you use the yacht and what matters most to you.' },
          { title: 'Walk-through', text: 'An on-board look at the yacht’s current condition and any priorities.' },
          { title: 'Plan & price', text: 'A written maintenance plan with visit frequency, scope and cost.' },
          { title: 'Ongoing care', text: 'We carry out the plan and keep you updated throughout the year.' },
        ],
      },
      me: {
        heading: 'Kako nastaje vaš plan',
        steps: [
          { title: 'Razgovor', text: 'Saznajemo kako i kada koristite jahtu i šta vam je najvažnije.' },
          { title: 'Obilazak', text: 'Pregled trenutnog stanja jahte na licu mjesta i dogovor o prioritetima.' },
          { title: 'Plan i cijena', text: 'Pisani plan održavanja sa učestalošću posjeta, obimom posla i cijenom.' },
          { title: 'Stalna briga', text: 'Sprovodimo plan i obavještavamo vas tokom cijele godine.' },
        ],
      },
    },
    highlight: {
      en: {
        heading: 'Arrive to a yacht that is ready',
        text: 'Tell us when you are coming. The yacht will be clean, aired and prepared when you step aboard.',
      },
      me: {
        heading: 'Dočekaće vas spremna jahta',
        text: 'Javite nam kada dolazite. Jahta će biti čista, provjetrena i pripremljena kada se ukrcate.',
      },
    },
    faq: {
      en: [
        { q: 'How often should a yacht be maintained?', a: 'There is no single answer. A yacht used every week in summer needs a different rhythm from one used a few weeks a year. We agree the frequency with you and adjust it through the seasons.' },
        { q: 'Can you look after the yacht while I am abroad?', a: 'Yes. Regular care visits are designed for owners who are not in Montenegro all year. You stay informed without having to be here.' },
        { q: 'Do you work with captains and management companies?', a: 'Yes. We can work alongside your captain or yacht management company and fit into the arrangements already in place.' },
        { q: 'What if the yacht needs technical repairs?', a: 'If something falls outside our scope, we tell you clearly so you can involve the right specialist. We do not improvise on work we do not offer.' },
      ],
      me: [
        { q: 'Koliko često jahtu treba održavati?', a: 'Ne postoji jedan odgovor. Jahti koja se ljeti koristi svake sedmice potreban je drugačiji ritam nego onoj koja se koristi nekoliko sedmica godišnje. Učestalost dogovaramo s vama i prilagođavamo je kroz sezone.' },
        { q: 'Možete li brinuti o jahti dok sam u inostranstvu?', a: 'Da. Redovne posjete osmišljene su upravo za vlasnike koji nijesu u Crnoj Gori tokom cijele godine. Informisani ste, a ne morate biti ovdje.' },
        { q: 'Da li sarađujete sa kapetanima i menadžment kompanijama?', a: 'Da. Možemo raditi zajedno sa vašim kapetanom ili kompanijom koja upravlja jahtom i uklopiti se u postojeće dogovore.' },
        { q: 'Šta ako jahti trebaju tehničke popravke?', a: 'Ako je nešto van našeg djelokruga, jasno vam to kažemo kako biste angažovali pravog stručnjaka. Ne improvizujemo na poslovima koje ne nudimo.' },
      ],
    },
    related: ['detailing', 'storage', 'repairs'],
  },

  /* ─────────────────────────────── 04 STORAGE ─────────────────────────────── */
  storage: {
    key: 'storage',
    route: 'storage',
    number: '04',
    name: { en: 'Winter Storage', me: 'Zimski smještaj' },
    summary: {
      en: 'Seasonal storage in an indoor hall or a fenced outdoor yard, both under motion-detection video surveillance with instant phone alarms.',
      me: 'Sezonski smještaj u hali ili na ograđenom placu, oba pod video nadzorom sa detekcijom pokreta i trenutnim alarmom na telefon.',
    },
    heroPhoto: 'storageHall',
    detailPhoto: 'storageYard',
    serviceType: 'Boat and yacht winter storage',
    seo: {
      en: {
        title: 'Yacht & Boat Winter Storage in Montenegro | DOVERO GROUP',
        description:
          'Winter storage for yachts and boats in the Bay of Kotor: indoor hall or fenced yard with motion-detection cameras and instant phone alarms.',
      },
      me: {
        title: 'Zimski smještaj plovila i jahti — hala i plac | DOVERO GROUP',
        description:
          'Zimovanje plovila u Boki Kotorskoj: hala ili ograđeni plac pod video nadzorom sa detekcijom pokreta i alarmom na telefon. Zatražite ponudu.',
      },
    },
    eyebrow: { en: 'Service 04 · Winter Storage', me: 'Usluga 04 · Zimski smještaj' },
    h1: { en: 'Winter Yacht Storage', me: 'Zimski smještaj jahti i plovila' },
    lead: {
      en: 'An indoor hall or a fenced outdoor yard, both protected by motion-detection video surveillance, with careful preparation before storage and before your yacht returns to the water.',
      me: 'Hala ili ograđeni plac, oba zaštićena video nadzorom sa detekcijom pokreta, uz pažljivu pripremu prije smještaja i prije povratka jahte u more.',
    },
    overview: {
      en: {
        heading: 'A secure place for the quiet months.',
        paragraphs: [
          'Winter is when a yacht is most exposed to neglect. Weather, moisture and months without attention can undo a season of good care. Where and how it is stored makes a real difference to the condition it will be in next spring.',
          'DOVERO GROUP offers two storage options: an indoor storage hall and a fenced outdoor yard. Both are under video surveillance with motion detection: any movement triggers an instant alarm on our phone, where the camera footage can be checked straight away. We help you choose the right one for your yacht, prepare it before the winter and get it ready again for the season — and because storage sits next to our detailing and repair work, winter is also the ideal time to have those jobs done.',
        ],
      },
      me: {
        heading: 'Sigurno mjesto za mirne mjesece.',
        paragraphs: [
          'Zima je period kada je jahta najizloženija zapuštanju. Vremenske prilike, vlaga i mjeseci bez pažnje mogu poništiti cijelu sezonu dobrog održavanja. Gdje i kako je jahta smještena zaista utiče na stanje u kojem će dočekati proljeće.',
          'DOVERO GROUP nudi dvije opcije smještaja: zatvorenu halu i ograđeni otvoreni plac. Oba prostora su pod video nadzorom sa detekcijom pokreta: svaki pokret odmah aktivira alarm na našem telefonu, gdje se snimak kamera može odmah pregledati. Pomažemo vam da izaberete pravo rješenje za vašu jahtu, pripremimo je prije zime i ponovo spremimo za sezonu — a pošto je smještaj povezan sa našim detailingom i popravkama, zima je idealno vrijeme i za te radove.',
        ],
      },
    },
    scope: {
      en: {
        heading: 'Storage options & preparation',
        items: [
          { title: 'Indoor storage hall', text: 'Covered storage that keeps your yacht out of the rain, sun and wind through the winter.' },
          { title: 'Fenced outdoor yard', text: 'A secured, fenced yard for yachts and boats stored on land in the open air.' },
          { title: 'Motion-detection surveillance', text: 'Cameras cover the hall and the yard. Any movement triggers an instant alarm on our phone, where the footage can be checked immediately.' },
          { title: 'Preparation for storage', text: 'Thorough cleaning and preparation before the yacht goes into storage for the winter.' },
          { title: 'Spring preparation', text: 'Cleaning, polishing and preparation so the yacht is ready for the new season.' },
          { title: 'Winter works', text: 'Detailing, polishing and gelcoat repairs scheduled while the yacht is in storage.' },
        ],
      },
      me: {
        heading: 'Opcije smještaja i priprema',
        items: [
          { title: 'Zatvorena hala', text: 'Natkriven smještaj koji jahtu tokom zime čuva od kiše, sunca i vjetra.' },
          { title: 'Ograđeni otvoreni plac', text: 'Obezbijeđen, ograđen plac za jahte i čamce smještene na kopnu na otvorenom.' },
          { title: 'Video nadzor sa detekcijom pokreta', text: 'Kamere pokrivaju halu i plac. Svaki pokret odmah šalje alarm na naš telefon, gdje se snimak može odmah pregledati.' },
          { title: 'Priprema za smještaj', text: 'Temeljno čišćenje i priprema prije nego što jahta ode na zimovanje.' },
          { title: 'Priprema za proljeće', text: 'Čišćenje, poliranje i priprema kako bi jahta bila spremna za novu sezonu.' },
          { title: 'Radovi tokom zime', text: 'Detailing, poliranje i popravke gelcoata zakazani dok je jahta u smještaju.' },
        ],
      },
    },
    process: {
      en: {
        heading: 'How winter storage works',
        steps: [
          { title: 'Reserve', text: 'Tell us about your yacht and the dates. We confirm availability and the right option.' },
          { title: 'Prepare', text: 'The yacht is cleaned and prepared before it goes into storage.' },
          { title: 'Store', text: 'Your yacht stays in the hall or the fenced yard, watched by motion-detection cameras.' },
          { title: 'Relaunch-ready', text: 'Before the season, the yacht is cleaned and prepared to go back on the water.' },
        ],
      },
      me: {
        heading: 'Kako funkcioniše zimski smještaj',
        steps: [
          { title: 'Rezervacija', text: 'Opišite nam jahtu i termine. Potvrđujemo raspoloživost i odgovarajuću opciju.' },
          { title: 'Priprema', text: 'Jahta se čisti i priprema prije smještaja.' },
          { title: 'Smještaj', text: 'Jahta zimuje u hali ili na ograđenom placu, pod kamerama sa detekcijom pokreta.' },
          { title: 'Spremna za more', text: 'Pred sezonu jahtu čistimo i pripremamo za povratak u more.' },
        ],
      },
    },
    highlight: {
      en: {
        heading: 'Alarm on movement, straight to our phone',
        text: 'The hall and the yard are covered by cameras with motion detection. If anything moves, an alarm is sent to our phone immediately, where the live footage can be checked.',
      },
      me: {
        heading: 'Alarm na svaki pokret, direktno na naš telefon',
        text: 'Hala i plac su pokriveni kamerama sa detekcijom pokreta. Ako se bilo šta pomjeri, alarm odmah stiže na naš telefon, gdje se snimak uživo može pregledati.',
      },
    },
    faq: {
      en: [
        { q: 'Indoor hall or outdoor yard — which should I choose?', a: 'Indoor storage gives the most protection from weather and sun. The fenced outdoor yard suits many yachts and boats well, especially when combined with proper covers and preparation. We will help you decide based on your yacht and plans.' },
        { q: 'Is the storage secure?', a: 'Yes. The outdoor yard is fenced, and both the indoor hall and the yard are under video surveillance with motion detection. If the cameras detect any movement, an alarm is sent instantly to our phone, where the footage can be reviewed straight away.' },
        { q: 'Can work be done on the yacht during the winter?', a: 'Yes. Winter is an ideal time for polishing, detailing and gelcoat repairs, so the yacht leaves storage ready for the season.' },
        { q: 'Where is the storage located?', a: 'Contact us for the exact location, availability and pricing for the coming season.' },
        { q: 'When should I book winter storage?', a: 'Storage space is limited, so contact us in late summer or early autumn to discuss availability, the right option and pricing for your yacht.' },
      ],
      me: [
        { q: 'Hala ili otvoreni plac — šta da izaberem?', a: 'Smještaj u hali pruža najveću zaštitu od vremenskih uslova i sunca. Ograđeni otvoreni plac dobro odgovara mnogim jahtama i čamcima, naročito uz odgovarajuće cerade i pripremu. Pomoći ćemo vam da odlučite prema jahti i vašim planovima.' },
        { q: 'Da li je smještaj obezbijeđen?', a: 'Da. Otvoreni plac je ograđen, a i hala i plac su pod video nadzorom sa detekcijom pokreta. Ako kamere registruju bilo kakav pokret, alarm odmah stiže na naš telefon, gdje se snimak može odmah pregledati.' },
        { q: 'Mogu li se tokom zime raditi radovi na jahti?', a: 'Mogu. Zima je idealno vrijeme za poliranje, detailing i popravke gelcoata, pa jahta iz smještaja izlazi spremna za sezonu.' },
        { q: 'Gdje se nalazi smještaj?', a: 'Kontaktirajte nas za tačnu lokaciju, raspoloživost i cijene za narednu sezonu.' },
        { q: 'Kada treba rezervisati zimski smještaj?', a: 'Prostor za smještaj je ograničen, pa nam se javite krajem ljeta ili početkom jeseni radi raspoloživosti, izbora opcije i cijene za vašu jahtu.' },
      ],
    },
    related: ['maintenance', 'detailing', 'repairs'],
  },
};

export const SERVICE_LIST = Object.values(SERVICES);

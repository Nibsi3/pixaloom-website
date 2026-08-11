export type Province = {
  slug: string;
  name: string;
  capital: string;
  lead: string;
  opportunity: string;
  sectors: string[];
  towns: string[];
};

export const provinces: Province[] = [
  {
    slug: 'western-cape', name: 'Western Cape', capital: 'Cape Town',
    lead: 'From established Cape Town firms to owner-run Garden Route businesses, Western Cape buyers expect polished mobile experiences and visible proof of quality.',
    opportunity: 'Pixaloom is based in George, giving Garden Route clients a local partner while serving Cape Town, the Winelands, Overberg, West Coast and Central Karoo remotely.',
    sectors: ['Tourism and hospitality', 'Professional services', 'Property and construction', 'Agriculture and exports'],
    towns: ['Cape Town', 'George', 'Stellenbosch', 'Paarl', 'Worcester', 'Mossel Bay', 'Knysna', 'Plettenberg Bay', 'Oudtshoorn', 'Wilderness', 'Somerset West', 'Hermanus', 'Swellendam', 'Bredasdorp', 'Caledon', 'Robertson', 'Montagu', 'Ceres', 'Tulbagh', 'Wellington', 'Malmesbury', 'Darling', 'Saldanha', 'Vredenburg', 'Langebaan', 'Piketberg', 'Clanwilliam', 'Vredendal', 'Beaufort West', 'Prince Albert', 'Riversdale', 'Heidelberg', 'Moorreesburg', 'Velddrif'],
  },
  {
    slug: 'gauteng', name: 'Gauteng', capital: 'Johannesburg',
    lead: 'Gauteng is South Africa’s densest commercial market. Search results are competitive and visitors compare credibility, clarity and speed in seconds.',
    opportunity: 'We build focused B2B, professional-service, ecommerce and product experiences designed to compete in Johannesburg, Pretoria and the wider Gauteng city region.',
    sectors: ['B2B and professional services', 'Finance and technology', 'Retail and ecommerce', 'Industrial and logistics'],
    towns: ['Johannesburg', 'Pretoria', 'Sandton', 'Midrand', 'Centurion', 'Randburg', 'Roodepoort', 'Soweto', 'Alberton', 'Germiston', 'Boksburg', 'Benoni', 'Brakpan', 'Springs', 'Kempton Park', 'Edenvale', 'Bedfordview', 'Vanderbijlpark', 'Vereeniging', 'Meyerton', 'Heidelberg', 'Krugersdorp', 'Randfontein', 'Westonaria', 'Carletonville', 'Bronkhorstspruit', 'Cullinan', 'Hammanskraal', 'Akasia'],
  },
  {
    slug: 'kwazulu-natal', name: 'KwaZulu-Natal', capital: 'Pietermaritzburg',
    lead: 'KwaZulu-Natal combines a major metro economy, busy logistics corridors, tourism destinations and fast-growing secondary towns.',
    opportunity: 'Strong service pages, mobile-first enquiry paths and regional content help KZN businesses reach both nearby customers and national buyers.',
    sectors: ['Tourism and accommodation', 'Manufacturing and logistics', 'Professional services', 'Retail and local services'],
    towns: ['Durban', 'Pietermaritzburg', 'Umhlanga', 'Pinetown', 'Westville', 'Amanzimtoti', 'Ballito', 'KwaDukuza', 'Salt Rock', 'Richards Bay', 'Empangeni', 'Mtubatuba', 'Hluhluwe', 'St Lucia', 'Newcastle', 'Ladysmith', 'Dundee', 'Vryheid', 'Ulundi', 'Eshowe', 'Greytown', 'Howick', 'Hilton', 'Mooi River', 'Estcourt', 'Underberg', 'Kokstad', 'Port Shepstone', 'Margate', 'Scottburgh', 'Shelly Beach', 'Ixopo'],
  },
  {
    slug: 'eastern-cape', name: 'Eastern Cape', capital: 'Bhisho',
    lead: 'The Eastern Cape spans major metros, manufacturing centres, universities, tourism towns and widely distributed service markets.',
    opportunity: 'A fast, low-friction website is especially valuable when customers rely on mobile connections and need immediate confidence before making contact.',
    sectors: ['Automotive and manufacturing', 'Education and training', 'Tourism and hospitality', 'Agriculture and professional services'],
    towns: ['Gqeberha', 'East London', 'Mthatha', 'Bhisho', 'Qonce', 'Kariega', 'Despatch', 'Jeffreys Bay', 'Humansdorp', 'Grahamstown / Makhanda', 'Port Alfred', 'Bathurst', 'Kenton-on-Sea', 'Graaff-Reinet', 'Cradock', 'Somerset East', 'Komani', 'Aliwal North', 'Burgersdorp', 'Butterworth', 'Dutywa', 'Cofimvaba', 'Engcobo', 'Lusikisiki', 'Port St Johns', 'Bizana', 'Matatiele', 'Stutterheim', 'Fort Beaufort'],
  },
  {
    slug: 'free-state', name: 'Free State', capital: 'Bloemfontein',
    lead: 'Free State businesses often serve broad geographic markets where clear service information and dependable mobile performance matter more than visual noise.',
    opportunity: 'We create credible sites for professional practices, agricultural businesses, tourism operators, educators and growing local brands.',
    sectors: ['Agriculture and agri-services', 'Professional services', 'Education', 'Tourism and accommodation'],
    towns: ['Bloemfontein', 'Welkom', 'Sasolburg', 'Parys', 'Kroonstad', 'Bethlehem', 'Clarens', 'Harrismith', 'Phuthaditjhaba', 'Ficksburg', 'Ladybrand', 'Fouriesburg', 'Reitz', 'Frankfort', 'Villiers', 'Heilbron', 'Virginia', 'Hennenman', 'Odendaalsrus', 'Bothaville', 'Wesselsbron', 'Bultfontein', 'Trompsburg', 'Jagersfontein', 'Smithfield', 'Zastron'],
  },
  {
    slug: 'limpopo', name: 'Limpopo', capital: 'Polokwane',
    lead: 'Limpopo’s economy connects provincial business centres with mining, agriculture, tourism and cross-border trade.',
    opportunity: 'A well-structured website can make a specialist business discoverable beyond its immediate town while keeping local calls and WhatsApp enquiries effortless.',
    sectors: ['Mining and industrial services', 'Agriculture', 'Tourism and lodges', 'Retail and professional services'],
    towns: ['Polokwane', 'Tzaneen', 'Mokopane', 'Makhado', 'Musina', 'Thohoyandou', 'Giyani', 'Phalaborwa', 'Hoedspruit', 'Bela-Bela', 'Modimolle', 'Lephalale', 'Thabazimbi', 'Burgersfort', 'Jane Furse', 'Groblersdal', 'Marble Hall', 'Lebowakgomo', 'Dendron', 'Alldays', 'Louis Trichardt', 'Vuwani', 'Malamulele'],
  },
  {
    slug: 'mpumalanga', name: 'Mpumalanga', capital: 'Mbombela',
    lead: 'Mpumalanga brings together tourism gateways, farming regions, energy and mining centres, manufacturing and cross-border commerce.',
    opportunity: 'We help businesses translate operational credibility into a clear digital experience for local customers, procurement teams and visitors.',
    sectors: ['Tourism and hospitality', 'Energy and mining', 'Agriculture and forestry', 'Industrial and local services'],
    towns: ['Mbombela', 'White River', 'Hazyview', 'Sabie', 'Graskop', 'Lydenburg / Mashishing', 'Barberton', 'Komatipoort', 'Malalane', 'Emalahleni', 'Middelburg', 'Delmas', 'Secunda', 'Ermelo', 'Standerton', 'Bethal', 'Carolina', 'Piet Retief / eMkhondo', 'Volksrust', 'Balfour', 'Dullstroom', 'Belfast / eMakhazeni', 'Kriel', 'Ogies'],
  },
  {
    slug: 'north-west', name: 'North West', capital: 'Mahikeng',
    lead: 'North West businesses operate across mining, agriculture, tourism and expanding urban markets with customers who often begin supplier research online.',
    opportunity: 'Search-led content and strong proof help regional firms compete for both local enquiries and larger commercial opportunities.',
    sectors: ['Mining and suppliers', 'Agriculture', 'Tourism and events', 'Professional and local services'],
    towns: ['Mahikeng', 'Rustenburg', 'Klerksdorp', 'Potchefstroom', 'Brits', 'Hartbeespoort', 'Lichtenburg', 'Zeerust', 'Vryburg', 'Schweizer-Reneke', 'Wolmaransstad', 'Orkney', 'Stilfontein', 'Ventersdorp', 'Coligny', 'Delareyville', 'Sannieshof', 'Taung', 'Mogwase', 'Sun City'],
  },
  {
    slug: 'northern-cape', name: 'Northern Cape', capital: 'Kimberley',
    lead: 'The Northern Cape’s distances make a clear, dependable website an especially important first point of contact for customers, travellers and procurement teams.',
    opportunity: 'We design lean sites that load quickly, establish trust and help specialised businesses serve markets far beyond their home town.',
    sectors: ['Mining and industrial supply', 'Renewable energy', 'Tourism and accommodation', 'Agriculture and logistics'],
    towns: ['Kimberley', 'Upington', 'Kuruman', 'Kathu', 'Postmasburg', 'Springbok', 'Calvinia', 'De Aar', 'Colesberg', 'Prieska', 'Douglas', 'Barkly West', 'Warrenton', 'Hartswater', 'Jan Kempdorp', 'Groblershoop', 'Kakamas', 'Keimoes', 'Pofadder', 'Aggeneys', 'Port Nolloth', 'Alexander Bay', 'Carnarvon', 'Sutherland', 'Victoria West', 'Hopetown'],
  },
];

export function getProvince(slug: string) {
  return provinces.find((province) => province.slug === slug);
}

export const allCoverageAreas = provinces.flatMap((province) => province.towns);

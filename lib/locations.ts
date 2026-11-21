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
    lead: 'Compare website design options for your Western Cape business. Work online with Cameron in George on service enquiries, accommodation bookings or an online shop.',
    opportunity: 'For a guesthouse, decide whether guests should check live room availability or ask for dates. Include the arrival instructions you currently send after a reservation.',
    sectors: ['Tourism and hospitality', 'Professional services', 'Property and construction', 'Agriculture and exports'],
    towns: ['Cape Town', 'George', 'Stellenbosch', 'Paarl', 'Worcester', 'Mossel Bay', 'Knysna', 'Plettenberg Bay', 'Oudtshoorn', 'Wilderness', 'Somerset West', 'Hermanus', 'Swellendam', 'Bredasdorp', 'Caledon', 'Robertson', 'Montagu', 'Ceres', 'Tulbagh', 'Wellington', 'Malmesbury', 'Darling', 'Saldanha', 'Vredenburg', 'Langebaan', 'Piketberg', 'Clanwilliam', 'Vredendal', 'Beaufort West', 'Prince Albert', 'Riversdale', 'Heidelberg', 'Moorreesburg', 'Velddrif'],
  },
  {
    slug: 'gauteng', name: 'Gauteng', capital: 'Johannesburg',
    lead: 'Plan a website for your Gauteng business with Pixaloom. Help buyers compare specifications, check delivery coverage and send a quote request to your sales team.',
    opportunity: 'For an industrial catalogue, bring a product sheet and a typical sales enquiry. These show which details can go on the product page and which questions belong on the quote form.',
    sectors: ['B2B and professional services', 'Finance and technology', 'Retail and ecommerce', 'Industrial and logistics'],
    towns: ['Johannesburg', 'Pretoria', 'Sandton', 'Midrand', 'Centurion', 'Randburg', 'Roodepoort', 'Soweto', 'Alberton', 'Germiston', 'Boksburg', 'Benoni', 'Brakpan', 'Springs', 'Kempton Park', 'Edenvale', 'Bedfordview', 'Vanderbijlpark', 'Vereeniging', 'Meyerton', 'Heidelberg', 'Krugersdorp', 'Randfontein', 'Westonaria', 'Carletonville', 'Bronkhorstspruit', 'Cullinan', 'Hammanskraal', 'Akasia'],
  },
  {
    slug: 'kwazulu-natal', name: 'KwaZulu-Natal', capital: 'Pietermaritzburg',
    lead: 'Plan a KwaZulu-Natal website for guest bookings or freight quotes. Work through availability, service areas and what staff need to confirm each request.',
    opportunity: 'For a freight quote, agree how dispatch will use the collection point, destination, load details and requested date. For accommodation, start with the dates and room options your booking service supports.',
    sectors: ['Tourism and accommodation', 'Manufacturing and logistics', 'Professional services', 'Retail and local services'],
    towns: ['Durban', 'Pietermaritzburg', 'Umhlanga', 'Pinetown', 'Westville', 'Amanzimtoti', 'Ballito', 'KwaDukuza', 'Salt Rock', 'Richards Bay', 'Empangeni', 'Mtubatuba', 'Hluhluwe', 'St Lucia', 'Newcastle', 'Ladysmith', 'Dundee', 'Vryheid', 'Ulundi', 'Eshowe', 'Greytown', 'Howick', 'Hilton', 'Mooi River', 'Estcourt', 'Underberg', 'Kokstad', 'Port Shepstone', 'Margate', 'Scottburgh', 'Shelly Beach', 'Ixopo'],
  },
  {
    slug: 'eastern-cape', name: 'Eastern Cape', capital: 'Bhisho',
    lead: 'Plan a website for an Eastern Cape practice, training provider or manufacturer. Make requirements easy to find and give customers a clear next step.',
    opportunity: 'For a training provider, bring one course outline, its admission requirements and the next intake date. These determine what a prospective student needs before sending an application enquiry.',
    sectors: ['Automotive and manufacturing', 'Education and training', 'Tourism and hospitality', 'Agriculture and professional services'],
    towns: ['Gqeberha', 'East London', 'Mthatha', 'Bhisho', 'Qonce', 'Kariega', 'Despatch', 'Jeffreys Bay', 'Humansdorp', 'Grahamstown / Makhanda', 'Port Alfred', 'Bathurst', 'Kenton-on-Sea', 'Graaff-Reinet', 'Cradock', 'Somerset East', 'Komani', 'Aliwal North', 'Burgersdorp', 'Butterworth', 'Dutywa', 'Cofimvaba', 'Engcobo', 'Lusikisiki', 'Port St Johns', 'Bizana', 'Matatiele', 'Stutterheim', 'Fort Beaufort'],
  },
  {
    slug: 'free-state', name: 'Free State', capital: 'Bloemfontein',
    lead: 'Plan a website for your Free State service business. Show which sites you visit, where customers can collect orders and what you need to quote remotely.',
    opportunity: 'For a mobile service, show an example job that needs a site visit and one you can quote from a photograph. The site can explain how each quote works before customers call.',
    sectors: ['Agriculture and agri-services', 'Professional services', 'Education', 'Tourism and accommodation'],
    towns: ['Bloemfontein', 'Welkom', 'Sasolburg', 'Parys', 'Kroonstad', 'Bethlehem', 'Clarens', 'Harrismith', 'Phuthaditjhaba', 'Ficksburg', 'Ladybrand', 'Fouriesburg', 'Reitz', 'Frankfort', 'Villiers', 'Heilbron', 'Virginia', 'Hennenman', 'Odendaalsrus', 'Bothaville', 'Wesselsbron', 'Bultfontein', 'Trompsburg', 'Jagersfontein', 'Smithfield', 'Zastron'],
  },
  {
    slug: 'limpopo', name: 'Limpopo', capital: 'Polokwane',
    lead: 'Plan a Limpopo lodge or supplier website. Help guests check access and dates, or buyers find specifications and delivery details before they enquire.',
    opportunity: 'For a lodge, start with the directions and access questions guests ask before arrival. Put them beside the booking details so guests can judge whether the stay suits them.',
    sectors: ['Mining and industrial services', 'Agriculture', 'Tourism and lodges', 'Retail and professional services'],
    towns: ['Polokwane', 'Tzaneen', 'Mokopane', 'Makhado', 'Musina', 'Thohoyandou', 'Giyani', 'Phalaborwa', 'Hoedspruit', 'Bela-Bela', 'Modimolle', 'Lephalale', 'Thabazimbi', 'Burgersfort', 'Jane Furse', 'Groblersdal', 'Marble Hall', 'Lebowakgomo', 'Dendron', 'Alldays', 'Louis Trichardt', 'Vuwani', 'Malamulele'],
  },
  {
    slug: 'mpumalanga', name: 'Mpumalanga', capital: 'Mbombela',
    lead: 'Plan a website for a Mpumalanga activity operator or supplier. Map booking and quote requests to the staff who confirm capacity, stock and dates.',
    opportunity: 'For an activity operator, list the group size, collection point and restrictions for one departure. Agree who confirms the date when the operator uses a separate booking system.',
    sectors: ['Tourism and hospitality', 'Energy and mining', 'Agriculture and forestry', 'Industrial and local services'],
    towns: ['Mbombela', 'White River', 'Hazyview', 'Sabie', 'Graskop', 'Lydenburg / Mashishing', 'Barberton', 'Komatipoort', 'Malalane', 'Emalahleni', 'Middelburg', 'Delmas', 'Secunda', 'Ermelo', 'Standerton', 'Bethal', 'Carolina', 'Piet Retief / eMkhondo', 'Volksrust', 'Balfour', 'Dullstroom', 'Belfast / eMakhazeni', 'Kriel', 'Ogies'],
  },
  {
    slug: 'north-west', name: 'North West', capital: 'Mahikeng',
    lead: 'Plan a website for your North West business. Help procurement teams check capabilities, see approved project examples and request a suitable quote.',
    opportunity: 'For a contracting firm, choose a completed job you have permission to show. Pair the relevant capability with an explanation of what your estimator needs to price a similar job.',
    sectors: ['Mining and suppliers', 'Agriculture', 'Tourism and events', 'Professional and local services'],
    towns: ['Mahikeng', 'Rustenburg', 'Klerksdorp', 'Potchefstroom', 'Brits', 'Hartbeespoort', 'Lichtenburg', 'Zeerust', 'Vryburg', 'Schweizer-Reneke', 'Wolmaransstad', 'Orkney', 'Stilfontein', 'Ventersdorp', 'Coligny', 'Delareyville', 'Sannieshof', 'Taung', 'Mogwase', 'Sun City'],
  },
  {
    slug: 'northern-cape', name: 'Northern Cape', capital: 'Kimberley',
    lead: 'Plan a Northern Cape website that helps buyers check collection points, delivery coverage and appointment requirements before making a long trip.',
    opportunity: 'For a business with a depot, bring a typical collection order. Show the hours, vehicle access and collection instructions customers need before travelling.',
    sectors: ['Mining and industrial supply', 'Renewable energy', 'Tourism and accommodation', 'Agriculture and logistics'],
    towns: ['Kimberley', 'Upington', 'Kuruman', 'Kathu', 'Postmasburg', 'Springbok', 'Calvinia', 'De Aar', 'Colesberg', 'Prieska', 'Douglas', 'Barkly West', 'Warrenton', 'Hartswater', 'Jan Kempdorp', 'Groblershoop', 'Kakamas', 'Keimoes', 'Pofadder', 'Aggeneys', 'Port Nolloth', 'Alexander Bay', 'Carnarvon', 'Sutherland', 'Victoria West', 'Hopetown'],
  },
];

export function getProvince(slug: string) {
  return provinces.find((province) => province.slug === slug);
}

export const localHubs = [
  {
    slug: 'george',
    name: 'George',
    href: '/locations/george',
    label: 'Studio base',
    summary: 'See how a George pet-care business takes booking enquiries, check five-page website prices and discuss your own site with Cameron online.',
  },
  {
    slug: 'garden-route',
    name: 'Garden Route',
    href: '/locations/garden-route',
    label: 'Home region',
    summary: 'Websites for tourism, hospitality, trades and professional services from Mossel Bay through Knysna and Plettenberg Bay.',
  },
] as const;

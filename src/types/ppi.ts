// PPI Domain Types
export interface SubIndicator {
  key: string;
  weight: number;
  unit: string;
  tooltip: string;
  invert?: boolean;
}

export interface Domain {
  short: string;
  weight: number;
  color: string;
  sub_indicators: Record<string, SubIndicator>;
}

export interface DomainScores {
  [key: string]: number;
}

export interface StateRecord {
  name: string;
  year: number;
  era: 'BC' | 'AD';
  reign_length: number;
  indicators: Record<string, number>;
  domain_scores?: DomainScores;
  ppi?: number;
  percentile?: number;
}

export interface EmpireData {
  name: string;
  year: number;
  era: 'BC' | 'AD';
  ppi: number;
  domainScores: DomainScores;
  description: string;
}

export const DOMAINS: Record<string, Domain> = {
  "Military Power": {
    short: "M",
    weight: 0.25,
    color: "#ef4444",
    sub_indicators: {
      "Manpower": { key: "M_manpower", weight: 0.25, unit: "soldiers", tooltip: "Total military personnel" },
      "Battlefield Success": { key: "M_battlefield_success", weight: 0.20, unit: "ratio", tooltip: "Win/loss ratio" },
      "Navy Strength": { key: "M_navy_strength", weight: 0.15, unit: "tonnage", tooltip: "Naval tonnage" },
      "Military Technology": { key: "M_mil_tech", weight: 0.20, unit: "0-100", tooltip: "Technology adoption" },
      "Logistics & Projection": { key: "M_logistics", weight: 0.10, unit: "0-100", tooltip: "Power projection capacity" },
      "Force Range": { key: "M_range", weight: 0.10, unit: "km", tooltip: "Maximum deployment distance" }
    }
  },
  "Territorial Control": {
    short: "T",
    weight: 0.15,
    color: "#f97316",
    sub_indicators: {
      "Territory Size": { key: "T_size", weight: 0.50, unit: "km²", tooltip: "Land area under control" },
      "Population Coverage": { key: "T_pop_share", weight: 0.30, unit: "%", tooltip: "Share of world population" },
      "Border Contiguity": { key: "T_contiguity", weight: 0.10, unit: "0-100", tooltip: "Territorial cohesion" },
      "Number of Provinces": { key: "T_provinces", weight: 0.10, unit: "count", tooltip: "Administrative provinces" }
    }
  },
  "Economic Power": {
    short: "E",
    weight: 0.20,
    color: "#22c55e",
    sub_indicators: {
      "GDP/Production": { key: "E_gdp", weight: 0.40, unit: "currency", tooltip: "Total GDP" },
      "GDP Share": { key: "E_gdp_share", weight: 0.20, unit: "%", tooltip: "Share of world GDP" },
      "Trade Volume": { key: "E_trade", weight: 0.15, unit: "currency", tooltip: "Total trade" },
      "Industrial Capacity": { key: "E_industry", weight: 0.10, unit: "tons", tooltip: "Industrial output" },
      "Natural Resources": { key: "E_resources", weight: 0.10, unit: "0-100", tooltip: "Resource wealth" },
      "Currency/Finance": { key: "E_finance", weight: 0.05, unit: "0-100", tooltip: "Financial centrality" }
    }
  },
  "Demographics": {
    short: "DEM",
    weight: 0.10,
    color: "#3b82f6",
    sub_indicators: {
      "Total Population": { key: "DEM_pop", weight: 0.50, unit: "people", tooltip: "Total population" },
      "Population Density": { key: "DEM_density", weight: 0.15, unit: "people/km²", tooltip: "People per km²" },
      "Growth Rate": { key: "DEM_growth", weight: 0.15, unit: "%", tooltip: "Annual growth rate" },
      "Urbanization": { key: "DEM_urban", weight: 0.20, unit: "%", tooltip: "Urban population share" }
    }
  },
  "Administrative Capacity": {
    short: "AD",
    weight: 0.10,
    color: "#a855f7",
    sub_indicators: {
      "Tax Revenue/GDP": { key: "AD_tax", weight: 0.25, unit: "%", tooltip: "Tax as % of GDP" },
      "Bureaucracy Size": { key: "AD_bureaucracy", weight: 0.25, unit: "per 1000", tooltip: "Officials per 1000 people" },
      "Internal Security": { key: "AD_security", weight: 0.20, unit: "0-100", tooltip: "Internal order capacity" },
      "Infrastructure Network": { key: "AD_infra", weight: 0.15, unit: "km", tooltip: "Roads/communications" },
      "Legal/Institutional Reach": { key: "AD_law", weight: 0.15, unit: "%", tooltip: "Uniform law coverage" }
    }
  },
  "Technology & Science": {
    short: "TS",
    weight: 0.10,
    color: "#06b6d4",
    sub_indicators: {
      "Innovation Output": { key: "TS_innov", weight: 0.25, unit: "count", tooltip: "Major inventions" },
      "Education/Literacy": { key: "TS_literacy", weight: 0.25, unit: "%", tooltip: "Literacy rate" },
      "Science Funding": { key: "TS_science", weight: 0.20, unit: "% GDP", tooltip: "Research expenditure" },
      "Industrial Technology": { key: "TS_ind_tech", weight: 0.15, unit: "0-100", tooltip: "Tech adoption" },
      "Arms Technology": { key: "TS_arms_tech", weight: 0.15, unit: "0-100", tooltip: "Military tech level" }
    }
  },
  "Cultural Influence": {
    short: "CI",
    weight: 0.05,
    color: "#ec4899",
    sub_indicators: {
      "Religion/Ideology Spread": { key: "CI_religion", weight: 0.40, unit: "%", tooltip: "Dominant religion followers" },
      "Language/Culture Export": { key: "CI_language", weight: 0.30, unit: "regions", tooltip: "Cultural reach" },
      "Artistic Output": { key: "CI_art", weight: 0.20, unit: "count", tooltip: "Influential works" },
      "Global Influence Index": { key: "CI_index", weight: 0.10, unit: "0-100", tooltip: "Composite influence" }
    }
  },
  "Diplomacy & Hegemony": {
    short: "DH",
    weight: 0.05,
    color: "#eab308",
    sub_indicators: {
      "Alliances/Client States": { key: "DH_alliances", weight: 0.40, unit: "count", tooltip: "Formal allies" },
      "Coalition Leadership": { key: "DH_coalitions", weight: 0.25, unit: "count", tooltip: "Coalitions led" },
      "Diplomatic Missions": { key: "DH_missions", weight: 0.25, unit: "count", tooltip: "Embassies abroad" },
      "Colonial Diplomacy": { key: "DH_colonial", weight: 0.10, unit: "0-100", tooltip: "Diplomatic leverage" }
    }
  },
  "Internal Stability": {
    short: "IS",
    weight: 0.05,
    color: "#6b7280",
    sub_indicators: {
      "Civil Unrest Frequency": { key: "IS_unrest", weight: 0.30, unit: "events/decade", tooltip: "Rebellions per decade", invert: true },
      "Duration of Peace": { key: "IS_peace", weight: 0.30, unit: "years", tooltip: "Years since civil war" },
      "Famine/Pandemic Impact": { key: "IS_disasters", weight: 0.20, unit: "deaths/million", tooltip: "Disaster deaths", invert: true },
      "Regime Durability": { key: "IS_regime", weight: 0.20, unit: "years", tooltip: "Continuous rule" }
    }
  }
};

// Sample Empire Data for Case Studies
export const EMPIRE_DATA: EmpireData[] = [
  {
    name: "Roman Empire",
    year: 117,
    era: "AD",
    ppi: 84.2,
    domainScores: {
      "Military Power": 22.1,
      "Economic Power": 18.3,
      "Territorial Control": 13.8,
      "Demographics": 8.5,
      "Administrative Capacity": 9.2,
      "Technology & Science": 7.8,
      "Cultural Influence": 4.5,
      "Diplomacy & Hegemony": 4.2,
      "Internal Stability": 3.8
    },
    description: "Peak under Trajan. Largest territorial extent, professional military, extensive road network."
  },
  {
    name: "Han Dynasty",
    year: 100,
    era: "AD",
    ppi: 82.7,
    domainScores: {
      "Military Power": 21.5,
      "Economic Power": 19.1,
      "Territorial Control": 12.9,
      "Demographics": 8.8,
      "Administrative Capacity": 8.9,
      "Technology & Science": 8.2,
      "Cultural Influence": 4.3,
      "Diplomacy & Hegemony": 3.9,
      "Internal Stability": 4.1
    },
    description: "Eastern Han peak. Advanced bureaucracy, Silk Road trade, technological innovation."
  },
  {
    name: "Mongol Empire",
    year: 1279,
    era: "AD",
    ppi: 88.5,
    domainScores: {
      "Military Power": 24.3,
      "Economic Power": 15.2,
      "Territorial Control": 14.8,
      "Demographics": 7.9,
      "Administrative Capacity": 7.5,
      "Technology & Science": 6.8,
      "Cultural Influence": 3.9,
      "Diplomacy & Hegemony": 4.8,
      "Internal Stability": 3.3
    },
    description: "Largest contiguous land empire. Unmatched military mobility and territorial control."
  },
  {
    name: "Ottoman Empire",
    year: 1683,
    era: "AD",
    ppi: 79.1,
    domainScores: {
      "Military Power": 20.8,
      "Economic Power": 16.4,
      "Territorial Control": 12.1,
      "Demographics": 8.2,
      "Administrative Capacity": 8.7,
      "Technology & Science": 6.5,
      "Cultural Influence": 4.1,
      "Diplomacy & Hegemony": 4.3,
      "Internal Stability": 4.0
    },
    description: "Peak under Mehmed IV. Janissary corps, vast territories spanning three continents."
  },
  {
    name: "British Empire",
    year: 1920,
    era: "AD",
    ppi: 91.3,
    domainScores: {
      "Military Power": 23.7,
      "Economic Power": 19.8,
      "Territorial Control": 14.9,
      "Demographics": 9.1,
      "Administrative Capacity": 9.5,
      "Technology & Science": 9.2,
      "Cultural Influence": 4.7,
      "Diplomacy & Hegemony": 4.9,
      "Internal Stability": 4.5
    },
    description: "Peak territorial extent. Industrial supremacy, global naval dominance."
  },
  {
    name: "United States",
    year: 1991,
    era: "AD",
    ppi: 87.6,
    domainScores: {
      "Military Power": 24.1,
      "Economic Power": 20.0,
      "Territorial Control": 9.2,
      "Demographics": 9.3,
      "Administrative Capacity": 9.0,
      "Technology & Science": 9.8,
      "Cultural Influence": 4.8,
      "Diplomacy & Hegemony": 4.7,
      "Internal Stability": 4.7
    },
    description: "Post-Cold War unipolar moment. Technological and economic supremacy."
  }
];

// Domain descriptions for UI
export const DOMAIN_DESCRIPTIONS: Record<string, string> = {
  "Military Power": "Force size, technology, logistics, and power projection capacity.",
  "Economic Power": "GDP, trade volume, industrial capacity, and resource control.",
  "Territorial Control": "Geographic extent, population coverage, and administrative reach.",
  "Demographics": "Population size, density, growth, and urbanization levels.",
  "Administrative Capacity": "State effectiveness, tax collection, bureaucracy, and infrastructure.",
  "Technology & Science": "Innovation output, literacy, and technical advancement.",
  "Cultural Influence": "Religion/ideology spread, language, and artistic impact.",
  "Diplomacy & Hegemony": "Alliance networks, client states, and diplomatic leverage.",
  "Internal Stability": "Civil order, regime durability, and social cohesion."
};

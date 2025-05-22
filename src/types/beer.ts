// Common
interface Measurement {
  value: number;
  unit: string;
}

interface Temperature {
  value: number;
  unit: string;
}

// Methods
interface MashTemp {
  temp: Temperature;
  duration: number;
}

interface Fermentation {
  temp: Temperature;
}

interface Method {
  mash_temp: MashTemp[];
  fermentation: Fermentation;
  twist: string | null;
}

// Ingredients
interface MaltIngredient {
  name: string;
  amount: Measurement;
}

interface HopIngredient {
  name: string;
  amount: Measurement;
  add: string; 
  attribute: string; 
}

interface Ingredients {
  malt: MaltIngredient[];
  hops: HopIngredient[];
  yeast: string;
}

// Main beer response interface
export interface Beer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: Measurement;
  boil_volume: Measurement;
  method: Method;
  ingredients: Ingredients;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}
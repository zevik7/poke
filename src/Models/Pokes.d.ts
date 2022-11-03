export type Poke = {
  name: string
  url: string
}

export type PokeDetail = {
  abilities: Ability[]
  base_experience: number
  forms: []
  game_indices: []
  height: number
  held_items: []
  id: number
  is_default: true
  location_area_encounters: string
  moves: []
  name: string
  order: number
  past_types: []
  species: {}
  sprites: {}
  stats: Stat[]
  types: PokeType[]
  weight: number
}

export type PokeType = {
  slot: number
  type: { name: string; url: string }
}

export type Ability = {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export type Stat = {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

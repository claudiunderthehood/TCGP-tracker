export interface Card {
  ID: string;
  Name: string;
  Pack: string;
  Rarity: string;
  Owned: boolean;
  PositionProbabilities: {
    "1-3": number;
    "4": number;
    "5": number;
  };
}

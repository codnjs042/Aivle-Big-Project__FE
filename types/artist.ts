export const Artist = {
  NEWJEANS: 1 << 0,  // 1
  BTS: 1 << 1,       // 2
  NCT_DREAM: 1 << 2, // 4
  BLACKPINK: 1 << 3, // 8
  AESPA: 1 << 4,     // 16
  IVE: 1 << 5,       // 32
  NCT_127: 1 << 6,   // 64
  SEVENTEEN: 1 << 7  // 128
};

export const artistList = Object.entries(Artist).map(([name, value]) => ({
  name,
  value
}));

export const getArtistsFromValue = (value: number) => {
  return artistList.filter(artist => artist.value & value);
}
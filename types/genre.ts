export const Genre = {
  RomanceMelo: 1 << 0,  // 1
  Comedy: 1 << 1,       // 2
  Fantasy: 1 << 2, // 4
  Historical: 1 << 3, // 8
  Old7080: 1 << 4,     // 16
  Horror: 1 << 5,       // 32
  Action: 1 << 6,   // 64
  Drama: 1 << 7  // 128
};

export const genreList = Object.entries(Genre).map(([name, value]) => ({
  name,
  value
}));
export const Genre = {
  RomanceMelo: 1 << 0,  // 1
  Comedy: 1 << 1,       // 2
  Fantasy: 1 << 2, // 4
  Historical: 1 << 3, // 8
  Revenge: 1 << 4,     // 16
  Thiller: 1 << 5,       // 32
  Action: 1 << 6,   // 64
};

export const genreList = Object.entries(Genre).map(([name, value]) => ({
  name,
  value
}));

export const getGenresFromValue = (value: number) => {
  return genreList.filter(genre => genre.value & value);
}
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32826694-227c236c87c03694788342456';

export const getImages = searchText => {
  return fetch(
    `${BASE_URL}?q=${searchText}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};

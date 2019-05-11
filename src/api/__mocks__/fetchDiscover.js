import { mockUncleanMovie } from '../mockData';

const fetchDiscover = jest.fn().mockImplementation(() => 
  Promise.resolve(mockUncleanMovie));


export default fetchDiscover;
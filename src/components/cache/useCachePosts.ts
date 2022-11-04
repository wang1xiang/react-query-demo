import axios from 'axios';
import { useQuery } from 'react-query';

export default function useCachePosts() {
  return useQuery('posts', () => axios.get('https://jsonplaceholder.typicode.com/posts'), {
    select: (res) => res.data,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
}

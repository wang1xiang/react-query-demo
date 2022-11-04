import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import useCachePosts from '../cache/useCachePosts';

type dataType = {
  id: number
  title: string
}
const QueryKeys = () => {
  const [id, setId] = useState(1);
  const { data: postsData } = useCachePosts();
  const { data, isLoading, isError } = useQuery(['posts', id], ({ queryKey }) => axios.get(`https://jsonplaceholder.typicode.com/posts/${[queryKey[1]]}`), {
    select: (res) => res.data as unknown as dataType,
  })


  if (isError) {
    return <div>error</div>;
  }
  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <>
      <ul>
        <li key={data?.id}>{data?.title}</li>
      </ul>
      <button onClick={() => setId(data?.id! + 1)}>change</button>
      <button onClick={() => setId(data?.id! - 1)}>back</button>
    </>
  )
}

export default QueryKeys
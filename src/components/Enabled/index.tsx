import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';

type dataType = {
  id: string
  title: string
}
const Enabled = () => {
  // 访问App QueryClientProvider提供的client
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery('posts', () => axios.get('https://jsonplaceholder.typicode.com/posts'), {
    select: (res) => res.data as unknown as dataType[],
  })

  const userId = data?.[0]?.id;
  // Then get the user's projects
  const { data: posts } = useQuery(
    ["posts", userId],
    () => axios.get('http://jsonplaceholder.typicode.com/posts/1'),
    {
      // 直到`userId`存在，查询才会被执行
      enabled: !!userId
    },
  );
  const [refetchInterval, setRefetchInterval] = useState(false);
  // refetchInterval轮询
  const { data: posts1 } = useQuery(
    ["posts1"],
    () => axios.get('http://jsonplaceholder.typicode.com/posts'),
    {
      enabled: !refetchInterval,
      refetchInterval: 3000
    },
  );

  if (isError) {
    return <div>error</div>;
  }
  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <>
      <ul>
        {data?.map(d => <li key={d.id}>{d.title}</li>)}
      </ul>
      <button onClick={() => setRefetchInterval(true)}>stop refetchInterval</button>
    </>
  )
}

export default Enabled
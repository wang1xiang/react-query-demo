import axios from 'axios';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

type dataType = {
  id: string
  title: string
}
const Demo1 = () => {
  // 访问App QueryClientProvider提供的client
  const queryClient = useQueryClient();
  const query = useQuery('posts', () => axios.get('https://jsonplaceholder.typicode.com/posts'))
  // console.log(query);
  const { data, isLoading, isError, isFetching, refetch } = query;
  useEffect(() => {
    setTimeout(() => refetch(), 3000)
    console.log(queryClient.getQueryCache())
  }, [])
  // 第一次打印true true 第二次打印false true
  console.log(isLoading, isFetching)

  const mutation = useMutation(() => axios.delete('https://jsonplaceholder.typicode.com/posts/1'), {
    onSuccess: () => {
      // 错误处理和刷新
      queryClient.invalidateQueries('posts')
    },
  })
  console.log(mutation)
  
  if (isError) {
    return <div>error</div>;
  }
  if (isLoading) {
    return <div>loading</div>;
  }
  
  return (
    <>
      <button
        onClick={() => {
          mutation.mutate()
        }}
      >
        Delete
      </button>
    <ul>
      {(data?.data as unknown as dataType[])?.map(d => <li key={d.id}>{d.title}</li>)}
    </ul>
    </>
  )
}

export default Demo1
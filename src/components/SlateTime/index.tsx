import useCachePosts from '../cache/useCachePosts';

type dataType = {
  id: string
  title: string
}
const SlateTime = () => {
  const { data, isLoading, isError } = useCachePosts();
  
  if (isError) {
    return <div>error</div>;
  }
  if (isLoading) {
    return <div>loading</div>;
  }
  
  return (
    <ul>
      {(data as unknown as dataType[])?.map(d => <li key={d.id}>{d.title}</li>)}
    </ul>
  )
}

export default SlateTime
import './App.css'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Demo1 from './components/Demo1'
import Enabled from './components/Enabled'
import SlateTime from './components/SlateTime'
import SlateTime1 from './components/SlateTime/index1'
import QueryKeys from './components/QueryKeys/index';

// 创建一个 client
const queryClient = new QueryClient()
function App() {
  return (
    // 提供client
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' ? (
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      ) : (
        ''
      )}
      {/* useQuery和useMutation使用 */}
      {/* <Demo1 /> */}
      {/* query-keys */}
      {/* <QueryKeys /> */}
      {/* Enabled使用 */}
      <Enabled />
      {/* SlateTime使用 */}
      {/* <SlateTime /><SlateTime1 /> */}
    </QueryClientProvider>
  )
}

export default App

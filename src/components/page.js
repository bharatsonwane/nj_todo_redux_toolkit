import Link from 'next/link'
import { useSelector } from 'react-redux'


function Page({ linkTo, NavigateTo, title }) {
  const reducerState = useSelector((state) => state)
  const placeholderData = reducerState.testReducer.placeholderData

  const error = useSelector((state) => state.error)
  const light = useSelector((state) => state.light)
  // const lastUpdate = useSelector((state) => state.lastUpdate)
  return (
    <div>
      <h1>{title}</h1>
  
      <nav>
        <Link href={linkTo}>
          <a>Navigate: {NavigateTo}</a>
        </Link>
      </nav>
      {placeholderData && (
        <pre>
          <code>{JSON.stringify(placeholderData, null, 2)}</code>
        </pre>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  )
}

export default Page

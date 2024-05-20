import { Tabs } from './components'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: red;
  background-color: yellow;
`

function App() {
  return (
    <Wrapper>
      <div className="App">
        <h1>React Tabs Example</h1>
        <Tabs />
      </div>
    </Wrapper>
  )
}

export default App

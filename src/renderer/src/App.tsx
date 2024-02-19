import { useMemo, useState } from 'react'
import { Section, Sidebar } from './components/sidebar/Sidebar'
import { Acquisition } from './components/sections/Acquisition'
import { Remainder } from './components/sections/Remainder'
import { Amortization } from './components/sections/Amortization'

function App(): JSX.Element {
  const [openedSection, setOpenedSection] = useState<Section>('')

  const getSection = useMemo(() => {
    switch (openedSection) {
      case 'acquisition':
        return <Acquisition />
      case 'remainder':
        return <Remainder />
      case 'amortization':
        return <Amortization />
      default:
        return ''
    }
  }, [openedSection])

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100vw',
          height: '100vh',
          padding: 0,
          margin: 0
        }}
      >
        <div
          style={{
            padding: 0,
            margin: 0,
            paddingTop: '20px',
            width: 'fit-content'
          }}
        >
          <Sidebar openedSection={openedSection} setOpenedSection={setOpenedSection} />
        </div>
        {!!openedSection && (
          <div
            style={{
              padding: 0,
              margin: 0,
              height: '100%',
              width: '100%',
              backgroundColor: '#f0f0f0'
            }}
          >
            {getSection}
          </div>
        )}
      </div>
    </>
  )
}

export default App

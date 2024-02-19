import { Dispatch, FC, SetStateAction } from 'react'
import '../../style/menu-item.css'
import { Section } from './Sidebar'

type Props = {
  label: string
  to: Section
  openedSection: Section
  setOpenedSection: Dispatch<SetStateAction<Section>>
}

export const MenuItem: FC<Props> = ({ label, to, openedSection, setOpenedSection }) => {
  const active = openedSection === to
  return (
    <div
      onClick={() => setOpenedSection(to)}
      className="menu-item"
      style={{
        backgroundColor: active ? '#f0f0f0' : 'transparent'
      }}
    >
      {label}
    </div>
  )
}

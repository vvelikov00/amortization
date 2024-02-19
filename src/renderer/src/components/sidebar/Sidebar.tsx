import { Dispatch, FC, SetStateAction } from 'react'
import { MenuItem } from './MenuItem'

export type Section = 'acquisition' | 'remainder' | 'amortization' | ''

type Props = {
  openedSection: Section
  setOpenedSection: Dispatch<SetStateAction<Section>>
}

export const Sidebar: FC<Props> = ({ openedSection, setOpenedSection }) => {
  return (
    <>
      <MenuItem
        label="Отчисления от стойността на придобиване"
        to="acquisition"
        openedSection={openedSection}
        setOpenedSection={setOpenedSection}
      />
      <MenuItem
        label="Отчисления от балансовата или остатъчната стойност"
        to="remainder"
        openedSection={openedSection}
        setOpenedSection={setOpenedSection}
      />
      <MenuItem
        label="Антиципативни амортизационни отчисления"
        to="amortization"
        openedSection={openedSection}
        setOpenedSection={setOpenedSection}
      />
    </>
  )
}

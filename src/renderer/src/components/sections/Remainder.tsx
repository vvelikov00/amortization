import { ReactNode, useState } from 'react'
import { Input } from '../Input'
import { IntegerInput } from '../IntegerInput'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

export const Remainder = (): ReactNode => {
  const [a, setA] = useState<string>('10000')
  const [t, setT] = useState<string>('12')
  const [p, setP] = useState<string>()
  const [s, setS] = useState<string>('0')
  const [b, setB] = useState<string>('700')
  const [result, setResult] = useState<string>()
  const [table, setTable] = useState<{ n: number; Rn: number; Dn: number }[]>([])

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <div
        style={{
          width: 'max-content'
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault()
            const A = Number(a)
            const tValue = Number(t)
            let B: number = 0
            let pValue: number
            let S: number
            let result = ''
            if (!p) {
              S = Number(s)
              B = Number(b)
              pValue = (1 - Math.pow((S + B) / (A + B), 1 / tValue)) * 100
              result = 'p = ' + pValue.toFixed(2) + ' %'
            } else {
              pValue = Number(p)
              S = A * Math.pow(1 - pValue / 100, tValue)
              result = 'S = ' + S.toFixed(2) + ' лв.'
            }
            setResult(result)
            const i = pValue / 100
            let prevRn = A + B
            let Rn = A
            const table = []
            for (let j = 1; j <= tValue; j++) {
              const modifiedRn = prevRn * (1 - i)
              const Dn = prevRn - modifiedRn
              prevRn = modifiedRn
              Rn = Rn - Dn
              table.push({
                n: j,
                Rn: Rn.toFixed(2),
                Dn: Dn.toFixed(2)
              })
            }
            setTable(table)
          }}
          style={{
            width: 'max-content'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: 'fit-content'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Input
                label=""
                id="A"
                leftItem="A="
                rightItem="лв."
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                min={0}
                required
              />
              <div
                style={{
                  marginTop: '21.5px'
                }}
              >
                <IntegerInput
                  label=""
                  id="t"
                  leftItem="t="
                  rightItem="г."
                  type="number"
                  value={t}
                  onChange={(e) => setT(e.target.value)}
                  min={0}
                  required
                />
              </div>
            </div>
            <div
              style={{
                marginLeft: '20px'
              }}
            >
              <Input
                label=""
                id="p"
                leftItem="p="
                rightItem="%"
                type="number"
                max={100}
                step={0.01}
                min={0}
                value={p}
                onChange={(e) => {
                  setP(e.target.value)
                  setS('')
                  setB('')
                }}
                required={!s}
              />
              <p style={{ textAlign: 'center', marginTop: '-10px', paddingBottom: '7px' }}>
                - ИЛИ -
              </p>
              <Input
                label=""
                id="S"
                leftItem="S="
                rightItem="лв."
                type="number"
                value={s}
                onChange={(e) => {
                  setS(e.target.value)
                  setP('')
                }}
                min={0}
                required={!p}
              />
              <Input
                label=""
                id="B"
                leftItem="B="
                rightItem="лв."
                type="number"
                value={b}
                onChange={(e) => {
                  setP('')
                  setB(e.target.value)
                }}
                min={0}
                required={!p}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <button
              type="submit"
              style={{
                width: 'calc(50% - 10px)'
              }}
            >
              Пресметни
            </button>
            <p>{result}</p>
          </div>
        </form>
        <div
          style={{
            display: table?.length > 0 ? 'flex' : 'none',
            flexDirection: 'row',
            marginTop: '20px'
          }}
        >
          <LineChart
            width={400}
            height={400}
            data={table}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="n" />
            <YAxis dataKey="Rn" />
            <Tooltip />
            <CartesianGrid stroke="#555659" />
            <Line type="monotone" dataKey="Rn" stroke="#ff7300" yAxisId={0} />
            <Line type="monotone" dataKey="Dn" stroke="blue" yAxisId={0} />
            <Legend />
          </LineChart>
          <table>
            <thead>
              <tr>
                <th>n</th>
                <th>Rn</th>
                <th>Dn</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row) => (
                <tr key={row.n}>
                  <td>{row.n}</td>
                  <td>{row.Rn}</td>
                  <td>{row.Dn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

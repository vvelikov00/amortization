import { FormEvent, ReactNode, useState } from 'react'
import { Input } from '../Input'

export const Amortization = (): ReactNode => {
  const [inputValue, setInputValue] = useState<string>('')
  const [type, setType] = useState<string>('Pa')
  const [result, setResult] = useState<string>('')
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'fit-content'
          }}
        >
          <form
            onChange={(e: FormEvent<HTMLFormElement>) => {
              setType(e.currentTarget['type'].value)
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: '1px solid #000',
                paddingBottom: '10px',
                marginBottom: '10px'
              }}
            >
              <input
                type="radio"
                id="Pa"
                name="type"
                style={{
                  marginRight: '5px'
                }}
                value="Pa"
                checked={type === 'Pa'}
              />
              <label htmlFor="Pa">Изчисляване на Pa от p</label>
              <input
                type="radio"
                id="p"
                name="type"
                style={{
                  marginLeft: '10px',
                  marginRight: '5px'
                }}
                value="p"
                checked={type === 'p'}
              />
              <label htmlFor="p">Изчисляване на p от Pa</label>
            </div>
          </form>
          <div>
            <Input
              label=""
              id="inputValue"
              leftItem={`${type}=`}
              rightItem="%"
              type="number"
              max={100}
              step={0.01}
              min={0}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
              }}
              required
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <button
            type="submit"
            style={{
              width: '100%'
            }}
            onClick={(e) => {
              e.preventDefault()
              setResult(
                type === 'Pa'
                  ? ((100 * parseFloat(inputValue)) / (100 - parseFloat(inputValue))).toFixed(2)
                  : ((100 * parseFloat(inputValue)) / (100 + parseFloat(inputValue))).toFixed(2)
              )
            }}
          >
            Пресметни
          </button>
          <div
            style={{
              display: result ? 'flex' : 'none',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            {type === 'Pa' ? (
              <>
                p= <sup>100 * Pa </sup> &frasl; <sub> 100 - Pa</sub> =
              </>
            ) : (
              <>
                Pa= <sup>100 * p </sup> &frasl; <sub> 100 + p</sub>=
              </>
            )}
            {result}%
          </div>
        </div>
      </div>
    </div>
  )
}

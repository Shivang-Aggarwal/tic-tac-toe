import { useState } from 'react'
import './App.css'

function App() {

  type CellVal = 'X' | 'O' | ''

  const [matrix, setMatrix] = useState<CellVal[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ])

  const updateCell = (row: number, col: number, val: CellVal) => {
    setMatrix(prevMatrix => {
      const newMatrix = [...prevMatrix]
      const newRow = [...newMatrix[row]]
      newRow[col] = val
      newMatrix[row] = newRow

      return newMatrix
    })
  }

  return (
    <div className='flex justify-center items-center w-full h-screen bg-amber-50 p-4'>
      <table className='table-fixed w-1/3 aspect-square border-collapse border-spacing-0 text-stone-900'>
        <colgroup>
          <col className="w-1/3" />
          <col className="w-1/3" />
          <col className="w-1/3" />
        </colgroup>
        <tbody>
          <tr>
            <td onClick={() => updateCell(0, 0, 'X')}>{matrix[0][0]}</td>
            <td>{matrix[0][1]}</td>
            <td>{matrix[0][2]}</td>
          </tr>
          <tr>
            <td>{matrix[1][0]}</td>
            <td>{matrix[1][1]}</td>
            <td>{matrix[1][2]}</td>
          </tr>
          <tr>
            <td>{matrix[2][0]}</td>
            <td>{matrix[2][1]}</td>
            <td>{matrix[2][2]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App

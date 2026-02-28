import { useEffect, useState } from 'react'
import './App.css'

function App() {

  type CellVal = 'X' | 'O' | ''

  const [matrix, setMatrix] = useState<CellVal[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ])

  useEffect(() => {
    checkWin()
  }, [matrix])

  const [curr, setCurr] = useState<CellVal>('X')
  const [gameOver, setGameOver] = useState<boolean>(false)

  const updateCell = (row: number, col: number, val: CellVal) => {
    setMatrix(prevMatrix => {
      const newMatrix = [...prevMatrix]
      const newRow = [...newMatrix[row]]
      newRow[col] = val
      newMatrix[row] = newRow

      if (val === 'X') {
        setCurr('O')
      } else if (val === 'O') {
        setCurr('X')
      }

      return newMatrix
    })
  }

  const checkWin = () => {
    let val: CellVal = checkMatrix()

    if (val === 'X' || val === 'O') {
      setCurr(val)
      setGameOver(true)
    }
  }

  const checkMatrix = (): CellVal => {
    const counter: Record<string, number> = {
      'X': 0,
      'O': 0
    }

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 'X') {
          counter['X'] += 1
        } else if (matrix[i][j] === 'O') {
          counter['O'] += 1
        }
      }
      if (counter['X'] === 3) {
        return 'X'
      } else if (counter['O'] === 3) {
        return 'O'
      } else {
        counter['X'] = 0
        counter['O'] = 0
      }
    }

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[j][i] === 'X') {
          counter['X'] += 1
        } else if (matrix[j][i] === 'O') {
          counter['O'] += 1
        }
      }
      if (counter['X'] === 3) {
        return 'X'
      } else if (counter['O'] === 3) {
        return 'O'
      } else {
        counter['X'] = 0
        counter['O'] = 0
      }
    }

    for (let i = 0, j = 0; i < matrix.length && j < matrix.length; i++, j++) {
      if (matrix[i][j] === 'X') {
        counter['X'] += 1
      } else if (matrix[i][j] === 'O') {
        counter['O'] += 1
      }
    }
    if (counter['X'] === 3) {
      return 'X'
    } else if (counter['O'] === 3) {
      return 'O'
    } else {
      counter['X'] = 0
      counter['O'] = 0
    }

    for (let i = 2, j = 0; i >= 0 && j < matrix.length; i--, j++) {
      if (matrix[i][j] === 'X') {
        counter['X'] += 1
      } else if (matrix[i][j] === 'O') {
        counter['O'] += 1
      }
    }
    if (counter['X'] === 3) {
      return 'X'
    } else if (counter['O'] === 3) {
      return 'O'
    } else {
      counter['X'] = 0
      counter['O'] = 0
    }
    
    return '';
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-amber-50 p-4">
      <h1 className="text-cyan-900 font-bold mb-3">{curr}'s turn</h1>
      <table className="table-fixed w-1/3 aspect-square border-collapse border-spacing-0 text-stone-900">
        <colgroup>
          <col className="w-1/3" />
          <col className="w-1/3" />
          <col className="w-1/3" />
        </colgroup>
        <tbody>
          <tr>
            <td onClick={() => updateCell(0, 0, curr)}>{matrix[0][0]}</td>
            <td onClick={() => updateCell(0, 1, curr)}>{matrix[0][1]}</td>
            <td onClick={() => updateCell(0, 2, curr)}>{matrix[0][2]}</td>
          </tr>
          <tr>
            <td onClick={() => updateCell(1, 0, curr)}>{matrix[1][0]}</td>
            <td onClick={() => updateCell(1, 1, curr)}>{matrix[1][1]}</td>
            <td onClick={() => updateCell(1, 2, curr)}>{matrix[1][2]}</td>
          </tr>
          <tr>
            <td onClick={() => updateCell(2, 0, curr)}>{matrix[2][0]}</td>
            <td onClick={() => updateCell(2, 1, curr)}>{matrix[2][1]}</td>
            <td onClick={() => updateCell(2, 2, curr)}>{matrix[2][2]}</td>
          </tr>
        </tbody>
      </table>
      {gameOver ? (
        <h1 className="font-bold mt-3">
          <span className="text-cyan-900">{curr}</span>
          <span className="text-green-600 ml-2">wins!!!</span>
        </h1>
      ) : null}
    </div>
  )
}

export default App

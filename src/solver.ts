export interface Movement{
    ascend:boolean,
    row:number,
    col:number,
    value:number
}

// export const number_grid=[
//     [5, 3, 0, 0, 7, 0, 0, 0, 0],
//     [6, 0, 0, 1, 9, 5, 0, 0, 0],
//     [0, 9, 8, 0, 0, 0, 0, 6, 0],
//     [8, 0, 0, 0, 6, 0, 0, 0, 3],
//     [4, 0, 0, 8, 0, 3, 0, 0, 1],
//     [7, 0, 0, 0, 2, 0, 0, 0, 6],
//     [0, 6, 0, 0, 0, 0, 2, 8, 0],
//     [0, 0, 0, 4, 1, 9, 0, 0, 5],
//     [0, 0, 0, 0, 8, 0, 0, 7, 9]
// ]

// export const number_grid=[
//     [5, 0, 1, 0, 0, 0, 2, 3, 0],
//     [0, 0, 0, 0, 3, 0, 6, 0, 5],
//     [0, 6, 0, 8, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 8, 4, 0, 1, 0],
//     [0, 3, 5, 0, 7, 6, 9, 8, 2],
//     [8, 1, 7, 0, 9, 3, 5, 0, 4],
//     [0, 0, 0, 0, 5, 0, 0, 2, 0],
//     [0, 5, 4, 9, 1, 0, 0, 0, 0],
//     [6, 0, 8, 3, 0, 0, 0, 0, 9]
// ]

export const number_grid=[
    [0, 6, 2, 0, 1, 0, 0, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 3],
    [0, 0, 1, 0, 9, 4, 0, 0, 0],
    [5, 0, 7, 4, 0, 0, 0, 0, 2],
    [9, 0, 0, 0, 8, 1, 0, 0, 0],
    [0, 0, 0, 7, 0, 0, 0, 0, 6],
    [0, 0, 0, 0, 0, 0, 0, 6, 0],
    [0, 0, 0, 0, 0, 8, 4, 0, 0],
    [0, 0, 5, 0, 2, 0, 0, 0, 0]
]

export let visualization_array:Movement[] = []


export const finalGrid = (sudoku:number[][])=>{
    let grid = initializer(sudoku)
    if (solver(grid, false)){
        return grid
    }
    return sudoku
}

export const initializer = (sudoku:number[][])=>{
    let grid:number[][] = []
    sudoku.forEach((row)=>{
        let array:number[] = []
        row.forEach((col)=>{
            array.push(col)
        })
        grid.push(array)
    })

    return grid
}

export const solver = (sudoku:number[][], vizualise:boolean)=>{
    const find:number[]|boolean = findEmpty(sudoku)
    let row=0
    let col=0

    if (!find){
        return true
    } else {
        row = find[0]
        col = find[1]
    }
    for (let i=1;i<10;i++){
        if (validPlacement(row, col, i, sudoku)){
            sudoku[row][col]=i
            if (vizualise){
                visualization_array.push({ascend:true, row:row, col:col, value:i})
            } 
            if (solver(sudoku, vizualise)){
                return true
            }
            if (vizualise){
                visualization_array.push({ascend:false, row:row, col:col, value:0})
            } 
            sudoku[row][col]=0
        }
    }
    return false
}


const findEmpty = (grid:number[][]|string[][])=>{
    for (let i=0;i<grid.length;i++){
        for (let j=0;j<grid[i].length;j++){
            if (grid[i][j]===0 || grid[i][j]===""){
                return [i, j]
            } 
        }
    }
    return false
}

export const validPlacement = (row:number, col:number, num:number, grid:number[][]|string[][])=>{
    if (checkRow(row,col, num, grid) && checkCol(row,col, num, grid) && checkSubGrid(row,col, num, grid)){
        return true
    }
    return false
}

const checkRow = (row:number, col:number, num:number, grid:number[][]|string[][])=>{
    for (let i=0;i<grid.length;i++){
        if (i!==col && grid[row][i]===num){
            return false
        }
    }
    return true
}

const checkCol = (row:number, col:number, num:number, grid:number[][]|string[][])=>{
    for (let i=0;i<grid.length;i++){
        if (i!==row && grid[i][col]===num){
            return false
        }
    }
    return true
}


const checkSubGrid = (row:number, col:number, num:number, grid:number[][]|string[][])=>{
    let min_x = Math.floor(row/3)
    min_x = min_x*3
    let max_x = min_x+3
    let min_y = Math.floor(col/3)
    min_y = min_y*3
    let max_y = min_y+3

    for (let i=min_x;i<max_x;i++){
        for (let j=min_y;j<max_y;j++){
            if (i!==row && j!==col && grid[i][j]===num){
                return false
            }
        }
    }
    return true
}
            

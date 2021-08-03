import React, { useState } from "react";
import { finalGrid, initializer, solver, visualization_array } from "./solver";
import { number_grid } from "./solver";

export const Grid = () =>{

    let speed = 50

    const applyBorder = (i:number, j:number, border:string)=>{
        if (i===0){
            if (j===0){
                return {borderTop:border, borderLeft:border}
            } else if (j===2 || j===5 || j===8){
                return {borderTop:border, borderRight:border}
            } else {
                return {borderTop:border}
            }
        } else if (i===2 || i===5){
            if (j===2 || j===5 || j===8){
                return {borderBottom:border, borderRight:border}
            } else if(j===0){
                return {borderBottom:border, borderLeft:border}
            } else {
                return {borderBottom:border}
            }
        } else if (j===0){
            if (i===8){
                return {borderBottom:border, borderLeft:border}
            } else {
                return {borderLeft:border}
            }
        } else if (j===8){
            if (i===8){
                return {borderBottom:border, borderRight:border}
            } else {
                return {borderRight:border}
            }
        } else if (i===8){
            if (j===2 || j===5){
                return {borderBottom:border, borderRight:border}
            } else {
                return {borderBottom:border}
            }
        } else if (j===2 || j===5){
            return {borderRight:border}
        } else {
            return {}
        }
    } 

    const grid_maker = (grid:number[][]|string[][], input:boolean) =>{
        let result:JSX.Element[][]=[[]]

        for (let i=0; i<grid.length; i++){
            let array:JSX.Element[]=[]
            for (let j=0; j<grid[i].length; j++){
                if (grid[i][j]===0 && input){
                    array.push(<input id={i+","+j} key={i+","+j} className="grid_elements" style={applyBorder(i,j,"4px solid black")} autoComplete="off" maxLength={1} onClick={(e)=>{clickBorder(e)}} onKeyDown={(e)=>{enterKey(e)}} ></input>)
                } else {
                    if (grid[i][j]===0){
                        grid[i][j]=""
                    }
                    array.push(<div id={i+","+j} key={i+","+j} className="grid_elements" style={applyBorder(i,j,"4px solid black")} onClick={(e)=>{clickBorder(e)}}>{grid[i][j]}</div>)
                }
            }
            result.push(array)
        }
        return result
    }
    
    const [grid, setGrid] = useState(initializer(number_grid))
    const [div_grid, setDivGrid] = useState(grid_maker(grid, true))
    const SUDOKU = finalGrid(grid)
    
    const enterKey = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if (e.key==="Enter"){
            const ELEM = e.currentTarget
            const VAL:string[] = ELEM.id.split(",")
            const ROW = parseInt(VAL[0])
            const COL = parseInt(VAL[1])
            if (parseInt(ELEM.value)===SUDOKU[ROW][COL]){
                let number_grid=grid
                number_grid[ROW][COL]=parseInt(ELEM.value)
                setGrid(number_grid)
                setDivGrid(grid_maker(grid, true))
            } else {
                ELEM.value=""
            }
        }
    }

    const clickBorder = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        const ELEM = e.currentTarget
        ELEM.style.borderColor="red"

        if (doc("grid")){
            document.getElementById("grid")!.addEventListener("click", ()=>leaveBorder(ELEM))
        }
    }

    const leaveBorder = (elem:EventTarget & HTMLDivElement)=>{
        elem.style.borderColor="black"

        if (doc("grid")){
            document.getElementById("grid")!.removeEventListener("click", ()=>leaveBorder(elem))
        }
    }

    const doc = (id:string)=>{
        const ELEM = document.getElementById(id)

        if (ELEM===null || ELEM===undefined){
            alert("element "+id+" isn't in the dom")
            return false
        } else {
            return true
        }
    }

    const render = ()=>{
        setDivGrid(grid_maker(grid, false))
    }

    const solutionVisualization = ()=>{
        solver(grid, true)
        let i=0
        visualization_array.forEach((elem)=>{
            i +=1;
            (function(index:number) {
                setTimeout(function() { 
                    if (elem.ascend){
                        document.getElementById(elem.row+","+elem.col)!.style.borderColor="green"
                        document.getElementById(elem.row+","+elem.col)!.textContent=JSON.stringify(elem.value)
                    } else {
                        document.getElementById(elem.row+","+elem.col)!.style.borderColor="red"
                        document.getElementById(elem.row+","+elem.col)!.textContent=""
                    } 
                }, index*speed);
            })(i);
        })
    }

    const reload = ()=>{
        setGrid(initializer(number_grid))
        setDivGrid(grid_maker(grid, true))
    }
    
    return (
        <>
            <div id="grid">
                {div_grid}
            </div>
            <label className="backtracking">Instructions:</label>
            <ul className="backtracking">
                <li>Press enter to validate your inputs</li>
                <li>The reload button won't stop the visualization and will erase all the values</li>
                <li>Double Click to start the visualization or to reload the sudoku on the respective buttons</li>
            </ul>
            <button id="backtracking" name="backtracking" onClick={render} onDoubleClick={()=>{
                solutionVisualization()
            }}>Backtracking Visualization</button>
            <button id="reload" onClick={reload}>Reload</button>
        </>
        
    )
}
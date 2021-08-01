import ReactDOM from 'react-dom';
import './index.css';
import { Grid } from './gridComponent';

const App = ()=>{
  return(
  <>
    <h1>Sudoku Backtracking Visualizar</h1>
    <Grid/>
  </>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

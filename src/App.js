import logo from './logo.svg';
import './App.css';
import {Spinner, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getScores} from "./ScoreService";

function App() {

  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      getScores().then((scores) => {setScores(scores); setIsLoading(false)});
  }, [])

    function renderEntires() {
      if(scores.length !== 0) {
          let renderedEntries = [];
          for(let i in scores) {
              let score = scores[i];

              renderedEntries.push(<TableEntry key={i} place={parseInt(i)+1} name={score.NAME} score={score.SCORE}/>);
          }
          return (
              <tbody>
              {renderedEntries}
              </tbody>
          );
      }
    }

    function renderNoEntries() {
        if(scores.length === 0) {
            return 'Keine Einträge vorhanden';
        }
    }

  return (
    <div className="App">
        <h1>Rangliste</h1>
        <h3>Kick4Inclusion Mitarbeiterturnier</h3>
        <p>Präsentiert von der Schweizer Paraplegiker Stiftung</p>
      <div className={"score-table"}>

        {isLoading ?
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            :
            <>
              <Table striped bordered hover variant={"dark"}>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Score</th>
                  <th>Name</th>
                </tr>
                </thead>
                {renderEntires()}
              </Table>
              {renderNoEntries()}
            </>
        }

      </div>
    </div>
  );
}

function TableEntry (props) {

  return (
      <tr>
        <td>{props.place}</td>
        <td>{props.score}</td>
        <td>{props.name}</td>
      </tr>
      )

}

export default App;

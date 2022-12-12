import logo from './logo.svg';
import './App.css';
import {Spinner, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getScores} from "./ScoreService";

function App() {

  const [scores, setScores] = useState([]);

  useEffect(() => {
      getScores().then((scores) => setScores(scores));
  }, [])

    function renderEntires() {
        let renderedEntries = [];
        for(let i in scores) {
            let score = scores[i];

            renderedEntries.push(<TableEntry key={i} place={parseInt(i)+1} name={score.NAME} mail={score.MAIL} score={score.SCORE}/>);
        }
        return renderedEntries;
    }

  return (
    <div className="App">
        <h1>Rangliste</h1>
        <h3>Kick4Inclusion Mitarbeiterturnier</h3>
        <p>Präsentiert von der Schweizer Paraplegiker Stiftung</p>
      <div className={"score-table"}>

        {scores.length === 0 ?
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            :
          <Table striped bordered hover variant={"dark"}>
            <thead>
            <tr>
              <th>#</th>
              <th>Score</th>
              <th>Mail</th>
              <th>Name</th>
            </tr>
            </thead>
            <tbody>
            {renderEntires()}
            </tbody>
          </Table>
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
        <td>{props.mail}</td>
        <td>{props.name}</td>
      </tr>
      )

}

export default App;

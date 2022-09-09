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

            renderedEntries.push(<TableEntry key={i} place={parseInt(i)+1} gametag={score.GAMETAG} score={score.SCORE}/>);
        }
        return renderedEntries;
    }

  return (
    <div className="App">
        <h1>Score Table</h1>
        <h3>Play4Inclusion LaL Turnier</h3>
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
              <th>Gametag (Nick)</th>
              <th>Score</th>
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

    function formatTime(time) {
        let timeInt = parseInt(time);
        let milliseconds = timeInt % 1000;
        let seconds = Math.floor(timeInt / 1000) % 60;
        let minutes = Math.floor(timeInt / 60000) % 60;

        let millisecondsString = "";
        if(milliseconds < 100) {
            millisecondsString += "0";
        }
        if(milliseconds < 10) {
            millisecondsString += "0";
        }
        millisecondsString += milliseconds;

        let secondsString = "";
        if(seconds < 10) {
            secondsString += "0";
        }
        secondsString += seconds;

        let minutesString = "";
        if(minutes < 10) {
            minutesString += "0";
        }
        minutesString += minutes;

        return minutesString + ":" + secondsString + "." + millisecondsString;
    }

  return (
      <tr>
        <td>{props.place}</td>
        <td>{props.gametag}</td>
        <td>{formatTime(props.score)}</td>
      </tr>
      )

}

export default App;

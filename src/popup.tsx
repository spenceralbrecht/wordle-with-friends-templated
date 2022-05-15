import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";


interface ILetterProps {
  status: String
}

interface ILetterState {}

class BoardLetter extends React.Component<ILetterProps, ILetterState> {
  // constructor(props : ILetterProps) {
  //   super(props);
  //   this.state = {
  //     status: 'unplayed',
  //   };
  // }
  //...code for handling button clicking, updating state, etc.
   render(){
        if (this.props.status == 'a') {
          return(<><td>⬛</td></>);
        }
        else if (this.props.status == 'p') {
          return(<><td>🟨</td></>);
        }
        else if (this.props.status == 'c') {
          return(<><td>🟩</td></>);
        }
        else if (this.props.status == 'u') {
          return(<td>⬜</td>);
        }
        // return(<><td>x</td></>);
   }
}

interface IRowProps {
  wordState: String
}

interface IRowState {}

class BoardRow extends React.Component<IRowProps, IRowState> {
  //...code for handling button clicking, updating state, etc.
    render(){
        return(
          <>
              <tr>
                  <BoardLetter status={this.props.wordState[0]}/>
                  <BoardLetter status={this.props.wordState[1]}/>
                  <BoardLetter status={this.props.wordState[2]}/>
                  <BoardLetter status={this.props.wordState[3]}/>
                  <BoardLetter status={this.props.wordState[4]}/>
              </tr>
          </>
      );
    }
}

interface IBoardProps {
  boardState: String
}

interface IBoardState {}

class Board extends React.Component<IBoardProps, IBoardState> {
//...code for handling button clicking, updating state, etc.
  render(){
      return(
        <>
            <table>
              <tbody>
                <BoardRow wordState={this.props.boardState.substring(0, 5)}/>
                <BoardRow wordState={this.props.boardState.substring(5, 10)}/>
                <BoardRow wordState={this.props.boardState.substring(10, 15)}/>
                <BoardRow wordState={this.props.boardState.substring(15, 20)}/>
                <BoardRow wordState={this.props.boardState.substring(20, 25)}/>
              </tbody>
            </table>
        </>
    );
  }
}


const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();

  useEffect(() => {
    chrome.action.setBadgeText({ text: count.toString() });
  }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: "#555555",
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
  };

  return (
    // <>
      <Board boardState="pcaaaccaapuuuuuuuuuuuuuuuuuuuu"/>
      /* <ul style={{ minWidth: "700px" }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <button
        onClick={() => setCount(count + 1)}
        style={{ marginRight: "5px" }}
      >
        count up
      </button>
      <button onClick={changeBackground}>change background</button> */
    // </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);


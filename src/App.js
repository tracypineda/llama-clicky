import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import llamas from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.llamas to the cards json array
  state = {
    llamas,
    clickedLlamaIds: [],
    score: 0,
    goal: 10,
    status: "Click on any image to begin!"
  };

  //shuffle the llama cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedLlamaIds = this.state.clickedLlamaIds;

    if(clickedLlamaIds.includes(id)){
      this.setState({ clickedLlamaIds: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
      return;
    }else{
      clickedLlamaIds.push(id) 
      
      if(clickedLlamaIds.length === 8){
        this.setState({score: 8, status: "You Won! Great Job, Smartie! Click to play again!", clickedLlamaIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ llamas, clickedLlamaIds, score: clickedLlamaIds.length, status: "You Guessed Correctly!!"});

      for (let i = llamas.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [llamas[i], llamas[j]] = [llamas[j], llamas[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">No Drama Llamas</h1>
          <p className="App-intro">
            Don't click on an image twice-
          </p>
        </header>
        <Score total={this.state.score}
               goal={10}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.llamas.map(llama => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={llama.id}
              key={llama.id}
              image={llama.image}
            />
          ))}
        </Wrapper>
    </div>
    );
  }
}

export default App;
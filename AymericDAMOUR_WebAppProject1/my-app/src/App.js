import React, {Component} from 'react';
import logo from './logo.svg';

import Table from './Table';
import bib from "./restaurantsBIB"


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }
  render(){
  return (
    <div className="App">
      <header className="App-header">
        <Table bib = {bib}/>
      </header>
    </div>
  );
}
}
export default App;

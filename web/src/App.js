import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import NavBar from './nav';
//views
import Buy from './buy';
import Assets from './assets';
import Demands from './demands';
import DemandAdd from './demandAdd';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      totalBalance: 0,
      
      //views
      showBuy: true,
      showAssets: true,
      showDemands: true,
      showDemandAdd: true,
    };

    //refs for views
    this._navbar = React.createRef();
    this._assets = React.createRef();
    this._demands = React.createRef();
    this._demandAdd = React.createRef();
    this._buy = React.createRef();

    //events
    this.onBuyClick = this.onBuyClick.bind(this);
    this.onBuyBack = this.onBuyBack.bind(this);
    
    this.onAssetSelected = this.onAssetSelected.bind(this);

    this.onDemandSelected = this.onDemandSelected.bind(this);
    this.onDemandBack = this.onDemandBack.bind(this);
    
    this.onDemandAddBack = this.onDemandAddBack.bind(this);
  }

  //on load
  componentDidMount() {

    //TODO load balance

    
    const totalBalance = 100;
    this._navbar.current.setBalance(totalBalance);
    this.setState({ totalBalance: totalBalance }); //to this view

    //show first view 
    this.hideAll();  
    this.setState({ showAssets: true });
    // this.setState({ showDemandAdd: true });

  }

  // componentWillUnmount() {
  //   // clearInterval(this.timerID);
  // }

  hideAll(){

    this.setState({ 
      showBuy: false,
      showAssets: false,
      showDemands: false,
      showDemandAdd: false
    });

  }

  onBuyClick(){
    console.log("app buy clicked ")
    this.hideAll();
    this.setState({ showBuy: true });
  }

  //when click on asset list item -> show demands 
  onAssetSelected(assetId){

    console.log("app asset selected "+assetId)  
    this.hideAll();
    this.setState({ showDemands: true }, () =>{

        //lets load and show data for demands view from assetId
        this._demands.current.loadData(assetId);

      });

  }

  onDemandSelected(demandId){
    console.log("app demand selected "+demandId)
    
    //hideAll
    this.hideAll();
    this.setState({ showDemandAdd: true }, () =>{

      //call after state change
      this._demandAdd.current.loadData(demandId);
    });

  }

  onDemandBack(){
    console.log("app demand back ")
    this.hideAll();
    this.setState({ showAssets: true });
  }

  onBuyBack(){
    console.log("app buy back ")
    this.hideAll();
    this.setState({ showAssets: true });
  }

  onDemandAddBack(){
    console.log("app demand back ")
    this.hideAll();
    this.setState({ showAssets: true });
  }



  render() {
    return (
      <div className="App text-start">
        <NavBar ref={this._navbar}
          onBuyClick={this.onBuyClick} />

        { this.state.showBuy ? 
            <Buy ref={this._buy} 

                  onBack={this.onBuyBack}
                    /> 
          : null }

        { this.state.showAssets ? 
            <Assets ref={this._assets} 
                    onAssetSelected={this.onAssetSelected} /> 
          : null }
        
        { this.state.showDemands ? 
            <Demands ref={this._demands} 
                    onItemSelected={this.onDemandSelected}
                    onBack={this.onDemandBack}
                    /> 
          : null }

        { this.state.showDemandAdd ? 
            <DemandAdd ref={this._demandAdd} 
                    onBack={this.onDemandAddBack}              
                    /> 
          : null }
        
      </div>
    );
  }
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
export default App;



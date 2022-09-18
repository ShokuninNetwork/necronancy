import React from 'react';

class DemandAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      currency1: 'eth',
      amount1: 0,
      currency2: 'dot',
      amount2: 0,

      ethPerDot: '0.00', 
      dotPerEth: '0.00',
      shareOfPool: '<0.1%',

      demand: 0,
      trustMana: 0
    };

    //props
    //    onBack

    //events
    this.onChange = this.onChange.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentDidMount() {
  }


  //will be called from the app component
  loadData(demandId) {

    //TODO load data 
    let testData = {
      demand: 10.10,
      trustMana: 100.0
    } 

    this.setState(state => (testData));


  }

  onChange(field, e) {
    let data = {};
    data[field] = e.target.value;
    this.setState(data);
  }

  onSubmit() { 
    console.log("Demand Add->submit provide"); 

    //TODO save !
    console.log(this.state); //here's the data 

    //go back to asset view
    this.props.onBack(); 
  }  

  onBack() { 
    console.log("demand add->back"); 
    this.props.onBack(); 
  }  

  render() {
    return (      
      <div class="demand-add-list">
        <div class="btn-group px-3 pt-2 pb-2">
          <form onSubmit={ (e) => { this.onBack(); } }>            
            <button type="button"  type="submit" class="btn btn-primary">ᐸ</button>
          </form>
        </div>  

        <ul class="list-group d-grid gap-2 border-0 w-auto px-3">
          <a class="list-group-item rounded-3 py-2"  >
            <div class="float-start">
              {this.state.demand}
              <span class="d-block small opacity-50">Demand</span>
            </div>
          </a>

          <a class="list-group-item rounded-3 py-2"  >
            <div class="float-start">
              {this.state.trustMana}
              <span class="d-block small opacity-50">Trust Mana</span>
            </div>
          </a>

        </ul>

        <div class="btn-group px-3 pt-2 pb-2">          
          <form  
            onSubmit={ (e) => { this.onSubmit(); } }>            
          
            <div class="row g-3 pb-2">            
              <div class="col-4">              
                <select id="currency1" class="form-select float-start" 
                  value={this.state.currency1} 
                  onChange={(e) => {this.onChange('currency1', e);}}
                  aria-label="Select Currency">
                  <option value="eth" selected>ETH</option>
                  <option value="dot">DOT</option>
                </select>
              </div>
              <div class="col-4">
                <input type="text" class="form-control float-start" 
                      id="amount1" placeholder="Amount"
                      value={this.state.amount1} 
                      onChange={(e) => {this.onChange('amount1', e);}}
                      />
              </div>
              <div class="col-4">
                <a class="btn btn-primary">MAX</a>
              </div>              
            </div>

            <div class="row g-3">
              <h4>+</h4>
            </div>

            <div class="row g-3 pb-4">            
              <div class="col-4">              
                <select id="currency2" class="form-select float-start" 
                  value={this.state.currency2} 
                  onChange={(e) => {this.onChange('currency2', e);}}
                  aria-label="Select Currency">
                  <option value="eth" selected>ETH</option>
                  <option value="dot">DOT</option>
                </select>
              </div>
              <div class="col-4">
                <input type="text" class="form-control float-start" 
                      id="amount2" placeholder="Amount"
                      value={this.state.amount2} 
                      onChange={(e) => {this.onChange('amount2', e);}}
                      />
              </div>

            </div>

            <div class="row g-3 pb-2">            
              <span class="">Prices and pool share</span>
              <div class="col-4">
                <h3>{this.state.ethPerDot}</h3>
                <span class="opacity-50">ETH per DOT</span>
              </div>
              <div class="col-4">
                <h3>{this.state.dotPerEth}</h3>
                <span class="opacity-50">DOT per ETH</span>
              </div>
              <div class="col-4">
                <h3>{this.state.shareOfPool}</h3>
                <span class="opacity-50">Share of pool</span>
              </div>

            </div>

            <div class="row g-3">
              <button type="button" type="submit" class="btn btn-primary">Provide Liquidity</button>
              <button type="button" type="submit" class="btn btn-outline-primary">View Profile</button>
            </div>

          </form>
        </div>        
        

      </div>
    );
  }

}


export default DemandAdd;
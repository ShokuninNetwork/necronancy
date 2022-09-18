import React from 'react';

class Buy extends React.Component {

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
    };

    //props
    //    onBack

    //events
    this.onChange = this.onChange.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);


  }

  componentDidMount() {


  }





  onChange(field, e) {
    let data = {};
    data[field] = e.target.value;
    this.setState(data);
    // this.setState({value: e.target.value});
  }

  onSubmit() { 
    console.log("Buy->submit"); 

    //TODO save !
    console.log(this.state); //here's the data 

    //go back to asset view
    this.props.onBack(); 
  }  

  render() {
    return (      
      <div class="buy-list">
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
              <button type="button" type="submit" class="btn btn-primary">Make Demand</button>
              <button type="button" type="submit" class="btn btn-outline-primary">Create New Token</button>
            </div>

          </form>
        </div>        
        

      </div>
    );
  }

}


export default Buy;
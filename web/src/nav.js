import React from 'react';

class NavBar extends React.Component {

 constructor(props) {
    super(props);

    this.state = { balance: 0 };

    //events
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  setBalance(balance) {
    this.setState({ balance: balance });
  }  

  onSubmitBuy(e) { 
    // e.stopPropagation();
    // e.preventDefault();
    console.log("Nav->buy"); 
    //go back to asset view
    this.props.onBuyClick(); 
  }  

  render() {
    return (
      <div>
        <div>
          <nav class="navbar navbar-expand bg-light">
            <div class="container-fluid">

              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Settings</a>
                  </li>

                </ul>
              </div>
                <form class="d-flex" role="search" 
                  onSubmit={ (e) => { this.onSubmitBuy(); } }>
                  <button class="btn btn-primary" type="submit" >Buy</button>
                </form>              
            </div>
          </nav>
        </div>
        <div class="balance">
          <ul class="list-group d-grid gap-2 border-0 w-auto pt-2 px-3">
              <li class="list-group-item rounded-3 py-2">
                {this.state.balance}
                <span class="d-block small opacity-50">Total Balance</span>
              </li>           
          </ul>
        </div> 
        <div class=""> 
          <ul class="nav nav-pills pb-3 pt-3 px-3">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Demands</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">History</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pending</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Stats</a>
            </li>
          </ul>
        </div>   
      </div>         
    );
  }
}

export default NavBar;
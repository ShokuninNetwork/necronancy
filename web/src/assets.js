import React from 'react';

class Assets extends React.Component {

  constructor(props) {
    super(props);

    this.state = { items: [], balance: '' };

    //ref
    this._assetsList = React.createRef();

    //events
    this.onAssetSelected = this.onAssetSelected.bind(this);

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.clickItem = this.handleSubmit.bind(this);
  }

  //load data after component is added
  //https://reactjs.org/docs/state-and-lifecycle.html
  componentDidMount() {

    const testData = [
      { id: 0, balance: 231.00,   date: Date.now() },
      { id: 1, balance: 1231.00,  date: Date.now() },
      { id: 2, balance: 414.00,   date: Date.now() },
      { id: 3, balance: 231.00,   date: Date.now() },
      { id: 4, balance: 1231.00,  date: Date.now() },
      { id: 5, balance: 414.00,   date: Date.now() },
      { id: 6, balance: 231.00,   date: Date.now() },
      { id: 7, balance: 1231.00,  date: Date.now() },
      { id: 8, balance: 414.00,   date: Date.now() },
      { id: 9, balance: 231.00,   date: Date.now() },
      { id: 10, balance: 1231.00, date: Date.now() },
      { id: 11, balance: 414.00,  date: Date.now() },
      { id: 12, balance: 231.00,  date: Date.now() },
      { id: 13, balance: 1231.00, date: Date.now() },
      { id: 14, balance: 414.00,  date: Date.now() },
    ];

    this.setState(state => ({
      items: state.items.concat(testData),
      balance: ''
    }));

    // fetchPosts().then(response => {
    //   this.setState({
    //     posts: response.posts
    //   });
    // });

  }

  onAssetSelected(itemId) { 
    console.log("asset selected " + itemId ); 
    this.props.onAssetSelected(itemId);
  }

  render() {
    return (      
      <div class="assets-list">
              
        <AssetsList ref={this._assetsList} 
                    items={this.state.items} 
                    onAssetSelected={this.onAssetSelected} />
      </div>
    );
  }

  /*
  handleChange(e) {
    this.setState({ balance: e.target.value });
  }

  //press submit btn
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.balance.length === 0) {
      return;
    }

    const newItem = {
      balance: this.state.balance,
      id: Date.now()
    };

    this.setState(state => ({
      items: state.items.concat(newItem),
      balance: ''
    }));

  }
  */
}

class AssetsList extends React.Component {
  
  constructor(props) {
    super(props);
    // this.state = { items: [], balance: '' };

    //events
    this.assetSelect = this.assetSelect.bind(this);
  }

  assetSelect(itemId, e) {
    e.preventDefault(); 
    console.log("asset list item selected "+itemId);
    this.props.onAssetSelected(itemId);
  }

  render() {
    return (
      <ul class="list-group d-grid gap-2 border-0 w-auto px-3">
        {this.props.items.map(item => (
          <a class="list-group-item list-group-item-action rounded-3 py-2"
          key={item.id} onClick={(e) => { this.assetSelect(item.id, e) } }>
            <div class="float-start">
              {item.balance}
              <span class="d-block small opacity-50">Total Demands</span>
            </div>
            <img src="eth-logo.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0 float-end mt-2"/>
          </a>
        ))}
      </ul>
    );
  }
}



{/*root.render(<Demands />);*/}
export default Assets;
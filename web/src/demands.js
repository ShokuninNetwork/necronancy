import React from 'react';

class Demands extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      assetId: 0, 
      items: [], 
      balance: ''};

    //props
    //    onItemSelected,
    //    onBack

    //events
    this.onItemSelected = this.onItemSelected.bind(this);
    this.onBack = this.onBack.bind(this);

  }

  componentDidMount() {




  }

  //will be called from the app component
  loadData(assetId) {

    const testData = [
      { id: 0,  balance: 231.00,   name: "Jessica Larson" },
      { id: 1,  balance: 1231.00,  name: "Efrain Trujillo" },
      { id: 2,  balance: 414.00,   name: "Ivy Taylor" },
      { id: 3,  balance: 231.00,   name: "Sincere Sutton" },
      { id: 4,  balance: 1231.00,  name: "Iyana Barry" },
      { id: 5,  balance: 414.00,   name: "Evangeline Howard" },
      { id: 6,  balance: 231.00,   name: "Luz May" },
      { id: 7,  balance: 1231.00,  name: "Amelia Oliver" },
      { id: 8,  balance: 414.00,   name: "Anne Hernandez" },
      { id: 9,  balance: 231.00,   name: "Anabel Velez" },
      { id: 10, balance: 1231.00, name: "Cassidy Lynn" },
      { id: 11, balance: 414.00,  name: "Gianni Mcdonald" },
      { id: 12, balance: 231.00,  name: "Spencer Rangel" },
      { id: 13, balance: 1231.00, name: "Sonny Hickman" },
      { id: 14, balance: 414.00,  name: "Cassie Petty" },
    ];

    this.setState(state => ({
      items: state.items.concat(testData),
      assetId: 1
    }));


  }


  onItemSelected(itemId) { 
    console.log("demands->item selected " + itemId ); 
    this.props.onItemSelected(itemId); //calls a property fn at parent
  }

  onBack() { 
    console.log("demands->back "); 
    this.props.onBack(); 
  }

  render() {
    return (      
      <div class="demands-list">
        <div class="btn-group px-3 pt-2 pb-2">
          <form onSubmit={ (e) => { this.onBack(); } }>            
            <button type="button"  type="submit" class="btn btn-primary">ᐸ</button>
          </form>
        </div>        
        <ul class="list-group d-grid gap-2 border-0 w-auto px-3">
          {this.state.items.map(item => (
            <a class="list-group-item list-group-item-action rounded-3 py-2"
            key={item.id} onClick={(e) => { this.onItemSelected(item.id, e) } }>
              <div class="float-start">
                {item.balance}
                <span class="d-block small opacity-50">{item.name}</span>
              </div>
              <button class="btn btn-primary float-end mt-2" type="submit">Provide</button>
              {/*<img src="eth-logo.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0 float-end mt-2"/>*/}
            </a>
          ))}
        </ul>

      </div>
    );
  }

}


export default Demands;
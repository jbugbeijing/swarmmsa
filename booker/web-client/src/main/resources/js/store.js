
Booker.Actions.SearchStore = Reflux.createActions({
    "search": {children: ["completed","failed"]}
});

Booker.Actions.SearchStore.search.listen( function(term) {

  Ribbon.getJSON( "store", "/search", { q: term } )
    .then( function(data) {
      Booker.Actions.SearchStore.search.completed(data);
    })
    .fail( function() {
      console.log( "search failed" );
    })
})

Booker.State.StoreSearchResults = Reflux.createStore({
  init: function() {
    this.listenTo( Booker.Actions.SearchStore.search.completed, this.output );
  },

  output: function(results) {
    console.log( results );
    this.trigger(results);
  }
});

Booker.Store = React.createClass({
  mixins: [Router.Navigation, Router.State],

  getInitialState: function() {
    return { q: '', page: 1 };
  },

  onSubmit: function(event) {
    event.preventDefault();
    var searchTerm = $('#store-search').val();
    this.transitionTo('store', {}, { q: searchTerm } );
    Booker.Actions.SearchStore.search(searchTerm);
  },

  handleChange: function(event) {
      this.setState({q: event.target.value});
  },

  initSearch: function() {
    if ( this.getQuery().q != this.state.q ) {
      this.setState({q: this.getQuery().q } );
      Booker.Actions.SearchStore.search(this.getQuery().q);
    }
  },

  componentWillReceiveProps: function() {
    this.initSearch();
  },

  componentWillMount: function() {
    this.initSearch();
  },

  render: function() {

    return (
      <div className="large-12 column">
        <h1>Search</h1>
        <form onSubmit={this.onSubmit}>
          <input id="store-search" type="text" value={this.state.q} onChange={this.handleChange}/>
        </form>
        <Booker.SearchResults/>
      </div>
    );
  }
});

Booker.SearchResults = React.createClass({
  mixins: [Reflux.connect(Booker.State.StoreSearchResults,"results")],

  getInitialState: function() {
    return {
      results: { page: 0, numberOfPages: 0, results: [] },
    };
  },

  render: function() {
    return (
      <div>
        <ul>
        {
          this.state.results.results.map( function(e) {
            return (
              <li key={e.id}><Link to='store-item' params={{id: e.id}}>{e.title}</Link></li>
            );
          })
        }
        </ul>
        <Booker.Pagination pagination={this.state.results}/>
        <div className="details">
          Search results from: {this.state.results.requestUri}
        </div>
      </div>
    )
  }
})

Booker.StoreItem = React.createClass({
  mixins: [Router.State],

  componentWillMount: function() {
    console.log( "about to mount: " + this.getParams().id);

    var self = this;

    Ribbon.getJSON( "store", "/book", { id: this.getParams().id } )
      .then( function(data) {
        console.log( "got state: ", data );
        self.setState( data )
      })
  },

  render: function() {
    if ( ! this.state ) {
      return ( <div/> );
    }
    return (
      <div className="large-12 column">
        <div className="book-title">{this.state.title}</div>
        <div className="book-author">{this.state.author}</div>
        <div className="price">Price ${this.state.price}</div>
        <Booker.StoreItem.Purchase bookId={this.state.id}/>
      </div>
    );
  }
})

Booker.StoreItem.Purchase = React.createClass({
  mixins: [Reflux.connect(Booker.State.Library,"items")],

  componentWillMount: function() {
    Booker.Actions.Library.load();
  },

  getInitialState: function() {
    return {
      items: [],
    }
  },

  purchase: function(event) {
    event.preventDefault();
    Ribbon.postJSON( "library", "/items", { id: this.props.bookId } )
       .then( function(data,xhr) {
         Booker.Actions.Library.load();
       })
       .fail( function(err) {
         console.log( "failed to library", err );
       })
  },

  hasPurchased: function() {
    var self = this;
    return this.state.items.some( function(e) {
      return ( e.bookId == self.props.bookId );
    })
  },

  render: function() {
    if ( ! keycloak.token ) {
      return (
        <div>Login to Purchase</div>
      )
    } else if ( this.hasPurchased() ) {
      return (
        <div>Purchased</div>
      )
    } else {
      return (
        <a href="#" onClick={this.purchase}>Purchase Now</a>
      )
    }
  }

})


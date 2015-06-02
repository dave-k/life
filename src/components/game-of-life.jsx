'use strict';

var React = require('react'),
	Game = require("../game/game.js");

var GameControl = React.createClass({displayName: 'GameControl',
	handleChange: function() {
		var size = React.findDOMNode(this.refs.size).value.trim();
		var speed = React.findDOMNode(this.refs.speed).value.trim();

		this.props.onChangeSettings({size:size, speed:speed});
	},
	render: function() {
	    return (
	      <div className="game-control">
	      	<input type="text" placeholder="size" onChange={this.handleChange} value={this.props.size} ref="size" />
	        <input type="text" placeholder="speed" onChange={this.handleChange} value={this.props.speed} ref="speed" />
	        <button>Start</button><br/>
	        <button>Clear</button>
	      </div>
	    );
  }
});

var Grid = React.createClass({displayName: 'Grid',
	cellClick: function(x, y) {
		this.props.onCellClick(x, y);
	},
	render: function() {
		var rows = [];
		for (var x = 0; x < this.props.data.length; x++) {
			var columns = [];
			for (var y = 0; y < this.props.data[x].length; y++) {
				var cellClassString = this.props.data[x][y] ? "grid-column-set" : "grid-column";
				columns.push(<td className={cellClassString} onClick={this.cellClick.bind(this,x,y)}></td>);
			}
			rows.push(<tr className="grid-row">
		        		{columns}
		        	  </tr>);
		}
	    return (
	      <div className="game">
	        <table className="grid">
	        	<tbody>
	        		{rows}
	        	</tbody>
	        </table>
	      </div>
	    );
  }
});

var GameOfLife = React.createClass({displayName: 'GameOfLife',
  getInitialState: function() {
  	var game = Game.create(10);
    return {game: game, size: 10, speed: 1000};
  },
  settingsChanged: function(settings) {
  	var game = Game.create(settings.size);
  	this.setState({game: game, size: settings.size, speed: settings.speed});
  },
  cellClicked: function(x, y) {
  	this.state.game.setCell(x, y);
  	this.setState({game: this.state.game});
  },
  render: function() {
    return (
      <div className="main">
        <Grid data={this.state.game.grid()} onCellClick={this.cellClicked} size={this.state.size} speed={this.state.speed} />
        <GameControl size={this.state.size} speed={this.state.speed} onChangeSettings={this.settingsChanged} />
      </div>
    );
  }
});

React.render(
  <GameOfLife />,
  document.getElementById('content')
);

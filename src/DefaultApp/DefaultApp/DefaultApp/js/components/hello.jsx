var React = React || require('react');
var module = module || {};

var HelloWorld = React.createClass({
    getInitialState: function () {
        return { greeting: '' };
    },
    handleNameChange: function (e) {
		e.preventDefault();
		var yourName = this.refs.txtName.getDOMNode().value.trim();
		var $this = this;
		$.getJSON('hello/' + yourName)
            .then(function(response) {
                $this.setState({ greeting: response.Result });
            });
	},
	render: function() {
		return (
			<div>
				<input type="text" ref="txtName" className="form-control" placeholder="Your name"
					   onChange={this.handleNameChange} />
				<h3>{this.state.greeting}</h3>
			</div>
		);
}
});

module.exports = HelloWorld
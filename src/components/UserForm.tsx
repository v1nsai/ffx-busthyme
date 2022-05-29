import React from "react";
import ReactDOM from "react-dom";

class UserForm extends React.Component<{whenSubmit: any}, {route: string}> {
  constructor(props: any) {
    super(props);
    this.state = { route: 'RIBS1' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    const route = event.target.route;
    this.setState( {route: route} );
  }

  handleSubmit(event: any) {
    event.preventDefault();
    const route = event.target.route.value;
    this.setState( { route: route } );
    this.props.whenSubmit(route);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Route:
          <input type="text" name="route" value={this.state.route} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default UserForm;
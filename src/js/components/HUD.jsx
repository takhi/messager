import React, {Component} from 'react';
import User from './User';

export default class HUD extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let users = this.props.users.map(user => <User key={user.name} name={user.name} />);
        return (
            <div className="HUD">
                {users}
            </div>
        );
    }
}
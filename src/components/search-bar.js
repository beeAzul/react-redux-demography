import React,{Component} from 'react';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            placeholder: "Tapez votre film...",
            intervalBeforeRequest: 3000,
            lockRequest: false
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8 input-group">
                    <input type="text" className="form-control input-lg" onChange={this.handleChange} placeholder={this.state.placeholder}/>
                    <span className="input-group-btn">
                        <button className="btn btn-secondary" onClick={this.handleOnClick}>Action</button>
                    </span>
                </div>
                {/*<p>{this.state.searchText}</p>*/}
            </div>
            )
    }

    handleChange = (e) => {
        this.setState({searchText: e.target.value});

        //Test si le lock est ouvert
        if(!this.state.lockRequest) {
            this.setState({lockRequest: true})
            setTimeout(() => {
                this.handleOnClick()
            }, this.state.intervalBeforeRequest)
        }
    };

    handleOnClick = () => {
        this.setState({lockRequest:false});
        this.props.fromChildren(this.state.searchText);
    };
};

export default SearchBar;
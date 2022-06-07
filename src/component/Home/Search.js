import React,{Component} from 'react';
import './Search.css';
import {withRouter} from 'react-router-dom'

const lurl = "https://zomatonode.herokuapp.com/location"
const rurl = "https://zomatonode.herokuapp.com/hotels"

class Search extends Component {
     
    constructor(props){
        super(props);
        console.log("inside constructor>>>")
        this.state={
            locaton:'',
            restData:''
        }
    }

    renderCity = (data) => {
        if(data){
            return data.map((item) => {
                return(
                <option value={item.state_id} key={item.state_id}>{item.state}</option>
                )
            })
        }
    }

    renderRest = (data) => {
        if(data){
            return data.map((item) => {
                return(
                <option value={item.restaurant_id} key={item.restaurant_id}>
                    {item.restaurant_name} | {item.address}
                </option>
                )
            })
        }
    }

    handleCity = (event) => {
        let stateId = event.target.value;
        fetch(`${rurl}${stateId}`,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({restData:data})
        })
    }


    
    handleRest = (event) => {
        let restId = event.target.value;
        this.props.history.push(`/details?restId=${restId}`)
    }



    render(){
        console.log("inside render>>>",this.state.location)
        return(
            <div className="search">
            
            <div className="logo">
                <span>Z!</span>
            </div>
            <div className="heading">
                Find The Best Restaurant Near You
            </div>
            <div className="dropdown">
                <select  id="city" onChange={this.handleCity}> 
                    <option value="">---Select City</option>
                    {this.renderCity(this.state.location)}
                </select>
                <select className="SelectReas" id="hotels" onChange={this.handleRest}>
                    <option value=""> Seclect Restaurant</option>
                    {this.renderRest(this.state.restData)}
                </select>
            </div>

        </div>
        )
    }

    componentDidMount(){
        console.log("inside componentDidMount>>>")
        fetch(lurl,{method:'GET'})
        .then((res) =>  res.json())
        .then((data) => {
            this.setState({location:data})
        })
    }
}

export default withRouter(Search)
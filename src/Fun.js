import React, { useState } from "react";
const FunProfile = (props) => {
    const [count, setCount] = useState(0)

    // const Clickme = () => {
    //     alert("Superb!")
    // }
    function updateState() {
        setCount(count + 1)
        // this.setState({
        //     name:'variya',
        //     mail:'hello@gmail.com',
        //     count:this.state.count+1
        // }
        // )
    }

    return (
        <div><h1>Count from functional component : {count}</h1>
            <button onClick={updateState}>{props.text}</button>
        </div>
    )
}

export default FunProfile;
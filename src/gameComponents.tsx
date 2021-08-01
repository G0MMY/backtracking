import React from "react";

export const Lives = (props: {id:string})=>{
    return (
    <>
        <img src='/images/red_x.jpg' alt="" id={props.id} width="55px" height="55px" className="x"/>
    </>
    )
  }
  
export const EndGame = ()=>{
    return (
      <div className="background">
        <div className="end" id="lose">
          You just lose, that's sad!
        </div>
        <div className="end" id="win">
          You just won, congrats!
        </div>
      </div>
    )
  }



 
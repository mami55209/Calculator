import "./Table.css";
import {useState} from "react";
export default function Calc(props){
    const [ calc,setCalc] = useState("");
    const [ result,setResult] = useState("");
    const ops = ["/","*","+","-","0"];
    const updateCalc = (value)=>{
        if(
            (ops.includes(value) && calc === "") ||
            (ops.includes(value) && ops.includes(calc.slice(-1)))
        ){
            return;
        }
        setCalc((calc +value).toString());
        if(!ops.includes(value)){
            setResult(eval(calc + value).toString());
        }
    }
    const deleteLast = () =>{
        const value = calc.slice(0,-1);
        setCalc(value.toString());
    }
    const calculate =()=>{
        if(calc === ""){
            return;
        }
        setCalc(eval(calc).toString());
    }
    
    
    const createDigits = ()=>{
        const digits = [];
        for(let i=1;i<10;i++){
            digits.push(
                <button
                onClick={()=>{updateCalc(i.toString())}}
                key={i}>{i}</button>
            )
        }
        return digits;
    }
    return(
        <div className="Table"> 
            <div className="display">
                {result?<span>({result})</span>: ""}&nbsp;
                {calc || "0"}
            </div>
            <div className="operators">
                <button onClick={()=>{updateCalc("/")}} >/</button>
                <button onClick={()=>{updateCalc("*")}}>*</button>
                <button onClick={()=>{updateCalc("+")}}>+</button>
                <button onClick={()=>{updateCalc("-")}}>-</button>
                <button onClick={deleteLast} >DEL</button>
            </div>
            <div className="digits">
                {createDigits()}
                <button onClick={()=>{updateCalc("0")}}>0</button>
                <button onClick={()=>{updateCalc(".")}}>.</button>
                <button onClick={calculate}>=</button>
            </div>
        </div>
    )
}


import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// const myName: string = "Vĩ"
// const myStatus: boolean = true
// const myAge: number = 20
// const products: {id:number, name:string} = {
//   id: 1,
//   name: "a" 
// }

// type ShowProps = {
//   name : string
// }
// function show(a:ShowProps):any{
//   console.log(a.name);
//   return null
// }

// function Show(a: ShowProps):any{
//   console.log(a.name);
  
//   return null
// }

// ReactDOM.render(
//   <div>
//     <h1>Hello {myName}</h1>
//     <div>{myStatus ? "1" :"2"}</div>
//     <div>{myAge}</div>
//     <div>{products.name}</div>
//     <div className="">{show({name: myName})}</div>
//     <div className=""><Show name={myName} /></div>
//     <App />
//   </div>

//   ,document.querySelector("#root")
// )
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.querySelector('#root'));

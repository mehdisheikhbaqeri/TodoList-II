
import './App.css';
import {useState,useEffect} from 'react'
import Items from './components/items'
import axios from 'axios';

function App() {
  const [text,setText]=useState("");
  const [todo,setTodo]=useState([]);
  const [isUpdating, setisUpdating] = useState('');

  useEffect(()=>{
    axios.get('http://localhost:5000/get-todo')
    .then(res=>setTodo(res.data))
    .catch(err=>console.log(err))
  })

  const addUpdating = () => {
    if(isUpdating===''){
      axios
        .post("http://localhost:5000/save-todo",{text})
        .then((res) => {
          console.log(res.data);
          setText("")
        })
        .catch((err) => console.log(err));
    }
    else{
       axios
         .post("http://localhost:5000/update-todo", { _id:isUpdating ,text })
         .then((res) => {
           console.log(res.data);
           setText("");
           setisUpdating('')
         })
         .catch((err) => console.log(err));
    
    }
  };
  const deleteToDo=(_id)=>{
      axios
        .post("http://localhost:5000/delete-todo", { _id })
        .then((res) => {
          console.log(res.data);
         
        })
        .catch((err) => console.log(err));
    
  }
  const updateToDo = (_id,text) => {
    setisUpdating(_id)
    setText(text)
  };
  return (
    <div className="App">
     <div className="container">
       <h1>ToDo App</h1>
       <div className="top">
         <input type="text" placeholder='Write Somthing...'
         value={text} onChange={(e)=>setText(e.target.value)} />
         <div onClick={addUpdating} className="add">{isUpdating?'Update':'Add'}</div>
       </div>
     </div>

     <div className="list">
       {todo.map(item=> <Items key={item._id} text={item.text}
       remove={()=>deleteToDo(item._id)} 
       update={()=>updateToDo(item._id,item.text)} />)}
       
     </div>
    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css';

function App() {

   const [toDos, setToDos] = useState([]);
   const [toDo, setToDo] = useState('');
   const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   const date = new Date();
   const day = dayNames[date.getDay()];
   const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   const currDate = new Date();
   const timeDateDay = currDate.getHours() + ':' + currDate.getMinutes() + ':' + currDate.getSeconds() + ' ' + currDate.getDate() + '.' + currDate.getMonth() + 1 + '.' + currDate.getFullYear() + ' ' + dayNamesShort[currDate.getDay()];


   return (
      <div className="app">

         <div className="headings">
            <div className="mainHeading">
               <h1>ToDo List</h1>
            </div>
            <div className="subHeading">
               <h2>Whoop, it's {day} 🌝 ☕ </h2>
            </div>
         </div>

         <div className="toDoInput">
            <input value={toDo} onChange={(e) => setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
            <i onClick={() => setToDos([...toDos, { text: toDo, toDoTime: timeDateDay }])} className="fas fa-plus"></i>
         </div>

         <div className="container deleted">
            <h3>Trash</h3>
            {
               toDos.map((obj) => {
                  return (
                     <div className="todo">
                        <div className="left">
                           <input type="checkbox" name="" id="" />
                        </div>
                        <div className="top">
                           <p></p>
                        </div>
                        <div className="bottom">
                           <p className="dateTimeDay"></p>
                        </div>
                        <div className="right">
                           <i className="fas fa-times"></i>
                        </div>
                     </div>
                  );
               })
            }
         </div>

         <div className="container progressing">
            <h3>On Going</h3>
            {
               toDos.map((obj) => {
                  return (
                     <div className="todo">
                        <div className="left">
                           <input type="checkbox" name="" id="" />
                        </div>
                        <div className="top">
                           <p>{obj.text}</p>
                        </div>
                        <div className="bottom">
                           <p>{obj.toDoTime}</p>
                        </div>
                        <div className="right">
                           <i className="fas fa-times"></i>
                        </div>
                     </div>
                  );
               })
            }
         </div>

         <div className="container completed">
            <h3>Done</h3>
            {
               toDos.map((obj) => {
                  return (
                     <div className="todo">
                        <div className="left">
                           <input type="checkbox" name="" id="" />
                        </div>
                        <div className="top">
                           <p></p>
                        </div>
                        <div className="bottom">
                           <p className="dateTimeDay"></p>
                        </div>
                        <div className="right">
                           <i className="fas fa-times"></i>
                        </div>
                     </div>
                  );
               })
            }
         </div>

      </div>
   );

}

export default App;
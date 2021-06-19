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
            <div className="left">
               <input value={toDo} onChange={(e) => setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
            </div>
            <div className="right">
               <i onClick={() => setToDos([...toDos, { id: Date.now(), text: toDo, toDoTime: timeDateDay, statusComplete: false, statusDelete: false }])} className="fas fa-plus"></i>
            </div>
         </div>

         <div className="container completed">
            <h3>Done</h3>
            {
               toDos.map((obj) => {
                  if (obj.statusComplete) {
                     return (
                        <div className="todo lite">
                           <div className="top">
                              <p className="textCross">{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                        </div>
                     );
                  }
               })
            }
         </div>

         <div className="container progressing">
            <h3>On Going</h3>
            {
               toDos.map((obj) => {
                  if (!obj.statusComplete && !obj.statusDelete)
                     return (
                        <div className="todo">
                           <div className="left">
                              <input onChange={(e) => {
                                 console.log(e.target.checked);
                                 console.log(obj);
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusComplete = e.target.checked;

                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusComplete} type="checkbox" name="" id="" />
                           </div>
                           <div className="top">
                              <p>{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                           <div className="right">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 console.log(obj);
                                 setToDos(toDos.filter((obj3) => {
                                    if (obj3.id === obj.id) {
                                       obj3.statusDelete = e.target.value;
                                    }
                                    return obj3;
                                 }));
                              }} value={obj.statusDelete} className="fas fa-times"></i>
                           </div>
                        </div>
                     );
               })
            }
         </div>

         <div className="container deleted">
            <h3>Dropped</h3>
            {
               toDos.map((obj) => {
                  if (obj.statusDelete) {
                     return (
                        <div className="todo lite">
                           <div className="top">
                              <p className="textCross">{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                        </div>
                     );
                  }
               })
            }
         </div>

      </div>
   );

}

export default App;
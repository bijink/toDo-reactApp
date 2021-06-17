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
         <div className="mainHeading">
            <h1>ToDo List</h1>
         </div>
         <div className="subHeading">
            <br />
            <h2>Whoop, it's {day} 🌝 ☕ </h2>
         </div>
         <div className="input">
            <input value={toDo} onChange={(e) => setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
            <i onClick={() => setToDos([...toDos, { text: toDo, toDoTime: timeDateDay }])} className="fas fa-plus"></i>
         </div>
         {
            toDos.map((obj) => {
               return (
                  <div className="todos">
                     <div style={{ float: 'left' }} className="todo">
                        <div className="left">
                           <input type="checkbox" name="" id="" />
                           <p>{obj.text}</p>
                        </div>
                        <div className="right">
                           <p style={{ float: 'left', marginRight: '0.3rem' }}>{obj.toDoTime}</p>
                           <i style={{ float: 'left' }} className="fas fa-times"></i>
                        </div>
                     </div>
                  </div>
               );
            })
         }
      </div>
   );

}

export default App;

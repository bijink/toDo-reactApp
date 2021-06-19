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
   const hours = currDate.getHours();
   const AMorPM = hours >= 12 ? 'PM' : 'AM';
   const hour = hours % 12;
   const toDoTime = hour + ':' + currDate.getMinutes() + ':' + currDate.getSeconds() + ' ' + AMorPM;
   const toDoDate = currDate.getDate() + '.' + currDate.getMonth() + '.' + currDate.getFullYear();
   const toDoDay = dayNamesShort[currDate.getDay()];
   const toDoTimeDateDay = toDoTime + ' ' + toDoDate + ' ' + toDoDay;

   return (
      <div className="app">

         <div className="headings">
            <div className="mainHeading">
               <h1>ToDo List</h1>
            </div>
            <div className="subHeading">
               <h2>Whoop, it's {day}</h2>
            </div>
         </div>

         <div className="toDoInput">
            <div className="left">
               <input value={toDo} onChange={(e) => setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
            </div>
            <div className="right">
               <i onClick={() => {
                  if (toDo) {
                     setToDos([...toDos, { id: Date.now(), text: toDo, toDoTime: toDoTimeDateDay, statusComplete: false, statusDelete: false, statusRecycle: false, statusBin: false }]);
                  }
               }} className="fas fa-plus"></i>
            </div>
         </div>

         <div className="container completed">
            <h3>Done</h3>
            {
               toDos.map((obj) => {
                  if (obj.statusComplete && !obj.statusBin) {
                     return (
                        <div className="todo lite">
                           <div className="top">
                              <p className="textCross">{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                           <div className="right">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToDos(toDos.filter((obj5) => {
                                    if (obj5.id === obj.id) {
                                       obj5.statusBin = e.target.value;
                                    }
                                    return obj5;
                                 }));
                              }} value={obj.statusBin} className="fas fa-trash-alt"></i>
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
                  if (!obj.statusComplete && !obj.statusDelete) {
                     return (
                        <div className="todo">
                           <div className="left">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusComplete = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusComplete} className="fas fa-check"></i>
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
                  } else if (obj.statusRecycle && !obj.statusComplete) {
                     return (
                        <div className="todo">
                           <div className="left">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusComplete = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusComplete} className="fas fa-check"></i>
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
                                 setToDos(toDos.filter((obj3) => {
                                    if (obj3.id === obj.id) {
                                       obj3.statusDelete = e.target.value;
                                       obj.statusRecycle = !e.target.value;
                                    }
                                    return obj3;
                                 }));
                              }} value={obj.statusDelete} className="fas fa-times"></i>
                           </div>
                        </div>
                     );
                  }
               })
            }
         </div>

         <div className="container deleted">
            <h3>Dropped</h3>
            {
               toDos.map((obj) => {
                  if (obj.statusDelete && !obj.statusRecycle && !obj.statusBin) {
                     return (
                        <div className="todo lite">
                           <div className="top">
                              <p className="textCross">{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                           <div className="right">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToDos(toDos.filter((obj4) => {
                                    if (obj4.id === obj.id) {
                                       obj4.statusRecycle = e.target.value;
                                    }
                                    return obj4;
                                 }));
                              }} value={obj.statusRecycle} className="fas fa-redo-alt"></i>
                           </div>
                           <div className="rightEnd">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToDos(toDos.filter((obj6) => {
                                    if (obj6.id === obj.id) {
                                       obj6.statusBin = e.target.value;
                                    }
                                    return obj6;
                                 }));
                              }} value={obj.statusBin} className="fas fa-trash-alt"></i>
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
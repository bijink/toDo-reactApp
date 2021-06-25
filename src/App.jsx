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
   var hour = hours % 12;
   var hour12 = () => {
      if (hour === 0) {
         hour = 12;
      }
      return hour;
   };
   const toDoTime = hour12() + ':' + currDate.getMinutes() + ':' + currDate.getSeconds() + ' ' + AMorPM;
   const toDoDate = currDate.getDate() + '.' + (currDate.getMonth() + 1) + '.' + currDate.getFullYear();
   const toDoDay = dayNamesShort[currDate.getDay()];
   const toDoTimeDateDay = toDoTime + ' ' + toDoDay + ' ' + toDoDate;

   const handleUserInput = (e) => {
      setToDo(e.target.value);
   };
   const resetInputField = () => {
      setToDo('');
   };

   return (
      <div className="app">

         <div className="headings">
            <div className="mainHeading">
               <h1 className="gradient-text">ToDo List</h1>
            </div>
            <div className="subHeading">
               <h2 className="gradient-text2">Hey, it's {day}</h2>
            </div>
         </div>

         <div className="toDoInput">
            <div className="left">
               <input value={toDo} onChange={handleUserInput} type="text" placeholder=" Plan Something . . ." />
            </div>
            <div className="right erase">
               <i onClick={resetInputField} className="fas fa-eraser" title="Clear"></i>
            </div>
            <div className="rightEnd  add">
               <i onClick={() => {
                  if (toDo) {
                     setToDos([...toDos, { id: Date.now(), text: toDo, toDoTime: toDoTimeDateDay, statusErase: false, statusDone: false, statusDrop: false, statusRetrieve: false, statusRemove: false }]);
                  }
               }} className="fas fa-plus" title="Add"></i>
            </div>
         </div>

         <div className="container done">
            <h3>Done</h3>
            {
               toDos.map((obj) => {
                  if (obj.statusDone && !obj.statusRemove) {
                     return (
                        <div key={obj.id} className="toDo">
                           <div className="left"></div>
                           <div className="top">
                              <p className="textCross">{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                           <div className="right bin">
                              <i onClick={(e) => {
                                 let isdelete = window.confirm("Deleting ToDo permanently !");
                                 if (isdelete) {
                                    e.target.value = true;
                                 }
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusRemove = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusRemove} className="fas fa-trash-alt" title="Remove"></i>
                           </div>
                        </div>
                     );
                  }
               })
            }
         </div>

         <div className="container onGoing">
            <h3>On Going</h3>
            {
               toDos.map((obj) => {
                  if (!obj.statusDone && !obj.statusDrop) {
                     return (
                        <div key={obj.id} className="toDo">
                           <div className="left tick">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDone = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusDone} className="fas fa-check" title="Done"></i>
                           </div>
                           <div className="top">
                              <p>{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                           <div className="right close">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDrop = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusDrop} className="fas fa-times" title="Drop"></i>
                           </div>
                        </div>
                     );
                  } else if (obj.statusRetrieve && !obj.statusDone) {
                     return (
                        <div key={obj.id} className="toDo">
                           <div className="left tick">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDone = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusDone} className="fas fa-check" title="Done"></i>
                           </div>
                           <div className="top">
                              <p>{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                           <div className="right close">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDrop = e.target.value;
                                       obj.statusRetrieve = !e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusDrop} className="fas fa-times" title="Drop"></i>
                           </div>
                        </div>
                     );
                  }
               })
            }
         </div>

         <div className="container dropped">
            <h3>Dropped</h3>
            {
               toDos.map((obj) => {
                  if (obj.statusDrop && !obj.statusRetrieve && !obj.statusRemove) {
                     return (
                        <div key={obj.id} className="toDo">
                           <div className="left recycle">
                              <i onClick={(e) => {
                                 let isdelete = window.confirm("Retrieving dropped ToDo");
                                 if (isdelete) {
                                    e.target.value = true;
                                 }
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusRetrieve = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusRetrieve} className="fas fa-redo-alt" title="Retrieve"></i>
                           </div>
                           <div className="top">
                              <p className="textCross">{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                           <div className="right bin">
                              <i onClick={(e) => {
                                 let isdelete = window.confirm("Deleting ToDo permanently !");
                                 if (isdelete) {
                                    e.target.value = true;
                                 }
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusRemove = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusRemove} className="fas fa-trash-alt" title="Remove"></i>
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
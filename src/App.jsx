import { useEffect, useState } from "react";
import "./App.css";

function App() {
   const [toDo, setToDo] = useState("");
   const [toDos, setToDos] = useState(() => {
      // #getting stored toDos data from localStorage
      const saved = localStorage.getItem("todo_list_data");
      const initialValue = JSON.parse(saved);
      return initialValue || [];
   });

   // #day, date, time getting codes
   const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   const date = new Date();
   const day = dayNames[date.getDay()];

   const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   const currDate = new Date();
   const hours = currDate.getHours();
   const AMorPM = hours >= 12 ? "PM" : "AM";
   var hour = hours % 12;
   const hour12 = () => {
      if (hour === 0) hour = 12;
      return hour;
   };
   const toDoDate = currDate.getDate() + "." + (currDate.getMonth() + 1) + "." + currDate.getFullYear();
   const toDoDay = dayNamesShort[currDate.getDay()];
   const toDoTime = hour12() + ":" + currDate.getMinutes() + ":" + currDate.getSeconds() + " " + AMorPM;
   const toDoTimeDateDay = toDoTime + " " + toDoDay + " " + toDoDate;

   const handleUserInput = (e) => {
      setToDo(e.target.value);
   };

   const handleInputSubmit = (e) => {
      e.preventDefault();
      if (toDo) {
         setToDos([
            ...toDos,
            {
               id: Date.now(),
               text: toDo,
               time: toDoTimeDateDay,
               status: "onGo", // #valid values are <'done' | 'onGo' | 'drop' | 'remove'>
            },
         ]);
         setToDo("");
      }
   };

   const resetInputField = () => {
      setToDo("");
   };

   const handleToDoStatus = (todoID, status) => {
      setToDos((todo) =>
         todo.filter((item) => {
            if (item.id === todoID) {
               item.status = status;
            }
            return item;
         })
      );
   };

   useEffect(() => {
      // #program to removing correspondend toDo from toDos data
      if (toDos) {
         const index = toDos.findIndex((obj) => obj.status === "remove");
         if (index > -1) toDos.splice(index, 1);
      }

      // #storing toDos data to localStorage of browser
      localStorage.setItem("todo_list_data", JSON.stringify(toDos));
   }, [toDos]);

   return (
      <div className="app">
         {/* heading section */}
         <div className="headings">
            <div className="mainHeading">
               <h1 className="gradient-text">ToDo List</h1>
            </div>
            <div className="subHeading">
               <h2 className="gradient-text2">Hey, it's {day}</h2>
            </div>
         </div>
         {/* input section */}
         <form onSubmit={handleInputSubmit}>
            <div className="toDoInput">
               <div className="left">
                  <input value={toDo} onChange={handleUserInput} type="text" placeholder=" Plan Something . . ." />
               </div>
               <div className="right erase">
                  <i onClick={resetInputField} className="fas fa-eraser" title="Clear"></i>
               </div>
               <div className="rightEnd  add">
                  <button style={{ border: "none", outline: "none", backgroundColor: "#fff" }} type="submit">
                     <i className="fas fa-plus" title="Add"></i>
                  </button>
               </div>
            </div>
         </form>

         {/* *********** */}

         {/* container done */}
         <div className="container done">
            <h3>Done</h3>
            {toDos &&
               toDos.map((todo) => {
                  if (todo.status === "done") {
                     return (
                        <div key={todo.id} className="toDo">
                           <div className="left"></div>
                           <div className="top">
                              <p className="textCross">{todo.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{todo.time}</p>
                           </div>
                           <div className="right bin">
                              <i
                                 className="fas fa-trash-alt"
                                 title="Delete"
                                 onClick={() => {
                                    let isdelete = window.confirm("Deleting ToDo permanently!");
                                    if (isdelete) handleToDoStatus(todo.id, "remove");
                                 }}
                              ></i>
                           </div>
                        </div>
                     );
                  } else return null;
               })}
         </div>
         {/* container onGoing */}
         <div className="container onGoing">
            <h3>On Going</h3>
            {toDos &&
               toDos.map((todo) => {
                  if (todo.status === "onGo") {
                     return (
                        <div key={todo.id} className="toDo">
                           <div className="left tick">
                              <i
                                 className="fas fa-check"
                                 title="Done"
                                 onClick={() => handleToDoStatus(todo.id, "done")}
                              ></i>
                           </div>
                           <div className="top">
                              <p>{todo.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{todo.time}</p>
                           </div>
                           <div className="right close">
                              <i
                                 className="fas fa-times"
                                 title="Drop"
                                 onClick={() => handleToDoStatus(todo.id, "drop")}
                              ></i>
                           </div>
                        </div>
                     );
                  } else return null;
               })}
         </div>
         {/* container dropped */}
         <div className="container dropped">
            <h3>Dropped</h3>
            {toDos &&
               toDos.map((todo) => {
                  if (todo.status === "drop") {
                     return (
                        <div key={todo.id} className="toDo">
                           <div className="left recycle">
                              <i
                                 className="fas fa-redo-alt"
                                 title="Retrieve"
                                 onClick={() => {
                                    let isRetrieve = window.confirm("Retrieving dropped ToDo");
                                    if (isRetrieve) handleToDoStatus(todo.id, "onGo");
                                 }}
                              ></i>
                           </div>
                           <div className="top">
                              <p className="textCross">{todo.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{todo.time}</p>
                           </div>
                           <div className="right bin">
                              <i
                                 className="fas fa-trash-alt"
                                 title="Delete"
                                 onClick={() => {
                                    let isdelete = window.confirm("Deleting ToDo permanently!");
                                    if (isdelete) handleToDoStatus(todo.id, "remove");
                                 }}
                              ></i>
                           </div>
                        </div>
                     );
                  } else return null;
               })}
         </div>
      </div>
   );
}

export default App;

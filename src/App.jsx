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

   // #to get current time in '12hour' format
   const getTime = () => {
      const currDate = new Date();

      const hour = currDate.getHours();
      const minute = currDate.getMinutes();
      const AMorPM = hour >= 12 ? "PM" : "AM";
      // #convert 24hour into 12hour
      let hour_12 = hour % 12;
      if (hour_12 === 0) hour_12 = 12;
      // #convert hour numbers less than 10 into 2 digit number (eg: 5 ==> 05)
      let minute_00 = minute.toString();
      if (minute < 10) minute_00 = `0${minute}`;

      return `${hour_12}:${minute_00} ${AMorPM}`;
   };

   // #to get current 'day' of the week
   const getDay = () => {
      const currDate = new Date();
      // #get current day in full letters
      const dayNames_full = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const day_full = dayNames_full[currDate.getDay()];
      // #get current day in short letters
      const dayNames_short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const day_short = dayNames_short[currDate.getDay()];

      return {
         full: day_full,
         short: day_short,
      };
   };

   // #to get current date in 'MMM DD, YYYY' format
   const getDate = () => {
      const currDate = new Date();
      // #to split into month, dayNum, year array
      const dateSplit = currDate.toString().slice(4, 15).split(" ");

      return `${dateSplit[0]} ${dateSplit[1]}, ${dateSplit[2]}`;
   };

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
               status: "onGo", // #valid values are <'done' | 'onGo' | 'drop' | 'remove'>
               moment: {
                  time: getTime(),
                  day: getDay()?.short,
                  date: getDate(),
               },
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
               <h2 className="">
                  Hey, it's <span className="gradient-text2">{getDay()?.full}</span>
               </h2>
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
            <h3 className="heading">Done</h3>
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
                              <p>{`${todo.moment.time} ${todo.moment.day}`}</p>
                              <p>{`${todo.moment.date}`}</p>
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
            <h3 className="heading">On Going</h3>
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
                              <p>{`${todo.moment.time} ${todo.moment.day}`}</p>
                              <p>{`${todo.moment.date}`}</p>
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
            <h3 className="heading">Dropped</h3>
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
                              <p>{`${todo.moment.time} ${todo.moment.day}`}</p>
                              <p>{`${todo.moment.date}`}</p>
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

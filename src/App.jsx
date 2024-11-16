import { useEffect, useState } from "react";
import "./App.css";
import TodoContainer from "./TodoContainer";

function App() {
   const [toDo, setToDo] = useState("");
   const [toDos, setToDos] = useState(() => {
      // #getting stored toDos data from localStorage
      const saved = localStorage.getItem("todo_list_data");
      const initialValue = JSON.parse(saved);
      return initialValue || [];
   });
   // #valid values are <'nav_done' | 'nav_onGo' | 'nav_drop'>
   const [bottomNavItemID, setBottomNavItemID] = useState("nav_onGo");
   // #state values for bottomNavBar swipe controls (mobile)
   const [touchStart, setTouchStart] = useState(0);
   const [touchEnd, setTouchEnd] = useState(0);

   // #to get current date in 'MMM DD, YYYY' format
   const getDate = () => {
      const currDate = new Date();
      // #regex(regular expressions) capture group to take month, dayNum, year from currDate
      const regex = /(?<month>\w+) (?<dayNum>\d{2}) (?<year>\d{4})/;
      const { dayNum, month, year } = regex.exec(currDate).groups;
      return `${month} ${dayNum}, ${year}`;
   };
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

   const handleUserInput = (e) => {
      setToDo(e.target.value);
   };
   const resetInputField = () => {
      setToDo("");
   };
   const handleInputSubmit = (e) => {
      e.preventDefault();
      if (toDo.split("\n").join("").length > 0) {
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
         resetInputField();
         setBottomNavItemID("nav_onGo");
      }
   };
   const handleInputKeyDown = (e) => {
      const isMobile = window.innerWidth <= 600;
      if (e.key === "Enter") {
         if (!e.shiftKey && !isMobile) {
            e.preventDefault();
            handleInputSubmit(e);
         }
      }
   };
   const handleBottomNavControl = (navItemID) => {
      setBottomNavItemID(navItemID);
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
   useEffect(() => {
      // #swipe from right to left ==> touchValue -ve
      // #swipe from left to right ==> touchValue +ve
      const touchValue = touchEnd - touchStart;
      const swipeSensitivity = 100; //#lesser is more sensitivity
      if (touchEnd) {
         if (touchValue > swipeSensitivity) {
            if (bottomNavItemID === "nav_done") {
               setBottomNavItemID("nav_onGo");
               setTouchStart(touchEnd);
            } else if (bottomNavItemID === "nav_onGo") {
               setBottomNavItemID("nav_drop");
               setTouchStart(touchEnd);
            }
         }
         if (touchValue < -swipeSensitivity) {
            if (bottomNavItemID === "nav_drop") {
               setBottomNavItemID("nav_onGo");
               setTouchStart(touchEnd);
            } else if (bottomNavItemID === "nav_onGo") {
               setBottomNavItemID("nav_done");
               setTouchStart(touchEnd);
            }
         }
      }
      return () => setTouchEnd(0);
   }, [touchEnd, touchStart, bottomNavItemID]);

   return (
      <div className="app">
         {/* heading section */}
         <div className="headings">
            <div className="mainHeading">
               <h1 className="gradient-text1">ToDo List</h1>
            </div>
            <div className="subHeading">
               <h2 className="">
                  Hey, it's <span className="gradient-text2">{getDay()?.full}</span>
               </h2>
            </div>
         </div>
         {/* input section */}
         <form className="inputForm" onSubmit={handleInputSubmit}>
            <div className="input">
               <textarea
                  id="todo-textarea"
                  name="todo-textarea"
                  rows="3"
                  cols="50"
                  value={toDo}
                  onChange={handleUserInput}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Plan something . . ."
                  autoFocus
               />
            </div>
            <div className="input-btns">
               <button className="add-btn" type="submit">
                  <i className="fas fa-plus add" title="Add"></i>
               </button>
               <button className="erase-btn">
                  <i className="fas fa-eraser erase" title="Clear" onClick={resetInputField}></i>
               </button>
            </div>
         </form>
         {/* list section */}
         {/* list done */}
         <div className="list done" style={{ display: bottomNavItemID === "nav_done" && "flex" }}>
            <h3 className="heading">Done</h3>
            <div className="toDos">
               {toDos &&
                  toDos.map((todo) => {
                     if (todo.status === "done") {
                        return <TodoContainer key={todo.id} listID={todo.status} todo={todo} setToDos={setToDos} />;
                     } else return null;
                  })}
            </div>
         </div>
         {/* list onGo */}
         <div className="list onGo" style={{ display: bottomNavItemID === "nav_onGo" && "flex" }}>
            <h3 className="heading">On Going</h3>
            <div className="toDos">
               {toDos &&
                  toDos.map((todo) => {
                     if (todo.status === "onGo") {
                        return <TodoContainer key={todo.id} listID={todo.status} todo={todo} setToDos={setToDos} />;
                     } else return null;
                  })}
            </div>
         </div>
         {/* list drop */}
         <div className="list drop" style={{ display: bottomNavItemID === "nav_drop" && "flex" }}>
            <h3 className="heading">Dropped</h3>
            <div className="toDos">
               {toDos &&
                  toDos.map((todo) => {
                     if (todo.status === "drop") {
                        return <TodoContainer key={todo.id} listID={todo.status} todo={todo} setToDos={setToDos} />;
                     } else return null;
                  })}
            </div>
         </div>
         {/* bottom navBar (mobile) */}
         <div
            id="bottom_nav"
            className="bottomNav"
            onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
            onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX ?? 0)}
         >
            <div
               className={`navDone ${bottomNavItemID === "nav_done" && "nav_on"}`}
               onClick={() => handleBottomNavControl("nav_done")}
            >
               <i className="fas fa-check icon tick"></i>
            </div>
            <div
               className={`navOnGo ${bottomNavItemID === "nav_onGo" && "nav_on"}`}
               onClick={() => handleBottomNavControl("nav_onGo")}
            >
               <i className="far fa-clock icon clock"></i>
            </div>
            <div
               className={`navDrop ${bottomNavItemID === "nav_drop" && "nav_on"}`}
               onClick={() => handleBottomNavControl("nav_drop")}
            >
               <i className="fas fa-times icon close"></i>
            </div>
         </div>
      </div>
   );
}

export default App;

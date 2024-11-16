export default function TodoContainer({ listID, todo, setToDos }) {
   const handleToDoStatus = (todoID, status) => {
      setToDos((todo) =>
         todo.filter((item) => {
            if (item.id === todoID) {
               item.status = status;
            }
            return item;
         }),
      );
   };

   return (
      <div key={todo.id} className="todo">
         {(listID === "onGo" || listID === "drop") && (
            <div className="left">
               <i
                  className={`icon fas ${
                     (listID === "onGo" && "fa-check tick") || (listID === "drop" && "fa-redo-alt retrieve")
                  }`}
                  title={`${(listID === "onGo" && "Done") || (listID === "drop" && "Retrieve")}`}
                  onClick={() => {
                     if (listID === "onGo") {
                        handleToDoStatus(todo.id, "done");
                     } else if (listID === "drop") {
                        let isRetrieve = window.confirm("This dropped todo will be moved back.");
                        if (isRetrieve) handleToDoStatus(todo.id, "onGo");
                     }
                  }}
               ></i>
            </div>
         )}
         <div className="top">
            <p className={`text ${(listID === "done" || listID === "drop") && "text_blurLine"}`}>{todo.text}</p>
         </div>
         <div className="bottom">
            <p className="time">{`${todo.moment.time} ${todo.moment.day}`}</p>
            <p className="date">{`${todo.moment.date}`}</p>
         </div>
         {(listID === "done" || listID === "onGo" || listID === "drop") && (
            <div className="right">
               <i
                  className={`icon fas ${
                     ((listID === "done" || listID === "drop") && "fa-trash-alt trash") ||
                     (listID === "onGo" && "fa-times close")
                  }`}
                  title={`${((listID === "done" || listID === "drop") && "Remove") || (listID === "onGo" && "Drop")}`}
                  onClick={() => {
                     if (listID === "done" || listID === "drop") {
                        let isRemove = window.confirm("This todo will be removed permanently!");
                        if (isRemove) handleToDoStatus(todo.id, "remove");
                     } else if (listID === "onGo") {
                        handleToDoStatus(todo.id, "drop");
                     }
                  }}
               ></i>
            </div>
         )}
      </div>
   );
}

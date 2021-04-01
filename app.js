fetch('https://jsonplaceholder.typicode.com/users/')
  .then(response => response.json())
 .then(item => {
      const element= document.querySelector(".dropdown-menu")
    //   const myLi = document.createElement("li");
    //   element.appendChild(myLi);
      for(let index = 0; index < item.length; index++) {
          const myLi = document.createElement("li");
           element.appendChild(myLi);
        const myA = document.createElement("a");
        myLi.appendChild(myA);
        myA.innerHTML = item[index].name;
        myA.className = "dropdown-item";
        
             }
           
          // console.log(item[index]);
             
     })
  
      fetch('https://jsonplaceholder.typicode.com/todos/1')
         .then(response => response.json())
         .then(item => {

       document.querySelector(".toDO");
       const myUl = document.createElement("ul");


     for(let index = 0; index < item.length; index++) {
      const myLi = document.createElement("li");
          myUl.appendChild(myLi);
      const myA = document.createElement("a");
       myLi.appendChild(myA);
       myA.innerText = item[index].userId + "/" + item[index].id + "/" + item[index].title;
     
      
            }
         
            //console.log(item[index]);
    })
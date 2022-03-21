// Category Function Chart
function showCategoryStats() {
    getData();
  
    async function getData() {
        const response = await fetch("api/categorystats");
        const data = await response.json();
        length = data.length;
  
        labels = [];
        values = [];
        for (var i in data) {
            labels.push(data[i].category);
            values.push(data[i].count);
        }
        const mychart = document.getElementById("categorychart");
        const categorychart = new Chart(mychart, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                    label: "Number of books per category",
                    backgroundColor: ["	#CD5C5C",
                                    "#F08080",
                                    "#FA8072", 
                                    "#E9967A",
                                    "#FFA07A",],
                    data: values
                }
            ]
        },
        options: {
            legend: { display: false },
            responsive: false,
            title: { 
              display: true, 
              text: 'Count of Books per Category',
              padding: {
                top: 10,
                bottom: 30
              }
        }
    }
  });
  }
  }
  
  // Rating Function Chart
  function showRatingStats() {
    getData();
  
    async function getData() {
        const response = await fetch("api/rating");
        const data = await response.json();
        length = data.length;
  
        labels = [];
        values = [];
        for (var i in data) {
            labels.push(data[i].rating);
            values.push(data[i].count);
        }
        const mychart2 = document.getElementById("ratingchart");
        const ratingchart = new Chart(mychart2, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                    label: "Number of books per rating",
                    backgroundColor: ["#011f4b",
                    "#03396c",
                    "#005b96",
                    "#6497b1",
                    "#b3cde0",],
                    data: values
                }
            ]
        },
        options: {
            legend: { display: false },
            responsive: false,
            title: { 
              display: true, 
              text: 'Count of Books per rating',
              padding: {
                top: 10,
                bottom: 30
              }
        }
    }
  });
  }
  }
  
  // Hide submenus
  function hinde_submenus(){
      
    const menuitemlist = document.getElementById("menuitemlist");
    li = menuitemlist.getElementsByClassName("submenu");
    for(let i=0; i < li.length; i++){
        li[i].style.display='none'
    }
  }
  
  function menu_interaction(i){
    const m = document.getElementsByClassName("submenu")
    const aux = m[i].style.display
    hinde_submenus()
    
    if(aux==="none"){
        m[i].style.display=""
    }
  }
  
  // Window onload
  window.onload = () => {
    showCategoryStats()
    hinde_submenus()
    showRatingStats()
  }
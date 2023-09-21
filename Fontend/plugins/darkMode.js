export default ({app}) => {
  const isDarkMode = JSON.parse(localStorage.getItem('darkMode')) === true || false;
  app.head.style.title = "My chóa"
  if (isDarkMode) {  
    document.documentElement.classList.add('dark');
    console.log("object");
    

  } else {
    console.log("object");
    document.documentElement.classList.remove('dark');
  }

};

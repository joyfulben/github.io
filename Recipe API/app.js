let idArr = []
$(() => {
  $.ajax({
    url:'https://api.spoonacular.com/recipes/search?query=asparagus&cuisine=french&number=5&apiKey=a69a37e97ec54198ad3e9025f3f83e3d'
  }).then (
    (data) => {
      console.log(data);
      // for (let i = 0; i < data.length; i++) {
      //   console.log(data[i].id)


  },() => {
      console.log('Bad request');
    }
  )
  $.ajax({
    url:'https://api.spoonacular.com/recipes/763716/information?apiKey=a69a37e97ec54198ad3e9025f3f83e3d'
  }).then (
    (data) => {
      console.log(data);
    },() => {
      console.log('Bad request');
    }
  )


})

console.log($);

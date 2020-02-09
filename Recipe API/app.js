// TODO: Get ajax request working with recipes
let idArr = []
const query = 'chicken'
const ajaxUseID = () => {
  for (let j=0;j<idArr.length;j++) {
$.ajax({
    url:'https://api.spoonacular.com/recipes/'+idArr[j]+'/information?apiKey=a69a37e97ec54198ad3e9025f3f83e3d'
  }).then (
    (data) => {
      console.log(data.title);
    },() => {
      console.log('Bad request');
    }
)
  }
}
// ajax request for basic recipe info using a user generated query
const ajaxIDRecipe = () => {

$.ajax({
  url:'https://api.spoonacular.com/recipes/search?query='+ query + '&number=4&apiKey=a69a37e97ec54198ad3e9025f3f83e3d'
}).then (
  (data) => {
    for (let i = 0; i < data.results.length; i++) {
      idArr.push(data.results[i].id);
    }
      ajaxUseID();

// TODO: once access, save recipe id in variable and use in following ajax request

},() => {
    console.log('Bad request');

})
}


$(() => {

  ajaxIDRecipe()

})

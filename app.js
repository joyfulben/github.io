// TODO: Set up an event listener that stores input into the query variable to be used in ajaxIDRecipe
//==================================//
//===========Array variables========//
//==================================//
let query = []
let number = [5]
let cuisine = []
let diet = []
let exceptions = []
let intolerances = []
let idArr = []
let dataArr = []
//==================================//
//==========Functions===============//
//==================================//
// TODO: Create a function that when filters button is pushed, four buttons appear in its place, each with one of the four filters
// TODO: Take filter arrays and input them into ajaxIDRecipe

//====================================
//            Filters
//====================================
//When a filter is chosen, a submit box with button is appended to original target filter button. The new submit button, recently appended to the target filter will push input to its respective array.
const chooseFilter = () => {
  const $target = event.target;
  const $form = $('<form>')
  const $inputBox = $(`<input type="text"/>`)
  const $button = $('<input type="submit" value="Submit"/>')
  .addClass('button');
  $inputBox.appendTo($form)
  $button.appendTo($form)
  $form.appendTo($target)
  const $filter = $($target).text();
  $('form').on('submit', () => {
    event.preventDefault()
    if ($filter == 'Cuisine') {
      cuisine.push($($inputBox).val())
    } else if ($filter == 'Diet') {
      diet.push($($inputBox).val())
    } else if ($filter == 'Exclude Ingredients') {
      exceptions.push($($inputBox).val())
    } else {
      intolerances.push($($inputBox).val())
    }
    $($inputBox).val('')
  })
}

const filtersClick = () => {
  $('#options').one('mouseenter', () => {
    $tooltip = $('<div>').text('Add a filter to your search').addClass('tooltip')
    $tooltip.appendTo($('#options'))
    $tooltip.delay(5000).fadeOut();
  })

  $('#options').on('click', () => {
    $('.filters').toggleClass('filters')
    $('.see-me').one('click', () => {
      chooseFilter(event)
    })
  })
}
//===========================================
//=============Recipe Divs===================
//===========================================

const showRecipe = () => {
    const $recipeDiv = $('<div>').addClass('search-result')
    const $recipeName = $(`<h2></h2>`).text(`${dataArr[dataArr.length-1].title}`)
    const $recipeInstructions = $('<h6></h6>')
    .addClass('filters').text(`${dataArr[dataArr.length-1].instructions}`)

    $recipeName.on('click', () => {
      $recipeInstructions.toggleClass('filters')
    })
    $recipeInstructions.appendTo($recipeName)
    $recipeDiv.append($recipeName);
    $('.recipe-container').append($recipeDiv)
}
//===========================================
// ==================AJAX====================
//===========================================

// ajax request to use the idea acquired from previous ajax request
const ajaxUseID = () => {
  for (let j=0;j<idArr.length;j++) {
    $.ajax({
      url:'https://api.spoonacular.com/recipes/'+idArr[j]+'/information?apiKey=a69a37e97ec54198ad3e9025f3f83e3d'
    }).then (
      (data) => {
        dataArr.push(data);
        showRecipe();
      },() => {
        console.log('Bad request');
      }
    )
  }
  idArr = []
  $('.see-me').remove()
}
// TODO: Set multiple variables that will take filters: cuisine, diet, excludeIngredients and intolerances to be added to ajaxIDRecipe in addition to query.

// ajax request for basic recipe info using a user generated query w/ or w/o filters
const ajaxIDRecipe = () => {
  //=========Submitting recipe queries===============
  $('#recipe').on('submit', (event) => {
    //Allows the value of input box to be used
    event.preventDefault();
    //Pushing the value of the input box to query variable.
    query.push($('input[type=\'text\']').val())
    //Reset input box by having its value be an empty string
  $('input[type=\'text\']').val('');
  //====================================================
    $.ajax({
      url:'https://api.spoonacular.com/recipes/search?query='+query[0]+ '&cuisine='+cuisine+'&diet='+diet+'&excludeIngredients='+exceptions+'&intolerances='+intolerances+ '&number='+number+'&apiKey=a69a37e97ec54198ad3e9025f3f83e3d'
    }).then (
      (data) => {
        for (let i = 0; i < data.results.length; i++) {
          idArr.push(data.results[i].id);
        }
      ajaxUseID();


      },() => {
        console.log('Bad request');
      })

    query = []
    idArr = []
  })
}

//jquery on-load ready function
$(() => {
  filtersClick()
  ajaxIDRecipe()

})

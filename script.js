$(document).ready(function(){
	var positiveArray = []; //Stores all the positiove terms
	var negetiveArray = []; //Stores all the negetive terms
	

	$("form").submit(function(event) {
		var checkTerm = $("#inputTerm").val();
		var checkType = $("#typeTerm").val();

		// if form validation is successfull then entered values will be pushed to the appropriate array 
		if(formValidation()){
			if(checkType == "positive"){
				positiveArray.push(checkTerm);
			}else{
				negetiveArray.push(checkTerm);
			}
			// Populate the Positive and Negetive boxes after form submission
	  		populatePositive();
	  		populateNegetive();
	  		// Reset the form input fields
	  		$("#testFrom").trigger("reset");
		}
		else{
			console.log("From Error");
		}
		
  		event.preventDefault();
	});

	// Function to Validate Form
	var formValidation = function(){
		var checkTerm = $("#inputTerm").val();
		var checkType = $("#typeTerm").val();
		
		// If any of the input field is empty then error will be shown
		if (!checkType || !checkTerm || checkType === '' || checkTerm === '') {
			if (!checkTerm || checkTerm === '') {
				$('.termMessage').fadeIn("slow");
			}
			if (!checkType || checkType === '') {
				$('.typeMessage').fadeIn("slow");
			} 
			return false;
		} 
		else{
			return true;
		}
	}

	// Remove Error Message when value changes for the input and the select 
	$("#typeTerm").change(function(){
		$('.typeMessage').fadeOut("slow");
	});

	$('#inputTerm').blur(function(){
	    if( !$(this).val() ) {
	          $('.termMessage').fadeIn("slow");
	    }else{
	    	$('.termMessage').fadeOut("slow");
	    }
	});


	// Populate the Positive list
	var populatePositive = function(){
		$("#positiveList").empty();
		// Sort the array
		positiveArray.sort();
		// itarate through each item in the positiveArray and populate the list
		$.each(positiveArray, function(i, item) {
			var li = $("<li data-id="+i+"><p class='label label-success pSpan'></p><span class='label label-success something'> X<span></li>");
			$("#positiveList").append(li);
			$("p",li).text(item);
    	});
	}

	// Remove the selected term from positiveArray and re-populate data into HTML
	$("#positiveList").on('click', 'li span', function(){
		var toDelete = $(this).parent().data("id");
		positiveArray.splice(toDelete, 1);
		populatePositive();
	});

	// Populate Input and the Select box from positiveArray
	$("#positiveList").on('click', 'li p', function(){
		var clickedValue = $(this).text();
		$("#inputTerm").val(clickedValue);
		$("#typeTerm").val("positive");
	});


	// Populate the Negetive list
	var populateNegetive = function(){
		$("#negetiveList").empty();
		// Sort thr Array
		negetiveArray.sort();
		// itarate through each item in the negetiveArray and populate the list
		$.each(negetiveArray, function(i, item) {
			var li = $("<li data-id="+i+"><p class='label label-danger pSpan'></p><span class='label label-danger something'> X<span></li>");
			$("#negetiveList").append(li);
			$("p",li).text(item);
    	});
	}

	// Remove the selected term from negetiveArray and re populate data into HTML
	$("#negetiveList").on('click', 'li span', function(){
		var toDelete = $(this).parent().data("id");
		negetiveArray.splice(toDelete, 1);
		populateNegetive();
	});

	// Populate Input and then Select box from negetiveArray
	$("#negetiveList").on('click', 'li p', function(){
		var clickedValue = $(this).text();
		$("#inputTerm").val(clickedValue);
		$("#typeTerm").val("negetive");
	});

});


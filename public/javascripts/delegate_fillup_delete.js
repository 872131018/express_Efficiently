$(document).ready(function() {
	/*
  * Delegate all clicks to the document
  */
  $(document).on('click', '[data-delegate=fillup_delete]', function(event) {
		/*
		* Set fields that need to be updated for form submission
		*/
		var fillup_id = $(event.target).data("id");
		/*
		* These values must be set for server to function
		*/
		var $form = $('form');
		$form.append(
			[
				$("<input name=\"_method\" value=\"DELETE\">"),
				$("<input name=\"id\" value=\""+fillup_id+"\">")
			]
		);
		/*
		* Submit the form
		*/
		$form.submit();
	});
});

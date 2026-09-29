//////CONTACT FORM VALIDATION
jQuery(function ($) {
	$('#contactform').on('submit', function (event) {
		event.preventDefault();

		var form = $(this);
		var submit = form.find('#submit');
		var errorMessage = $('.form-error');

		if (!this.checkValidity()) {
			this.reportValidity();
			return;
		}

		errorMessage.hide();
		submit.prop('disabled', true);

		$.ajax({
			url: form.attr('action'),
			type: 'POST',
			data: form.serialize(),
			cache: false,
			dataType: 'text'
		})
		.done(function (response) {
			if ($.trim(response) === '1') {
				$('.done').fadeIn('slow');
				form[0].reset();
			} else {
				errorMessage.show();
			}
		})
		.fail(function () {
			errorMessage.show();
		})
		.always(function () {
			submit.prop('disabled', false);
		});
	});
});

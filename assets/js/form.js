function form_msg(status, message) {
    var formMessages = $('#form-messages');
    $(formMessages).css('display', 'block');
    $(formMessages).removeClass('bg-danger');
    $(formMessages).removeClass('bg-warn');
    $(formMessages).removeClass('bg-success');
    $(formMessages).addClass(status);
    $(formMessages).text(message);
    $(formMessages).delay(5000).fadeOut(400)
}

$(function() {

    var form = $('#ajax-contact');

    $(form).submit(function(e) {
        e.preventDefault();

        var msgSending = form.attr("msg-sending");
        var msgSuccess = form.attr("msg-success");
        var msgFailure = form.attr("msg-failure");
        var msgError = form.attr("msg-error");

        if (! msgSending) msgSending = 'Sending message. Just a second';
        if (! msgSuccess) msgSuccess = 'Message sent. We will be in touch shortly';
        if (! msgFailure) msgFailure = 'Message not sent. Please try again';
        if (! msgError) msgError = 'Oops! An error occured and your message could not be sent.';

        var formData = $(form).serialize();

        form_msg('bg-warn', msgSending);

        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData,
            headers: { 'Accept': 'application/json' }
        })
            .done(function(response) {
                if (response.ok) {
                    form_msg('bg-success', msgSuccess);
                    $('#name, #email, #message').val('');
                } else {
                    form_msg('bg-danger', msgFailure);
                }
            })
            .fail(function() {
                form_msg('bg-danger', msgError);
            });
    });

});

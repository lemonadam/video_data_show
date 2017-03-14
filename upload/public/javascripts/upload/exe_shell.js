$("#clickme").click(function() {

    $.ajax({
        url: "/user.php",
        dataType: "text",
        type: "GET",
        data: {},
        success: function(result){
            $(document.body).html(result);
        }
    });

});


function logoutMe(){
    $('#registerMenu').show();
        $('#loginMenu').show();
        $('#logoutMenu').hide();
        $('#editMenu').hide();
        sessionStorage.clear();
}
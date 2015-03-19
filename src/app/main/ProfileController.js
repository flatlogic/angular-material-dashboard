(function(){

  angular
    .module('admin')
    .controller('ProfileController', [
      ProfileController
    ])
    .config( function($mdThemingProvider){
      $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('orange')
        .dark();

    });

  function ProfileController() {
    var vm = this;

    vm.user = {
      title: 'Admin',
      email: 'contact@flatlogic.com',
      firstName: '',
      lastName: '' ,
      company: 'FlatLogic Inc.' ,
      address: 'Kulman street, 1' ,
      city: 'Minsk' ,
      state: '' ,
      biography: 'We are young and ambitious full service design and technology company. Our focus is JavaScript development and User Interface design.',
      postalCode : '220013'
    };
  }

})();

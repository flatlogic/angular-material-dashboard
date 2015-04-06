(function(){
  'use strict';

  angular.module('app')
        .service('messagesService', [
        '$q',
        messagesService
  ]);

  function messagesService($q){
    var messages = [
      {
        userPhoto : '/assets/images/user.svg',
        subject: 'Electromagnetic radiation',
        userName: 'Wilhelm Conrad Röntgen',
        date: '1901',
        text: 'In recognition of the extraordinary services he has rendered by the discovery of the remarkable rays subsequently named after him'
      },
      {
        userPhoto : '/assets/images/user.svg',
        subject: 'Quantum theory',
        userName: 'Max Planck',
        date: '1918',
        text: 'For the services he rendered to the advancement of physics by his discovery of energy quanta.'
      },
      {
        userPhoto : '/assets/images/user.svg',
        subject: 'Photoelectric effect',
        userName: 'Albert Einstein',
        date: '1921',
        text: 'For his services to theoretical physics, and especially for his discovery of the law of the photoelectric effect'
      },
      {
        userPhoto : '/assets/images/user.svg',
        subject: 'Atomic structure',
        userName: 'Niels Bohr',
        date: '1922',
        text: 'For his services in the investigation of the structure of atoms and of the radiation emanating from them'
      },
      {
        userPhoto : '/assets/images/user.svg',
        subject: 'Wave equation',
        userName: 'Erwin Schrödinger',
        date: '1933',
        text: 'For the discovery of new productive forms of atomic theory'
      },
      {
        userPhoto : '/assets/images/user.svg',
        subject: 'Spin theory',
        userName: 'Wolfgang Pauli',
        date: '1945',
        text: 'For the discovery of the Exclusion Principle, also called the Pauli principle'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(messages);
      }
    };
  }

})();

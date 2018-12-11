todoApp.controller('ProjectController', ['$http', '$mdDialog', function($http, $mdDialog) {
    let self = this;

    self.projects = [];
    
    // get all projects
    self.getProjects = function() {
    	$http({
    		method: 'GET',
    		url: '/project'
    	}).then(function(response) {
    		self.projects = response.data;
    	}).catch(function(error) {
    		console.log('Error :', error);
    	});
    }

    // delete selected project
    self.deleteButton = function(id) {
        $http({
        	method: 'DELETE',
        	url: `/project/delete/${id}`
        }).then(function(){
        	self.getProjects();
        }).catch(function(error){
        	console.log('Error :', error);
        });
    }

    // make new project
    self.newProjectClick = function(ev) {
        let confirm = $mdDialog.prompt()
          .title('Project Name')
          .textContent('Put your new project name in the blank.')
          .placeholder('New Project')
          .ariaLabel('New Project')
          .targetEvent(ev)
          .required(true)
          .ok('Okay!')
          .cancel('Cancel');
        
        $mdDialog.show(confirm).then(function(answer){
	    	$http({
	    		method: 'POST',
	    		url: '/project/create',
	    		data: {
	    			userId: '1',
	    			projectName: answer
	    		}
	    	}).then(function(){
	    	    self.getProjects();
	    	}).catch(function(error){
	    		alert('Error posting new project');
	    	});
        });
    	
    }
    
    self.getProjects();
}]);


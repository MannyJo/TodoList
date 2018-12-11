todoApp.controller('TaskController', ['$http', '$mdDialog', function($http, $mdDialog) {
    let self = this;
    
    self.projectId = window.location.hash.split('/').pop();
    self.tasks = [];
    self.newTask = {};
    
    self.getTasks = function() {
    	$http({
        	method: 'GET',
        	url: `/task/${self.projectId}`
    	}).then(function(response){
        	self.tasks = response.data;
        }).catch(function(error){
        	console.log('Error :', error);
        });
    }
    
    self.clickStatus = function(task) {
    	task.isFinished = !task.isFinished;
    	
        $http({
        	method: 'PUT',
        	url: '/task/update',
        	data: task
        }).then(function(){
            self.getTasks();
        }).catch(function(error){
        	console.log('Error :', error);
        });
    }

    self.addNewTask = function() {
        let title = prompt('Title?');
        let context = prompt('Context');
        
        $http({
        	method: 'POST',
        	url: '/task/create',
        	data: {
        		projectId: self.projectId,
        		title: title,
        		context: context
        	}
        }).then(function(){
            self.getTasks();
        }).catch(function(error){
        	console.log('Error :', error);
        });
    }
    
    self.goBack = function() {
    	window.location.hash = '#/project'
    }

    self.showDialog = function(ev) {
    	$mdDialog.show({
    		templateUrl: '../../views/task.dialog.html',
    		parent: angular.element(document.body),
    		targetEvent: ev,
    		clickOutsideToClose:true
    	}).then(function(newTask) {
    		if(newTask.title !== '' && newTask.context !== '' &&
    				newTask.title !== undefined && newTask.context !== undefined){
				$http({
					method: 'POST',
					url: '/task/create',
					data: {
						projectId: self.projectId,
						title: newTask.title,
						context: newTask.context
					}
				}).then(function(){
				    self.getTasks();
				}).catch(function(error){
					console.log('Error :', error);
				});
    		}
    	});
    }
    
	self.hide = function() {
		$mdDialog.hide();
	}
	
	self.answer = function(newTask) {
		$mdDialog.hide(newTask);
	}
    
    self.getTasks();
}]);
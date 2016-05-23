import _ from 'lodash';

export default function($scope, userFactory) {
	let params = {
        createHasInput: false
  };
	const { createUser } = userFactory;
	$scope.createTask = _.partial(createTask, $scope);
}
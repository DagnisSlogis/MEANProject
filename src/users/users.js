import _ from 'lodash';

export default function($scope, userFactory) {
	let params = {
        createHasInput: false
  };
	const { createUser, loginUser } = userFactory;
	$scope.createUser = _.partial(createUser, $scope, params);
	$scope.loginUser = _.partial(loginUser, $scope);
}

import _ from 'lodash';

export default function($scope, userFactory) {
	let params = {
        createHasInput: false
  };
	const { createUser } = userFactory;
	$scope.createUser = _.partial(createUser, $scope, params);
}

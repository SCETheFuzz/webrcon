
app.controller( 'BanListController',  BanListController );

function BanListController( $scope, rconService, $interval )
{
	$scope.Output = [];

	$scope.Refresh = function ()
	{
		rconService.getBans($scope, function ( bans )
		{
			$scope.Bans = bans;
		});
	}

	$scope.Order = function( field )
	{
		if ( $scope.OrderBy === field )
		{
			field = '-' + field;
		}

		$scope.OrderBy = field;
	}

	$scope.SortClass = function( field )
	{
		if ( $scope.OrderBy === field ) return "sorting";
		if ( $scope.OrderBy === "-" + field ) return "sorting descending";

		return null;
	}

	$scope.UnbanPlayer = function ( id )
	{
		rconService.Command( 'unban ' + id );
			
		$scope.Refresh();
	}
	
	rconService.InstallService( $scope, $scope.Refresh )

	// var timer = $interval( function ()
	// {
	// 	//$scope.Refresh();
	// }.bind( this ), 1000 );

	//$scope.$on( '$destroy', function () { $interval.cancel( timer ) } )
}
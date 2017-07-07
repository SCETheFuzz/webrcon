
app.controller( 'PlayerListController',  PlayerListController );

function PlayerListController( $scope, rconService, $interval )
{
	$scope.Output = [];
	$scope.OrderBy = '-ConnectedSeconds';

	$scope.Refresh = function ()
	{
		rconService.getPlayers($scope, function ( players )
		{
			$scope.Players = players;
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

	$scope.KickPlayer = function ( id )
	{
		var reason = prompt("Please enter your reason", "Admin Kicks");
		rconService.Command( 'kick ' + id + ' "' + reason + '"');
		$scope.Refresh();
	}
	
	$scope.BanPlayer = function ( id )
	{
		var reason = prompt("Please enter your reason", "Admin Kicks");
		
			rconService.Command( 'banid ' + id + ' "' + reason + '"');
			rconService.Command( 'kick ' + id + ' "' + reason + '"');
		
		$scope.Refresh();
	}
	
	$scope.MutePlayer = function ( id )
	{
		rconService.Command( 'mutevoice ' + id );
		rconService.Command( 'mutechat ' + id );
			
		$scope.Refresh();
	}

		$scope.UnmutePlayer = function ( id )
	{
		rconService.Command( 'unmutevoice ' + id );
		rconService.Command( 'unmutechat ' + id );
			
		$scope.Refresh();
	}
	rconService.InstallService( $scope, $scope.Refresh )

	// var timer = $interval( function ()
	// {
	// 	//$scope.Refresh();
	// }.bind( this ), 1000 );

	//$scope.$on( '$destroy', function () { $interval.cancel( timer ) } )
}
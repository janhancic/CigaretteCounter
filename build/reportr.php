<?php

Include ( 'reportr.config.php' );

defineModel ( $config );
trackEvent ( $config );

function defineModel ( $config )
{
	$dataParameters = Array (
		'namespace' => 'CigaretteCounter',
		'event' => 'smoke',
		'name' => 'Number of smokes',
		'icon' => $config['icon_url'],
		'description' => 'Number of cigarettes I smoke during each day'
	);

	$urlParameters = Base64_Encode ( Json_Encode ( $dataParameters ) );

	File_Get_Contents ( $config['host'] . 'api/' . $config['token'] . '/model/set?data=' . $urlParameters );
}

function trackEvent ( $config )
{
	$dataParameters = Array (
		'namespace' => 'CigaretteCounter',
		'event' => 'smoke'
	);

	$urlParameters = Base64_Encode ( Json_Encode ( $dataParameters ) );

	File_Get_Contents ( $config['host'] . 'api/' . $config['token'] . '/events/track?data=' . $urlParameters );
}

?>
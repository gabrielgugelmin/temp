<?php
	
header('Content-type: application/json');

/**
 * Include e Riquire CMS
 */
require_once('../../application/include_dao.php');

//start new transaction
$transaction = new Transaction();

$promo = $_GET['promo'];

if($promo=='promo'){
	
	$condId = 'v.status=199';
	
}else{
	
	$condId = '1=1 and (v.status=2 or v.status=1)';
}


$veiculo = new Veiculo();

$veiculo = DAOFactory::getVeiculoDAO()->relTable(' SELECT 
													*,v.alias as alias,
													v.idAlbum as idAlbum,
													v.observacoes as observacoes,
													a.file as capa,
													c.nome as idCor,
													vc.alias as idVeiculoCategoria,
													m.nome as idMarca,
													m.idMarca as km,
													tt.tipo as idTransmissao  
													
													FROM Veiculo v INNER JOIN albumMidia a ON (v.idAlbum=a.idAlbum) 
													INNER JOIN Marca m ON (v.idMarca=m.idMarca)
													LEFT JOIN Cor c ON (c.idCor=v.idCor)
													LEFT JOIN veiculoCategoria vc ON (vc.idVeiculoCategoria=v.idVeiculoCategoria)
													LEFT JOIN Transmissao tt ON (tt.idTransmissao=v.idTransmissao)
													WHERE '.$condId.' and a.ordem=0 GROUP BY a.idAlbum ORDER BY a.ordem ASC ');


echo json_encode($veiculo);

//commit transaction
$transaction->commit();


	
?>
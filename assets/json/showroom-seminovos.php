<?php
	
header('Content-type: application/json');

/**
 * Include e Riquire CMS
 */
require_once('../../application/include_dao.php');

//start new transaction
$transaction = new Transaction();

$veiculo = new Veiculo();

$veiculo = DAOFactory::getVeiculoDAO()->relTable(' SELECT 
													*,v.alias as alias,v.idAlbum as idAlbum,a.file as capa,c.nome as idCor,vc.alias as idVeiculoCategoria,m.nome as idMarca,m.idMarca as km,tt.tipo as idTransmissao  
													FROM Veiculo v INNER JOIN albumMidia a ON (v.idAlbum=a.idAlbum) 
													INNER JOIN Marca m ON (v.idMarca=m.idMarca)
													INNER JOIN Cor c ON (c.idCor=v.idCor)
													INNER JOIN veiculoCategoria vc ON (vc.idVeiculoCategoria=v.idVeiculoCategoria)
													INNER JOIN Transmissao tt ON (tt.idTransmissao=v.idTransmissao)
													WHERE conservacao="seminovo" and a.ordem=0 and (v.status=2 or v.status=1) GROUP BY a.idAlbum ORDER BY a.ordem ASC LIMIT 8 ');


echo json_encode($veiculo);

//commit transaction
$transaction->commit();


	
?>
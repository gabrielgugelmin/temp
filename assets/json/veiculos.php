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
													*,v.alias as alias,v.idAlbum as idAlbum,a.file as capa,c.nome as idCor,vc.alias as idVeiculoCategoria,m.nome as idMarca 
													FROM Veiculo v INNER JOIN albumMidia a ON (v.idAlbum=a.idAlbum) 
													INNER JOIN Marca m ON (v.idMarca=m.idMarca)
													INNER JOIN Cor c ON (c.idCor=v.idCor)
													INNER JOIN veiculoCategoria vc ON (vc.idVeiculoCategoria=v.idVeiculoCategoria)
													WHERE v.status>0 and a.ordem=0 GROUP BY a.idAlbum ORDER BY a.ordem ASC ');



for($j=0;$j<count($veiculo);$j++){
	
	$data[] = array('value'=>$veiculo[$j]->idMarca.' - '.$veiculo[$j]->modelo,'data'=>$veiculo[$j]->tags,'link'=>$veiculo[$j]->alias.'/'.$veiculo[$j]->idVeiculo);
	
}

echo json_encode($data);

//commit transaction
$transaction->commit();


	
?>
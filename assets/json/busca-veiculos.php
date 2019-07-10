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
													LEFT JOIN Cor c ON (c.idCor=v.idCor)
													LEFT JOIN veiculoCategoria vc ON (vc.idVeiculoCategoria=v.idVeiculoCategoria)
													WHERE v.status>0 and v.status<3 and a.ordem=0 GROUP BY a.idAlbum ORDER BY a.ordem ASC ');



for($j=0;$j<count($veiculo);$j++){

    $img_link = '/assets/img/albuns/album_'.$veiculo[$j]->idAlbum.'/'.$veiculo[$j]->capa;

	$data[] = array('value'=>$veiculo[$j]->idMarca.' - '.$veiculo[$j]->modelo,'data'=>$veiculo[$j]->tags,'link'=>$veiculo[$j]->alias.'/'.$veiculo[$j]->idVeiculo, 'img_link' => $img_link);
	
}

echo json_encode($data);

//commit transaction
$transaction->commit();


	
?>
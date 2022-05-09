<?php
include_once('conectar.php');
// variavel que recebe 0 conteúdo da requisição do app decodificando-a

$postjson = json_decode(file_get_contents('php://input'), true);
// var_dump($postjson);

if ($postjson['requisicao'] == 'add') {
    $query = $pdo->prepare("INSERT INTO usuarios SET nome=:nome, usuario=:usuario, senha=:senha, senha_original=:senha_original, nivel=:nivel, ativo= 1");
    $query->bindValue(":nome", $postjson['nome']);
    $query->bindValue(":usuario", $postjson['usuario']);
    $query->bindValue(":senha", md5($postjson['senha']));
    $query->bindValue(":senha_original", $postjson['senha']);
    $query->bindValue(":nivel", $postjson['nivel']);
    $query->execute();
    $id = $pdo->lastInsertId();

    if ($query) {
        $result = json_encode(array('success' => true, 'id' => $id));
    } else {
        $result = json_encode(array('success' => false, 'msg' => 'Falha ao inserir usuário.'));
    }
    echo $result;
} //final da requisicao ADD

elseif ($postjson['requisicao'] == 'listar') {
    if ($postjson['nome'] == '') {
        //colocar where ativo = 1 na frente do usuario
        //colocar and ativo = 1 na frente do usuario LIKE
        $consultaSql = $pdo->query("SELECT * FROM usuarios  order by id desc limit $postjson[start], $postjson[limit]");
    } else {
        $busca = $postjson['nome'] . '%';
        $consultaSql = $pdo->query("SELECT * FROM usuarios WHERE nome LIKE '$busca' or usuario LIKE '$busca' order by id desc limit $postjson[start], $postjson[limit]");
    }
    $res = $consultaSql->fetchAll(PDO::FETCH_ASSOC);
    for ($i = 0; $i < count($res); $i++) {
        foreach ($res[$i] as $key => $value) {
        }
        $dados[] = array(
            'id' => $res[$i]['id'],
            'nome' => $res[$i]['nome'],
            'usuario' => $res[$i]['usuario'],
            'senha' => $res[$i]['senha'],
            'senha_original' => $res[$i]['senha_original'],
            'nivel' => $res[$i]['nivel'],
            'ativo' => $res[$i]['ativo']
        );
    }
    if (count($res) > 0) {
        $result = json_encode(array('success' => true, 'result' => $dados));
    } else {
        $result = json_encode(array('success' => false, 'result' => '0'));
    }
    echo $result;
} //final da requesicao LISTAR

elseif ($postjson['requisicao'] == 'editar') {
    // $query = $pdo->prepare("UPDATE usuarios SET nome=:nome WHERE id=:id");
    $query = $pdo->prepare("UPDATE usuarios SET nome=:nome, usuario=:usuario, senha=:senha, senha_original=:senha_original ,nivel=:nivel  WHERE id=:id");
    $query->bindValue(":nome", $postjson['nome']);
    $query->bindValue(":usuario", $postjson['usuario']);
    $query->bindValue(":senha", md5($postjson['senha']));
    $query->bindValue(":senha_original", $postjson['senha']);
    $query->bindValue(":nivel", $postjson['nivel']);
    $query->bindValue(":id", $postjson['id']);
    $query->execute();

    if ($query) {
        $result = json_encode(array('success' => true, 'msg' => 'Correu tudo bem!'));
    } else {
        $result = json_encode(array('success' => false, 'msg' => 'Dados Incorretos para o Usuario na Api TI89'));
    }
    echo $result;
} //final da requesicao EDITAR

elseif ($postjson['requisicao'] == 'editarnome') {
    // $query = $pdo->prepare("UPDATE usuarios SET nome=:nome WHERE id=:id");
    $query = $pdo->prepare("UPDATE usuarios SET nome=:nome WHERE id=:id");
    $query->bindValue(":nome", $postjson['nome']);
    $query->bindValue(":id", $postjson['id']);
    $query->execute();

    if ($query) {
        $result = json_encode(array('success' => true, 'msg' => 'Correu tudo bem!'));
    } else {
        $result = json_encode(array('success' => false, 'msg' => 'Dados Incorretos para o Usuario na Api TI89'));
    }
    echo $result;
} elseif ($postjson['requisicao'] == 'atualizar') {
} //final da requesicao ATUALIZAR

elseif ($postjson['requisicao'] == 'excluir') {
    // $queryExcluir = $pdo->query("DELETE FROM usuarios WHERE id = $postjson[id]");
    $queryExcluir = $pdo->query("UPDATE usuarios SET ativo = 0 WHERE id = $postjson[id]");
    if ($queryExcluir) {
        $result = json_encode(array('success' => true, 'msg' => 'Usuário Excluido!'));
    } else {
        $result = json_encode(array('success' => false));
    }
    echo $result;
} //final da requesicao excluir

elseif ($postjson['requisicao'] == 'login') {
    $query = $pdo->query("SELECT * FROM usuarios where usuario ='$postjson[usuario]'and senha = md5('$postjson[senha]') and ativo = 1");
    $res = $query->fetchAll(PDO::FETCH_ASSOC);
    for ($i = 0; $i < count($res); $i++) {
        foreach ($res[$i] as $key => $value) {
        }
        $dados = array(
            'id' => $res[$i]['id'],
            'nome' => $res[$i]['nome'],
            'usuario' => $res[$i]['usuario'],
            'senha' => $res[$i]['senha'],
            'senha_original' => $res[$i]['senha_original'],
            'nivel' => $res[$i]['nivel']
        );
    }
    if (count($res) > 0) {
        $result = json_encode(array('success' => true, 'result' => $dados));
    } else {
        $result = json_encode(array('success' => false, 'msg' => 'Dados Incorretos ou Seu usuario pode esta inativo'));
    }
    echo $result;
} //final da requesicao LOGIN
elseif ($postjson['requisicao'] == 'ativar') {
    // $queryExcluir = $pdo->query("UPDATE usuarios SET ativo = 0 WHERE id = $postjson[id]");
    $queryExcluir = $pdo->query("UPDATE usuarios SET ativo = $postjson[ativo] WHERE id = $postjson[id]");
    if ($queryExcluir) {
        $result = json_encode(array('success' => true, 'msg' => 'Usuário alterado!,Sim veio da Api'));
    } else {
        $result = json_encode(array('success' => false));
    }
    echo $result;
}

//final da requesicao ativar


//o comando a de adicionar novas coisa na tabela banco de dados
//alter table usuarios add ativo bit null;

//update usuarios set ativo = 1 where id between 1 and 5;

//update usuarios set ativo = 0 where id =2 ;

//comando restaurar o usuarios
//update usuarios set ativo = 1 where id between 1 and 12;

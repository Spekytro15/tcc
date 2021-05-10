var consulta;


document.addEventListener('deviceready', function() {
    var dbSize = 5 * 1024 * 1024; // 5MB

    window.db = window.sqlitePlugin.openDatabase({
        name: 'my.db',
        location: 'default',
        androidDatabaseProvider: 'system'
    });


    db.transaction(function(tx) {
        tx.executeSql("create table if not exists usuario_aluno(_id integer primary key,  CPF text,token text, senha text)", [], onSuccess, onError);

    });


    function onSuccess(transaction, resultSet) {
        console.log('Query completed: ' + JSON.stringify(resultSet));
    }

    function onError(transaction, error) {
        console.log('Query failed: ' + error.message);
    }

    db.transaction(function(tx) {
        var sql = 'select * from usuario_aluno  ';
        tx.executeSql(sql, [], function(_, result) {

            db.transaction(function(tx) {
                    tx.executeSql('select count(*) AS mycount from usuario_aluno ', [], function(tx, rs) {
                            console.log(rs.rows.item(0).mycount);
                            if (rs.rows.length == 1) {
                                $('#tela-1').hide();
                                $('#tela-3').hide();
                                $('#tela-4').show();
                            } else {
                                $('#tela-1').hide();
                                $('#tela-3').show();

                            }



                        },
                        function(tx, error) {
                            console.log('SELECT error: ' + error.message);
                        });
                },
                function(error) {
                    console.log('Transaction ERROR: ' + error.message);
                },
                function() {
                    console.log('Populated database OK');
                });


        });
    });


    consulta = function(sql) {
        db.transaction(function(tx) {
            tx.executeSql(sql, [], function(tx, rs) {
                console.log(rs.rows);
            }, function(tx, error) {
                console.log('SELECT error: ' + error.message);
            });
        }, function(error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function() {
            console.log('Populated database OK');
        });
    }
});